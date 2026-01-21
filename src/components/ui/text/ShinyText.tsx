export default function ShinyText({
  children,
  as = 'div',
  disabled = false,
  speed = 8,
  className = '',
  textColor = '#f0eee9',
}: {
  children: React.ReactNode
  as?: React.ElementType
  disabled?: boolean
  speed?: number
  className?: string
  textColor?: string
}) {
  const animationDuration = `${speed}s`
  const Tag = as

  return (
    <>
      <Tag
        className={`inline-block bg-clip-text text-main/10 bg-linear-to-r bg-size-[200%_100%] ${disabled ? '' : 'animate-shine'} ${className}`}
        style={{ animationDuration, backgroundImage: `linear-gradient(90deg, ${textColor}, ${textColor}20, ${textColor})` }}
      >
        {children}
      </Tag>

      <style>
        {`
        @keyframes shine {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
        }
        .animate-shine {
          animation: shine linear infinite;
        }
        `}
      </style>
    </>
  )
}
