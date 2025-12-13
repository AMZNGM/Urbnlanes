'use client'

import { useState } from 'react'
import Link from 'next/link'

function DropdownItem({ child, closeParent }) {
  if (child.children && child.children.length > 0) {
    return (
      <div className="relative group">
        <button className="block px-4 py-2 hover:bg-main/50 transition-colors text-left w-full">{child.name}</button>
        <div className="absolute top-full left-full bg-bg border border-text/25 shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          {child.children.map((grandchild, index) => (
            <DropdownItem key={index} child={grandchild} closeParent={closeParent} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <Link href={child.slug} className="block px-4 py-2 hover:bg-main/50 transition-colors" onClick={closeParent}>
      {child.name}
    </Link>
  )
}

export default function NavDropdown({ label, items }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const closeDropdown = () => {
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="h-full flex justify-center items-center px-4 py-2">
        {label}
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 bg-bg border border-text/25 shadow-lg z-50">
          {items && items.map((child, index) => <DropdownItem key={index} child={child} closeParent={closeDropdown} />)}
        </div>
      )}
    </div>
  )
}
