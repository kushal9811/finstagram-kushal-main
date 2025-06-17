---

# 📸 Finstagram

Finstagram is a full-stack social media web application built with **Next.js 14**, **Firebase**, **Supabase**, and **NextAuth.js**. It allows users to sign in via Google, post content, comment, and leverage an LSTM-based toxicity comment detector to moderate user-generated content.

---

## 🚀 Live Demo

👉 [https://finstagram-kushal-main-uhxc.vercel.app](https://finstagram-kushal-main-uhxc.vercel.app)

---

## 🛠 Tech Stack

* **Frontend Framework:** [Next.js 14](https://nextjs.org/)
* **Authentication:** [NextAuth.js](https://next-auth.js.org/)
* **Database & Storage:** [Firebase](https://firebase.google.com/), [Supabase](https://supabase.com/)
* **UI Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Image Hosting:** Supabase Storage Buckets
* **AI Integration:** Google Gemini API
* **Toxicity Detection:** LSTM model hosted on [Render](https://render.com/)

---

## 📦 Features

* 🔐 Google OAuth-based authentication (NextAuth)
* 📝 Post creation with image uploads via Supabase Buckets
* 📝 Post deletion 
* 💬 Comment on posts with real-time toxic comment detection
* 📉 AI-enhanced post suggestions using Gemini
* 🌙 Responsive UI (Tailwind-based)

---

## 📁 Project Structure

```bash
src/
├── app/
│   ├── api/auth/[...nextauth]/route.js
│   ├── layout.js
│   ├── page.js
│   └── globals.css
│
├── components/
│   ├── Header.jsx
│   ├── Posts.jsx
│   ├── PostCard.jsx
│   ├── Comment.jsx
│   ├── Like.jsx
│   ├── Profile.jsx
│   ├── Lookout.jsx
│   └── SessionWrapper.jsx
│
├── lib/
│   ├── firebase.js
│   └── supabaseClient.js
│
├── utils/
│   ├── geminiEnhancer.js
│   └── toxicityClient.js
```

---

## 🌐 Environment Variables

Create a `.env` file in the root directory and add the following keys:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Google Auth (NextAuth)
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_secret

# NextAuth
NEXTAUTH_URL=https://finstagram-kushal-main-uhxc.vercel.app
NEXTAUTH_SECRET=your_random_secret

# Gemini API (optional)
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

---

## 🧠 AI & ML Modules

### Toxicity Detection

* Custom LSTM model hosted on [Render](https://render.com/) for real-time toxic comment classification.
* May experience cold start delays.

### Gemini Enhancer

* Uses Google Gemini API to generate intelligent post summaries or enhancements.

---

## 🖼 Image Upload

* All images are stored in [Supabase Storage Buckets](https://supabase.com/docs/guides/storage).
* Image URLs are fetched and rendered dynamically in posts.

---

## 🧪 Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

---

## 🧾 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🤝 Acknowledgements

* [Next.js](https://nextjs.org/)
* [Firebase](https://firebase.google.com/)
* [Supabase](https://supabase.com/)
* [Render](https://render.com/)
* [Gemini API](https://ai.google.dev/)
* [NextAuth.js](https://next-auth.js.org/)

---

## 👨‍💻 Author

Made with ❤️ by [Kushal Gangwar](https://github.com/kushal9811)

---
