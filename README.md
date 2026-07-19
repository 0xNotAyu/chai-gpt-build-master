# AI Chat Application

A full-stack AI chat application built with **Next.js 15**, **Vercel AI SDK**, **OpenAI**, **Prisma**, **PostgreSQL**, and **Clerk Authentication**.

The application supports persistent conversations, tool calling, streaming AI responses, chat branching, and modern UI built with Shadcn/UI.

---

## Features

### 🤖 AI Chat

- AI powered conversations using OpenAI
- Streaming responses
- Persistent chat history
- Markdown rendering
- Conversation export
- Multiple conversation support

---

## Tool Calling

The project supports AI tool calling with external integrations.

### Features

- Tool Integration
- Tool Invocation
- Streaming Tool Responses
- Error Handling
- Database Persistence

Current integrated tool:

- Firecrawl Web Search

The AI can invoke external tools whenever required and continue streaming the response after the tool finishes execution.

---

## Chat Branching

Supports conversation branching allowing multiple response paths.

### Features

- Create new branches
- Navigate between branches
- Branch persistence
- Stored inside database
- Multiple versions of assistant responses

---

## Authentication

Authentication is handled using Clerk.

Features include:

- Sign In
- Protected Routes
- User Onboarding
- User-specific conversations

---

## Database

Prisma ORM is used for database operations.

Features:

- Persistent conversations
- Persistent messages
- User management
- Branch storage
- Conversation metadata

Database:

- PostgreSQL

---

## Tech Stack

### Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Shadcn/UI
- TanStack Query

### Backend

- Next.js Route Handlers
- Prisma ORM
- PostgreSQL

### AI

- Vercel AI SDK
- OpenAI
- Firecrawl

### Authentication

- Clerk

---

# Project Structure

```
app/
│
├── api/
│   └── chat/
│
├── (auth)/
│
├── (root)/
│
components/
│
features/
│
├── ai/
│   ├── actions/
│   ├── tools/
│   └── utils/
│
├── conversation/
│
├── auth/
│
├── home/
│
└── messages/
│
lib/
│
prisma/
│
public/
```

---

# Installation

Clone the repository.

```bash
git clone https://github.com/yourusername/your-repo.git

cd your-repo
```

Install dependencies.

```bash
npm install
```

---

# Environment Variables

Copy the sample environment file.

```bash
cp .env.sample .env
```

Fill the following variables.

```env
DATABASE_URL=""

CLERK_SECRET_KEY=""

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in

NEXT_PUBLIC_SIGN_IN_FALLBACK_REDIRECT_URL=/

NEXT_PUBLIC_SIGN_UP_FALLBACK_REDIRECT_URL=/

OPENAI_API_KEY=""

FIRECRAWL_API_KEY=""
```

---

# Environment Variable Explanation

| Variable | Description |
|-----------|-------------|
| DATABASE_URL | PostgreSQL connection string |
| CLERK_SECRET_KEY | Clerk backend secret key |
| NEXT_PUBLIC_CLERK_SIGN_IN_URL | Clerk sign-in route |
| NEXT_PUBLIC_SIGN_IN_FALLBACK_REDIRECT_URL | Redirect after login |
| NEXT_PUBLIC_SIGN_UP_FALLBACK_REDIRECT_URL | Redirect after signup |
| OPENAI_API_KEY | OpenAI API Key |
| FIRECRAWL_API_KEY | Firecrawl API Key |

---

# Clerk Configuration

1. Create a Clerk account.

2. Create a new application.

3. Copy the Secret Key.

4. Add the authentication URLs:

```
Sign In:
/sign-in

After Sign In:
/

After Sign Up:
/
```

---

# Database Setup

Generate Prisma client.

```bash
npx prisma generate
```

Run migrations.

```bash
npx prisma migrate dev
```

(Optional)

Open Prisma Studio.

```bash
npx prisma studio
```

---

# Running the Project

Development

```bash
npm run dev
```

Production

```bash
npm run build

npm start
```

---

# Tool Calling Workflow

```
User Prompt
      │
      ▼
AI Model
      │
      ▼
Tool Detection
      │
      ▼
Firecrawl Search
      │
      ▼
Tool Result
      │
      ▼
Streaming Response
      │
      ▼
Database Persistence
```

---

# Chat Flow

```
User

   │

   ▼

Conversation

   │

   ▼

AI Streaming

   │

   ▼

Store Messages

   │

   ▼

Display Conversation
```

---

# Highlights

- AI Streaming
- Persistent Conversations
- Tool Calling
- Chat Branching
- Authentication
- Modern UI
- Type Safety
- Clean Architecture
- Responsive Design

---

# Future Improvements

- Multiple AI model support
- File upload support
- Image generation
- Voice conversations
- Conversation sharing
- Real-time collaboration
- Conversation search
- Prompt templates

---

# License

MIT License