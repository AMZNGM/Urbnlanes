import { CookieProvider } from '@/lib/CookieContext'
import { LanguageProvider } from '@/translations/LanguageContext'
import ErrorBoundary from '@/components/app-components/ErrorBoundary'
import ScrollToTop from '@/components/app-components/ScrollToTop'
import LocomotiveScrollSetup from '@/components/app-components/LocomotiveScrollSetup'
import Banner from '@/components/app-components/banner'
import Navbar from '@/components/nav-components/Navbar'
import CustomCursor from '@/components/ui/cursors/CustomCursor'
import CookieBanner from '@/components/app-components/CookieBanner'
import FooterWrapper from '@/components/footer-components/FooterWrapper'

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <CookieProvider>
      <LanguageProvider>
        <ErrorBoundary>
          <ScrollToTop />
          <LocomotiveScrollSetup />
          <Banner />
          <Navbar />
          {children}
          <CustomCursor />
          <CookieBanner />
          <FooterWrapper />
        </ErrorBoundary>
      </LanguageProvider>
    </CookieProvider>
  )
}
