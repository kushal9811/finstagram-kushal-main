// src/components/Lookout.jsx
"use client"

import React, { useState } from "react"
import Header from "./Header"
import Posts from "./Posts"
import Profile from "./Profile"

export default function Lookout() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <>
      {/* Only one Header — lifted into Lookout */}
      <Header onSearch={setSearchTerm} />

      <main className="grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto">
        <section className="md:col-span-2">
          <Posts searchTerm={searchTerm} />
        </section>

        <section>
          <div className="fixed w-[380px]">
            <Profile />
          </div>
        </section>
      </main>
    </>
  )
}