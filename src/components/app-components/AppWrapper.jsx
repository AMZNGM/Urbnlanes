import Banner from '@/components/app-components/banner'
import LocomotiveScrollSetup from '@/components/app-components/LocomotiveScrollSetup'
import LoadingScreen from '@/components/app-components/LoadingScreen'

export default function AppWrapper({ children }) {
  return (
    <>
      <Banner />
      <LocomotiveScrollSetup />
      <LoadingScreen />
      {children}
    </>
  )
}
