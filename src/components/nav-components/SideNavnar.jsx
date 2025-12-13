import MenuBtn from '@/components/ui/buttons/MenuBtn'

export default function SideNavnar() {
  return (
    <aside className="fixed inset-0 w-screen h-screen overflow-x-hidden overflow-y-scroll translate-x-0 transition-transform duration-500 bg-main">
      <MenuBtn />
    </aside>
  )
}
