export default function ShinyText({
  children,
  as = 'div',
  className = '',
  dark = true,
}: {
  children: React.ReactNode
  as?: React.ElementType
  className?: string
  dark?: boolean
}) {
  const Tag = as

  return (
    <>
      <Tag
        className={`inline-block bg-clip-text bg-linear-to-r bg-size-[200%_100%] animate-shine ${dark ? 'text-current/10' : 'text-current'} ${className}`}
        style={{ animationDuration: '8s', backgroundImage: `linear-gradient(90deg, #f0eee9, #f0eee920, #f0eee9` }}
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
