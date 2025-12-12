import Banner from '@/components/app-components/banner'

export default function AppWrapper({ children }) {
  return (
    <>
      <Banner />
      {children}
    </>
  )
}
