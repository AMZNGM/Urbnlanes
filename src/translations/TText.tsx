'use client'

import { useTranslation } from '@/translations/useTranslation'

export default function TText({ tKey }: { tKey: string }) {
  let { t } = useTranslation()

  return t(tKey)
}
