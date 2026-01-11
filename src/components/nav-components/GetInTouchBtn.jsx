import { useTranslation } from '@/hooks/useTranslation'
import MainBtn from '@/components/ui/buttons/MainBtn'

export default function GetInTouchBtn({ navbarData }) {
  const { t } = useTranslation()
  const { isClient } = navbarData

  return (
    <MainBtn to="/get-in-touch" size="sm">
      {isClient ? t('nav.getInTouch') : 'Get In Touch'}
    </MainBtn>
  )
}
