import { CookieProvider } from '@/contexts/CookieContext'
import { LanguageProvider } from '@/translations/LanguageContext'
import ErrorBoundary from '@/components/app-components/ErrorBoundary'
import Banner from '@/components/app-components/banner'
import LocomotiveScrollSetup from '@/components/app-components/LocomotiveScrollSetup'
import ScrollToTop from '@/components/app-components/ScrollToTop'
import Navbar from '@/components/nav-components/Navbar'
import CustomCursor from '@/components/ui/cursors/CustomCursor'
import CookieBanner from '@/components/app-components/CookieBanner'
import CookieSidebar from '@/components/app-components/CookieSidebar'
import ScrollToTopBtn from '@/components/app-components/ScrollToTopBtn'
import FooterWrapper from '@/components/footer-components/FooterWrapper'

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <CookieProvider>
      <LanguageProvider>
        <ErrorBoundary>
          <Banner />
          <LocomotiveScrollSetup />
          <ScrollToTop />
          {/* <Navbar /> */}
          {children}
          <CustomCursor />
          <CookieBanner />
          <CookieSidebar />
          <ScrollToTopBtn />
          <FooterWrapper />
        </ErrorBoundary>
      </LanguageProvider>
    </CookieProvider>
  )
}
