export default function Indicator({ children, className = '' }) {
  return (
    <div
      className={`
        relative
        after:absolute
        after:top-full
        after:left-0
        after:w-full
        after:h-0.5
        after:bg-main
        after:transition-all
        after:duration-300
        after:ease-out
        after:opacity-0
        after:scale-x-0
        hover:after:opacity-100
        hover:after:scale-x-100
        after:transform-origin-left
        ${className}
      `}
    >
      {children}
    </div>
  )
}
