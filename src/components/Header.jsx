// Header.jsx
"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import { FaInstagramSquare, FaCamera } from "react-icons/fa"
import { IoMdAddCircleOutline } from "react-icons/io"
import { AiOutlineClose } from "react-icons/ai"

import Modal from "react-modal"

// Firebase Firestore imports
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore"
import { app } from "@/firebase"

// Supabase client import
import { supabase } from "@/lib/supabaseClient"

// gemini post enhancer
import { enhanceCaption } from "@/utils/geminiEnhancer"

export default function Header({ onSearch }) {
  const { data: session } = useSession()

  // ← new controlled state for the search input
  const [searchInput, setSearchInput] = useState("")

  const [isOpen, setIsOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [imageFileUrl, setImageFileUrl] = useState(null)
  const [imageFileUploading, setImageFileUploading] = useState(false)
  const [postUploading, setPostUploading] = useState(false)
  const [caption, setCaption] = useState("")
  const [enhancing, setEnhancing] = useState(false)
  
  const filePickerRef = useRef(null)
  const db = getFirestore(app)

  // Handler for file selection and preview
  function addImageToPost(e) {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setImageFileUrl(URL.createObjectURL(file))
    }
  }

  // When a file is selected, upload to Supabase
  useEffect(() => {
    if (selectedFile) {
      uploadImageToSupabase(selectedFile).catch(() => {
        setSelectedFile(null)
        setImageFileUrl(null)
      })
    }
  }, [selectedFile])

  // Upload file to Supabase Storage and retrieve public URL
  async function uploadImageToSupabase(file) {
    setImageFileUploading(true)

    // Generate unique filename
    const ext = file.name.split(".").pop()
    const fileName = `${Date.now()}.${ext}`

    // Upload into your actual bucket name
    const { error: uploadError } = await supabase
      .storage
      .from("posts-finsta-kushal")
      .upload(fileName, file)

    if (uploadError) {
      console.error("Supabase upload error:", uploadError)
      setImageFileUploading(false)
      throw uploadError
    }

    // Get public URL for the uploaded file
    const { data, error: urlError } = supabase
      .storage
      .from("posts-finsta-kushal")
      .getPublicUrl(fileName)

    if (urlError) {
      console.error("Supabase getPublicUrl error:", urlError)
      setImageFileUploading(false)
      throw urlError
    }

    setImageFileUrl(data.publicUrl)
    setImageFileUploading(false)
    return data.publicUrl
  }

  // Handle enhancing of post using gemini
  async function handleEnhance() {
    setEnhancing(true)
    try {
      const enhanced = await enhanceCaption(caption)
      console.log("Enhanced caption:", enhanced)
      setCaption(enhanced)
    } catch (err) {
      console.error("Enhancement failed:", err)
    } finally {
      setEnhancing(false)
    }
  }

  // Handle post submission: ensure image URL, then write to Firestore
  async function handleSubmit() {
    setPostUploading(true)
    try {
      // Use existing URL or upload if missing
      const imageUrl = imageFileUrl || (await uploadImageToSupabase(selectedFile))

      await addDoc(collection(db, "posts"), {
        username: session.user.username,
        caption,
        profileImg: session.user.image,
        image: imageUrl,
        timestamp: serverTimestamp(),
      })

      setIsOpen(false)
      location.reload()
    } catch (error) {
      console.error("Post upload failed:", error)
    } finally {
      setPostUploading(false)
    }
  }

  return (
    <div className="shadow-sm border-b sticky top-0 bg-white z-30 p-3">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* logo */}
        <Link href="/" className="hidden lg:inline-flex">
          <h1 className="text-red-500 text-2xl font-bold p-2 font-serif ">
            Finstagram
          </h1>
        </Link>

        <Link href="/" className="lg:hidden">
          <FaInstagramSquare className="w-12 h-12 text-red-500" />
        </Link>

        {/* ← Updated search box */}
        <input
          type="text"
          placeholder="Search by user or caption…"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value)
            onSearch(e.target.value)
          }}
          className="bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-[300px] lg:max-w-[400px]"
        />

        {session ? (
          <div className="flex gap-4 items-center">
            <IoMdAddCircleOutline
              className="text-4xl cursor-pointer transform hover:scale-125 transition duration-300 hover:text-red-500"
              onClick={() => setIsOpen(true)}
            />

            <img
              src={session.user.image}
              alt={session.user.name}
              className="h-10 w-10 rounded-full cursor-pointer"
              onClick={signOut}
            />
          </div>
        ) : (
          <button
            onClick={signIn}
            className="text-md font-semibold text-blue-500 border border-blue-500 p-3 hover:text-white hover:bg-blue-500 transition ease-in-out"
          >
            Log In
          </button>
        )}
      </div>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md"
          onRequestClose={() => setIsOpen(false)}
          ariaHideApp={false}
        >
          <div className="flex flex-col justify-center items-center h-[100%]">
            {selectedFile ? (
              <img
                onClick={() => setSelectedFile(null)}
                src={imageFileUrl}
                alt="selected file"
                className={`w-full max-h-[250px] object-cover cursor-pointer ${
                  imageFileUploading ? "animate-pulse" : ""
                }`}
              />
            ) : (
              <FaCamera
                onClick={() => filePickerRef.current.click()}
                className="text-6xl text-gray-400 cursor-pointer"
              />
            )}

            <input
              hidden
              ref={filePickerRef}
              type="file"
              accept="image/*"
              onChange={addImageToPost}
            />
          </div>

          <input
            type="text"
            maxLength="150"
            placeholder="Enter Caption..."
            className="m-4 border-none text-center w-full focus:ring-0 outline-none"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <button
            onClick={handleEnhance}
            disabled={enhancing}
            className="w-full mt-1 bg-blue-500 text-white p-2 shadow-md rounded-lg hover:brightness-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {enhancing ? "Enhancing..." : "Enhance Caption ✨"}
          </button>
          <button
            onClick={handleSubmit}
            disabled={
              !selectedFile ||
              caption.trim() === "" ||
              postUploading ||
              imageFileUploading
            }
            className="w-full bg-green-600 text-white p-2 shadow-md rounded-lg hover:brightness-105 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:hover:brightness-100"
          >
            {postUploading ? "Uploading..." : "Upload Post"}
          </button>

          <AiOutlineClose
            className="text-xl cursor-pointer absolute top-2 right-2 text-red-500 transition duration-300 border border-red-500 hover:bg-red-500 hover:text-white"
            onClick={() => setIsOpen(false)}
          />
        </Modal>
      )}
    </div>
  )
}