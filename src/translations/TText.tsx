'use client'

import { useTranslation } from '@/translations/useTranslation'

export default function TText({ tKey }: { tKey: string }) {
  const { t } = useTranslation()
  return <>{t(tKey)}</>
}
