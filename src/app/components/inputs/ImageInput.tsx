"use client"

import Image from "next/image"
import { useRef, useState } from "react"

type ImageInputProps = {

  value: string

  onChange?: (url: string) => void

  folder: string
}

export function MyImage(value:string) {
  return (

    <label
      className="
      relative
      row-span-3
      border-4
      border-dashed
      border-zinc-400
      rounded-2xl
      flex
      items-center
      justify-center
      cursor-pointer
      transition-all
      overflow-hidden
      hover:border-zinc-600
      hover:bg-zinc-100
      bg-center
      size-full
      aspect-square
      "
    >

        <Image
          src={value}
          alt="Imagem"
          fill
          className="object-cover"
        />
      </label>
  )
}

export default function ImageInput({ value, onChange, folder }: ImageInputProps) {

  const inputRef =
    useRef<HTMLInputElement>(null)

  const [loading, setLoading] =
    useState(false)

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]

    if (!file) return

    try {

      setLoading(true)

      const formData = new FormData()

      formData.append("file", file)
      formData.append("folder",folder)

      const res = await fetch("/api/upload", {
          method: "POST",
          body: formData
        })

      const data = await res.json()
      
      if (onChange) onChange(data.secure_url);

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const style = `relative row-span-3 border-4 border-dashed border-zinc-400 rounded-2xl flex items-center justify-center transition-all overflow-hidden bg-center size-60 lg:size-70 xl:size-90 ${onChange ? "cursor-pointer hover:border-zinc-600 hover:bg-zinc-100" : ""}`
  return (
    <label
      className={style}
    >

      {onChange && 
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />}

      {value ? ( <Image src={value} alt="Imagem" fill className="object-cover" />) : (

        <div className="flex flex-col items-center gap-2 text-zinc-500">

          {onChange && <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
            />

          </svg>}
          <p className="text-sm font-medium text-center px-2"> {loading ? "Enviando..." : "Sem Imagem"} </p>
        </div>
      )}
    </label>
  )
}