import Link from 'next/link'
import { NavigationItem } from '@/types/nav'
import { ChevronRight, Dot } from 'lucide-react'
import TText from '@/translations/TText'
import AnimIn from '@/components/ui/unstyled/AnimIn'
import RippleEffect from '@/components/ui/effects/RippleEffect'

export default function NavDropdown({
  label,
  isActive,
  setChildOpen,
  childrens,
  childOpen,
  closeNavbar,
}: {
  label: string
  isActive: boolean
  setChildOpen: (index: number | null) => void
  childrens: NavigationItem[]
  childOpen: number | null
  closeNavbar?: () => void
}) {
  return (
    <div aria-label="Dropdown" className="z-50 relative w-full h-full">
      <button className="h-full text-sm uppercase cursor-pointer">{<TText tKey={label} />}</button>

      {isActive && (
        <div className="right-0 left-0 fixed space-y-8 bg-bg shadow-lg border-b px-18 max-md:px-4 py-8">
          {childrens.map((child, index) => (
            <AnimIn blur duration={0.4} delay={0.05 * index} key={index} onMouseEnter={() => setChildOpen(index)} className="flex justify-between">
              {child.children ? (
                <h3 className="group/name relative w-1/3 h-fit flex items-center font-medium text-text/75 hover:text-text text-lg transition-all hover:translate-x-2 duration-300 py-4 cursor-pointer">
                  <span className="text-main group-hover/name:text-text/75 text-xs transition-colors p-2">{String(index + 1).padStart(2, '0')}</span>
                  <TText tKey={child.name || ''} />
                  <ChevronRight size={20} className={`rtl:ms-2 ltr:ml-2 duration-300 ease-out ${childOpen === index ? 'rotate-90' : ''}`} />
                </h3>
              ) : (
                <Link
                  href={child.slug || ''}
                  onClick={() => {
                    closeNavbar?.()
                  }}
                  className="group/name relative w-full h-fit font-medium text-text/75 hover:text-text text-lg transition-all hover:translate-x-2 duration-300 cursor-pointer"
                >
                  <RippleEffect className="w-full py-3">
                    <h3 className="flex items-center">
                      <span className="text-main group-hover/name:text-text/75 text-xs transition-colors p-2">{String(index + 1).padStart(2, '0')}</span>
                      <TText tKey={child.name || ''} />
                    </h3>
                  </RippleEffect>
                </Link>
              )}

              {child.children && childOpen === index && (
                <div key={index} className="w-2/3 flex flex-col gap-1">
                  {child.children.map((grandchild, idx) => (
                    <AnimIn spring blur duration={0.3} delay={0.05 * idx} key={idx}>
                      <Link
                        href={grandchild.slug || ''}
                        onClick={() => {
                          closeNavbar?.()
                        }}
                        className="inline-flex w-full"
                      >
                        <RippleEffect className="inline-flex w-full text-text/75 hover:text-main transition-colors py-4 cursor-pointer">
                          <Dot />
                          <TText tKey={grandchild.name || ''} />
                        </RippleEffect>
                      </Link>
                    </AnimIn>
                  ))}
                </div>
              )}
            </AnimIn>
          ))}
        </div>
      )}
    </div>
  )
}
