// Posts.jsx
"use client"

import React, { useEffect, useState } from "react"
import { app } from "@/firebase"
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore"
import PostCard from "./PostCard"

export default function Posts({ searchTerm = "" }) {
  const [posts, setPosts] = useState([])
  const db = getFirestore(app)

  // load posts on mount
  useEffect(() => {
    async function load() {
      const q = query(collection(db, "posts"), orderBy("timestamp", "desc"))
      const snap = await getDocs(q)
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      setPosts(data)
    }
    load()
  }, [db])

  // remove a post from state after deletion
  function handleDelete(id) {
    setPosts((curr) => curr.filter((p) => p.id !== id))
  }

  // client-side filter
  const term = searchTerm.trim().toLowerCase()
  const filtered = posts.filter((p) => {
    if (!term) return true
    return (
      p.username.toLowerCase().includes(term) ||
      p.caption.toLowerCase().includes(term)
    )
  })

  return (
    <div>
      {filtered.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onDelete={() => handleDelete(post.id)}
        />
      ))}
      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No posts match “{searchTerm}”
        </p>
      )}
    </div>
  )
}