export function SkeletonCircularInputNumber() {
  return (
    <div className="rounded-full bg-zinc-400 size-20"></div>
  );
}

export default function CircularInputNumber({ texto, value, onChange }) {
  return (
    <div className="text-center">
      <p className="font-bold text-center text-md">{texto}</p>
      <input className="text-center rounded-full border-black border-2 size-20 font-black text-4xl outline-none"
      value={value}
      onChange={(e)=>onChange(e.target.value)}
      min={0}
      max={20}
      maxLength={3} />
    </div>
  );
}