# Finstagram - A Social Media Web App

Finstagram is a full-stack social media application built using **Next.js 14**, **Firebase**, **Supabase**, **Tailwind CSS**, **NextAuth (Google Sign-In)**, and **Gemini AI**. It allows users to post images, comment, and interact in a minimalist, Instagram-style interface.

Live Demo: [https://finstagram-kushal-main-uhxc.vercel.app/](https://finstagram-kushal-main-uhxc.vercel.app/)

## ✨ Features

- 🔐 **Authentication** with Google using `NextAuth.js`
- 🔥 **Image Uploads** via Firebase Storage
- 💬 **Toxic Comment Detection** with a deployed LSTM-based model
- 📥 **Post Creation & Commenting**
- 🧠 **AI-Powered Suggestions** using Gemini API
- ☁️ **Realtime Database** with Firebase
- 🌐 **Deployed on Vercel**

---

## 📸 Screenshots

| Home Page                         | Post Modal                         |
|----------------------------------|-------------------------------------|
| ![Homepage Screenshot](./public/demo-home.png) | ![Post Modal](./public/demo-post.png) |

---

## 🛠️ Tech Stack

| Layer       | Technology                                   |
|-------------|----------------------------------------------|
| Frontend    | Next.js 14, React 18, Tailwind CSS           |
| Auth        | NextAuth.js with Google Sign-In              |
| Backend     | Firebase (Firestore, Storage), Supabase      |
| ML Model    | Custom LSTM-based toxicity model (Render)    |
| AI Assistant| Gemini API                                   |
| Hosting     | Vercel                                        |

---

## 🔧 Local Development

### 1. Clone the repo

```bash
git clone https://github.com/kushal9811/finstagram-kushal-main.git
cd finstagram-kushal-main
