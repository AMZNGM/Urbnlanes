import { motion } from 'framer-motion'

export default function MenuBtn({ navbarData, className = '' }) {
  const { mobileMenuOpen, setMobileMenuOpen, resetSidebar } = navbarData

  return (
    <button
      onClick={() => (mobileMenuOpen ? resetSidebar() : setMobileMenuOpen(true))}
      className={`relative h-full p-4 flex justify-center items-center cursor-pointer ${className}`}
      aria-expanded={mobileMenuOpen}
      aria-label="Toggle menu"
    >
      <motion.div
        animate={{ y: mobileMenuOpen ? 0 : '-6px', rotate: mobileMenuOpen ? 45 : 0 }}
        className="absolute w-6 h-0.5 bg-current rounded-full"
      ></motion.div>
      <motion.div
        animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
        transition={{ duration: 0.1 }}
        className="absolute w-6 h-0.5 bg-current rounded-full"
      ></motion.div>
      <motion.div
        animate={{ y: mobileMenuOpen ? 0 : '6px', rotate: mobileMenuOpen ? -45 : 0 }}
        className="absolute w-6 h-0.5 bg-current rounded-full"
      ></motion.div>
    </button>
  )
}
