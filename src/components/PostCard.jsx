// PostCard.jsx
"use client"

import React, { useState } from "react"
import { HiOutlineDotsVertical } from "react-icons/hi"
import Like from "./Like"
import Comment from "./Comment"

import { app } from "@/firebase"
import {
  getFirestore,
  doc,
  collection,
  getDocs,
  writeBatch,
} from "firebase/firestore"

import { useSession } from "next-auth/react"

export default function PostCard({ post, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { data: session } = useSession()

  const handleRemove = async () => {
    const db = getFirestore(app)
    const postRef = doc(db, "posts", post.id)

    // 1) Load all comments in this post’s subcollection
    const commentsCol = collection(postRef, "comments")
    const commentsSnap = await getDocs(commentsCol)

    // 2) Build a batch to delete every comment + the post itself
    const batch = writeBatch(db)
    commentsSnap.forEach((cDoc) => batch.delete(cDoc.ref))
    batch.delete(postRef)
    await batch.commit()

    // 3) Update parent state to remove from UI
    onDelete()
  }

  return (
    <div className="bg-white my-7 border rounded-md">
      <div className="flex items-center p-5 border-b border-gray-100 relative">
        <img
          src={post.profileImg}
          alt={post.username}
          className="h-12 w-12 rounded-full object-cover border p-1 mr-3"
        />
        <p className="flex-1 font-bold">{post.username}</p>

        {/* three‑dot menu (only for author) */}
        {session?.user?.username === post.username && (
          <div className="relative">
            <HiOutlineDotsVertical
              className="h-5 w-5 cursor-pointer"
              onClick={() => setMenuOpen((o) => !o)}
            />
            {menuOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded shadow-md z-10">
                <button
                  onClick={handleRemove}
                  className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <img
        src={post.image}
        alt={post.caption}
        className="object-contain w-full h-auto"
      />

      <Like id={post.id} />

      <p className="p-5 truncate">
        <span className="font-bold mr-2">{post.username}</span>
        {post.caption}
      </p>

      <Comment id={post.id} />
    </div>
  )
}