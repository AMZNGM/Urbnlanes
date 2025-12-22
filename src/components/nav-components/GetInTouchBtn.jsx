import { useTranslation } from '@/hooks/useTranslation'
import MainBtn from '@/components/ui/buttons/MainBtn'

export default function GetInTouchBtn({ navbarData }) {
  const { t } = useTranslation()
  const { isClient } = navbarData

  return (
    <MainBtn to="/get-in-touch" size="sm" className="tracking-wider shrink-0 whitespace-nowrap bg-white">
      {isClient ? t('nav.getInTouch') : 'Get In Touch'}
    </MainBtn>
  )
}
