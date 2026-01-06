export default function LoadingSkeleton() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-2 animate-pulse">
        <div className="w-32 h-8 bg-text/50 rounded-lg"></div>
        <div className="w-64 h-4 bg-text/40 rounded-lg"></div>
      </div>
    </div>
  )
}
