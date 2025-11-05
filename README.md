# Session Notes - Therapist Note-Taking Application

Simple note-taking app for therapists built with React, TypeScript, Material-UI, and Supabase.

## 🛠 Tech Stack

- React 19 + TypeScript + Vite
- Material-UI + Material Icons
- Supabase (Database + Edge Functions)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

The app uses this Supabase project:

- **Project URL**: `https://aynetcgothafysnhaubt.supabase.co`

#### Create the Database Table

1. Go to your Supabase project → **SQL Editor**
2. Click "New query"
3. Copy and paste the SQL from `supabase/schema.sql`
4. Click "Run"

#### Set Environment Variables

1. Create `.env.local` file:

   ```bash
   cp .env.example .env.local
   ```

2. Add your credentials:

   ```env
   VITE_SUPABASE_URL=https://aynetcgothafysnhaubt.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

   Get your `anon key` from: **Supabase Dashboard → Settings → API → Project API keys**

### 3. Run the App

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 📚 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
```
