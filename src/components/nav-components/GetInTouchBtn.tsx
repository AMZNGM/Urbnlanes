import { NavbarData } from '@/types/nav'
import { useTranslation } from '@/translations/useTranslation'
import MainBtn from '@/components/ui/buttons/MainBtn'

export default function GetInTouchBtn({ navbarData }: { navbarData: NavbarData }) {
  const { t } = useTranslation()
  const { isClient } = navbarData

  return (
    <MainBtn to="/get-in-touch" size="sm">
      {isClient ? t('nav.getInTouch') : 'Get In Touch'}
    </MainBtn>
  )
}
