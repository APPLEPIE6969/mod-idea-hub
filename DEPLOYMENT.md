# Deployment Guide - Mod & Plugin Ideas Hub

Follow these steps to deploy your website to **Vercel**.

## 1. Prepare for Deployment
Ensure all your changes are committed to GitHub.

## 2. Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **Add New** > **Project**.
3. Import your GitHub repository.
4. In the **Build & Development Settings**, ensure the Framework Preset is set to **Vite**.

## 3. Configure Environment Variables
Inside the Vercel project settings, go to **Environment Variables** and add the following from your `.env` file:

| Key | Value |
| :--- | :--- |
| `VITE_SUPABASE_URL` | `https://znnwktgqlmnkubsighto.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `sb_publishable_S3iB6JCg8uXjVa8NOyrCFA_J_wDNf8D` |

## 4. Deploy!
Click **Deploy**. Vercel will build your React app. Your live site is now at:
**[https://mod-idea-hub.vercel.app/](https://mod-idea-hub.vercel.app/)**

### 5. Critical: Update Supabase Redirects
To ensure email confirmations work, you **must** update your Supabase settings:
1. Go to [Auth > URL Configuration](https://supabase.com/dashboard/project/znnwktgqlmnkubsighto/auth/url-configuration)
2. Set **Site URL** to `https://mod-idea-hub.vercel.app/`
3. Add `https://mod-idea-hub.vercel.app/**` to **Additional Redirect URLs**.

---

### Tips
- Use the **Vercel CLI** (`npm i -g vercel`) and run `vercel` in your project folder for a faster workflow.
- Any future pushes to your GitHub repository will automatically trigger a new deployment.
