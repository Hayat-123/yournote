# Deploying YourNote to Vercel

Follow these steps to deploy your application to Vercel.

## 1. Push to GitHub
If you haven't already, initialize a git repository and push your code to GitHub.
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPO_URL
git push -u origin main
```

## 2. Connect to Vercel
1. Log in to [Vercel](https://vercel.com/).
2. Click **"Add New"** -> **"Project"**.
3. Import your GitHub repository.

## 3. Configure Environment Variables
During the Vercel setup, you will see an **"Environment Variables"** section. You **MUST** add all the variables from `.env.example` here:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

## 4. Deploy!
Click **"Deploy"**. Vercel will automatically build and host your Next.js application.

## 5. Update Firebase Authentication
1. Go to your [Firebase Console](https://console.firebase.google.com/).
2. Navigate to **Authentication** -> **Settings** -> **Authorized Domains**.
3. Add your Vercel deployment URL (e.g., `yournote.vercel.app`) to the list.

## 6. Update Firestore CORS (Optional)
If you encounter CORS issues with Firestore, ensure your authorized domains in Firebase cover your Vercel URL.
