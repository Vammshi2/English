# English Learning AI

A mobile-first web app that helps Telugu-speaking users improve English communication through AI-powered chat, stories, conversation practice, interview prep, and tech knowledge learning.

## Features

- **AI Chat** -- Natural English conversation with a friendly teacher
- **Story Mode** -- Learn through short stories + comprehension questions
- **Practice Mode** -- Real-life conversation simulations (office, restaurant, etc.)
- **Tech Knowledge** -- Learn C#, C++, .NET, Angular, SQL, Python, and 15+ more topics
- **Interview Prep** -- Mock interview practice with feedback
- **Communication** -- Email writing, formal English, professional phrases
- **Telugu Support** -- "I don't understand" triggers Telugu explanations
- **Voice** -- Speech-to-text input + text-to-speech output
- **Error Correction** -- Visual highlighting of grammar mistakes
- **Progress Tracking** -- Points, streaks, levels, and tech topic progress

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Edit `.env.local` with your actual keys:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

### 3. Set up Supabase database

Run the SQL in `supabase/migrations/001_initial_schema.sql` in your Supabase SQL Editor to create the required tables.

### 4. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment (Vercel)

1. Push code to GitHub
2. Connect repo to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

## Tech Stack

- Next.js 16 (App Router)
- Tailwind CSS
- Supabase (PostgreSQL)
- OpenAI API (gpt-4o-mini)
- Web Speech API
