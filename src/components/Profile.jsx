"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import React from "react"
import { FaInstagramSquare } from "react-icons/fa"

export default function Profile() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="mt-14 ml-10 text-sm text-gray-500">
        Loading session...
      </div>
    )
  }

  return (
    <div className="hidden lg:flex flex-col mt-14 ml-10 w-full space-y-4">
      {/* Warning Message - always visible */}
      <div className="text-sm text-yellow-800 bg-yellow-100 border-l-4 border-yellow-400 p-3 rounded">
        ⚠️ Note: Comment posting may take a few seconds or occasionally fail. This is because I'm using a custom LSTM-based model deployed on Render to detect toxic comments, which can experience cold starts or latency. If your comment doesn’t appear immediately, please wait a moment or try submitting again.
      </div>

      {/* Main Profile Section */}
      <div className="flex items-center justify-between">
        {session?.user ? (
          <img
            src={session?.user?.image}
            alt="user avatar"
            className="w-16 h-16 rounded-full border p-[2px]"
          />
        ) : (
          <FaInstagramSquare size={64} />
        )}

        <div className="flex-1 ml-4">
          <h2 className="font-bold">{session?.user?.username}</h2>
          <h3 className="text-sm text-slate-500">
            Welcome to Finsta - The Social Media App
          </h3>
        </div>

        {session ? (
          <button
            onClick={signOut}
            className="text-blue-700 text-sm font-semibold mr-5"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={signIn}
            className="text-blue-700 text-sm font-semibold mr-5"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  )
}
