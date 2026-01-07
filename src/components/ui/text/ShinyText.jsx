export default function ShinyText({ children, tag = 'div', disabled = false, speed = 8, className = '', textColor = '#f0eee9' }) {
  const animationDuration = `${speed}s`
  let Tag = tag

  return (
    <>
      <Tag
        className={`
          inline-block bg-clip-text text-main/10 bg-linear-to-r bg-size-[200%_100%]
          ${disabled ? '' : 'animate-shine'}
          ${className}
        `}
        style={{
          animationDuration,
          backgroundImage: `linear-gradient(90deg, ${textColor}, ${textColor}20, ${textColor})`,
        }}
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
