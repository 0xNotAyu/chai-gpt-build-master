"use server";

import { loadChatMessages, saveChatMessages } from "@/features/ai/actions/chat-store";
import { requireUser } from "@/features/auth/action/require-user";
import { prisma } from "@/lib/db";
import { generateId } from "ai";
import { revalidatePath } from "next/cache";

/** Shape of a conversation row returned in the sidebar list. */
export type ConversationListItem = {
    id: string;
    title: string;
    isPinned: boolean;
    isArchived: boolean;
    lastMessageAt: Date;
    createdAt: Date;
    updatedAt: Date;
};


/**
 * Verifies that a conversation exists and belongs to the given user.
 *
 * @throws {Error} When the conversation is not found or not owned by the user.
 */
async function assertOwnsConversation(conversationId: string, userId: string) {
    const conversation = await prisma.conversation.findFirst({
        where: {
            id: conversationId,
            userId
        }
    });

    if (!conversation) {
        throw new Error("Conversation not found")
    }

    return conversation
}

/**
 * Fetches a single conversation owned by the current user.
 *
 * @param conversationId - The conversation to load.
 * @throws {Error} When the conversation is not found.
 */
export async function getConversation(conversationId: string) {
    const user = await requireUser();
    return assertOwnsConversation(conversationId, user.id)
}


/**
 * Lists non-archived conversations for the current user.
 * Pinned conversations appear first, then sorted by most recent activity.
 */
export async function listConversations(): Promise<ConversationListItem[]> {
    const user = await requireUser();

    return prisma.conversation.findMany({
        where: { userId: user.id, isArchived: false },
        orderBy: [{ isPinned: "desc" }, { lastMessageAt: "desc" }],
        select: {
            id: true,
            title: true,
            isPinned: true,
            isArchived: true,
            lastMessageAt: true,
            createdAt: true,
            updatedAt: true,
        },
    })
}

/**
 * Creates a new conversation for the current user.
 *
 * @param title - Optional title; defaults to "New Chat".
 */
export async function createConversation(title = "New Chat") {
    const user = await requireUser();

    return prisma.conversation.create({
        data: {
            userId: user.id,
            title: title.trim() || "New Chat",
        },
    });
}

/**
 * Updates conversation metadata (title, pin, or archive status).
 *
 * @param conversationId - The conversation to update.
 * @param data - Fields to change; omitted fields are left unchanged.
 */
export async function updateConversation(
    conversationId: string,
    data: { title?: string; isPinned?: boolean; isArchived?: boolean }
) {
    const user = await requireUser();
    await assertOwnsConversation(conversationId, user.id);

    const conversation = await prisma.conversation.update({
        where: { id: conversationId },
        data: {
            ...(data.title !== undefined ? { title: data.title.trim() || "New Chat" } : {}),
            ...(data.isPinned !== undefined ? { isPinned: data.isPinned } : {}),
            ...(data.isArchived !== undefined ? { isArchived: data.isArchived } : {}),
        },
    });

    revalidatePath("/");
    revalidatePath(`/c/${conversationId}`);
    return conversation;
}



/**
 * Permanently deletes a conversation owned by the current user.
 *
 * @param conversationId - The conversation to delete.
 * @returns The deleted conversation ID.
 */
export async function deleteConversation(conversationId: string) {
    const user = await requireUser();
    await assertOwnsConversation(conversationId, user.id);

    await prisma.conversation.delete({
        where: { id: conversationId },
    });

    revalidatePath("/");
    return { id: conversationId };
}

export async function createNewBranch(conversationId:string, messageId: string){

    //authentical user
    const user = await requireUser()

    //fetch conversation
    const conversation = await assertOwnsConversation(conversationId,user.id)

    //store messages inside a variable
    const messages = await loadChatMessages(conversationId);

    //find index from which we will create branch
    const index = messages.findIndex(
        m => m.id === messageId
    );

    if (index === -1) {
        throw new Error("Message not found");
    }

    //store messages for branch
    const branchMessages = messages
  .slice(0, index + 1)
  .map((message) => ({
    ...message,
    id: generateId(),
  }));

    //create new conversation for branch conversation
    const newConversation = await prisma.conversation.create({
  data: {
    userId: user.id,
    title: `${conversation.title} (Branch)`,
    model: conversation.model,
    systemPrompt: conversation.systemPrompt,
  },
});
    
    //save branchconversation
    await saveChatMessages(
        newConversation.id,
        branchMessages,
        { updateTitle: false }
    );
    
    //refreshSideBar
    revalidatePath("/");
    revalidatePath(`/c/${newConversation.id}`);

    //return branch conversation
    return newConversation;

}