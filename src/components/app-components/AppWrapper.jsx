import { CookieProvider } from '@/contexts/CookieContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
// import ErrorBoundary from '@/components/app-components/ErrorBoundary'
import Banner from '@/components/app-components/banner'
import LocomotiveScrollSetup from '@/components/app-components/LocomotiveScrollSetup'
import LoadingScreen from '@/components/app-components/LoadingScreen'
import ScrollToTop from '@/components/app-components/ScrollToTop'
import Navbar from '@/components/nav-components/Navbar'
import CookieBanner from '@/components/app-components/CookieBanner'
import CookieSidebar from '@/components/app-components/CookieSidebar'
// import FooterWrapper from '@/components/footer-components/FooterWrapper'

export default function AppWrapper({ children }) {
  return (
    <CookieProvider>
      <LanguageProvider>
        {/* <ErrorBoundary> */}
        <Banner />
        <LocomotiveScrollSetup />
        {/* <LoadingScreen /> */}
        {/* <ScrollToTop /> */}
        {/* <CustomCursor /> */}
        <Navbar />
        {children}
        {/* <CookieBanner /> */}
        {/* <CookieSidebar /> */}
        {/* <FooterWrapper /> */}
        {/* </ErrorBoundary> */}
      </LanguageProvider>
    </CookieProvider>
  )
}
