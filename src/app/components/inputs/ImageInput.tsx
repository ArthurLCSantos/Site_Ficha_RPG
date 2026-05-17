export default function ImageInput() {
  return (
    <label className="relative row-span-3 border-4 border-dashed border-zinc-400 rounded-2xl flex items-center justify-center cursor-pointer transition-all hover:border-zinc-600 hover:bg-zinc-100">
      
      <input
        type="file"
        accept="image/*"
        className="hidden"
      />

      <div className="flex flex-col items-center gap-2 text-zinc-500">
        <svg
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
        </svg>

        <p className="text-sm font-medium text-center px-2">
          Enviar imagem
        </p>
      </div>
    </label>
  );
}