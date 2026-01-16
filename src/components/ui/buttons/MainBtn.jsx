import Link from 'next/link'
import { memo } from 'react'
import RippleEffect from '@/components/ui/effects/RippleEffect'
import LetterSwap from '@/components/ui/text/LetterSwap'

export default memo(function MainBtn({
  children,
  className = '',

  to,
  href,
  onClick,

  look = 'main', // 'main', 'outline', 'ghost'
  size = 'md', // 'sm', 'md', 'lg'
  fullWidth = false,
  disabled = false,

  icon: Icon,
  iconPosition = 'right',
  iconClassName = '',

  ...rest
}) {
  const baseStyles =
    'inline-flex items-center justify-center text-center gap-2 font-medium uppercase border rounded-2xl transition-colors duration-300 outline-none'

  const looks = {
    main: 'bg-text text-bg border-main hover:bg-main',
    outline: 'bg-transparent text-main border-main hover:bg-main hover:text-white',
    ghost: 'bg-transparent text-text border-transparent hover:bg-main/10',
  }

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const styles = `
    ${baseStyles}
    ${looks[look] || looks.main}
    ${sizes[size] || sizes.md}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}
    ${className}
  `
    .trim()
    .replace(/\s+/g, ' ')

  const commonProps = {
    className: styles,
    disabled,
    ...rest,
  }

  if (to)
    return (
      <Link href={to} {...commonProps}>
        {Icon && iconPosition === 'left' && <Icon className={`w-3 fill-bg -rotate-40 ${iconClassName}`} />}
        <LetterSwap text={children} />
        {Icon && iconPosition === 'right' && <Icon className={`w-3 fill-bg -rotate-40 ${iconClassName}`} />}
      </Link>
    )

  if (href)
    return (
      <a href={href} {...commonProps}>
        {Icon && iconPosition === 'left' && <Icon className={`w-3 fill-bg -rotate-40 ${iconClassName}`} />}
        <LetterSwap text={children} />
        {Icon && iconPosition === 'right' && <Icon className={`w-3 fill-bg -rotate-40 ${iconClassName}`} />}
      </a>
    )

  return (
    <RippleEffect className="flex rounded-2xl">
      <button type="button" onClick={onClick} disabled={disabled} {...commonProps}>
        {Icon && iconPosition === 'left' && <Icon className={`w-3 fill-bg -rotate-40 ${iconClassName}`} />}
        <LetterSwap text={children} />
        {Icon && iconPosition === 'right' && <Icon className={`w-3 fill-bg -rotate-40 ${iconClassName}`} />}
      </button>
    </RippleEffect>
  )
})
