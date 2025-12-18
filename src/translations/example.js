/**
 * Translation System Usage Examples
 *
 * This file demonstrates how to use the translation system throughout your app
 */

// ============================================
// Example 1: Basic Component Usage
// ============================================
/*
import { useTranslation } from '@/hooks/useTranslation'

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div>
      <h1>{t('nav.home')}</h1>
      <button>{t('common.save')}</button>
    </div>
  )
}
*/

// ============================================
// Example 2: With Interpolation
// ============================================
/*
import { useTranslation } from '@/hooks/useTranslation'

export default function WelcomeMessage({ userName }) {
  const { t } = useTranslation()

  // Translation: "Welcome {{name}}"
  return <p>{t('welcome.message', { name: userName })}</p>
}
*/

// ============================================
// Example 3: Conditional Translation
// ============================================
/*
import { useTranslation } from '@/hooks/useTranslation'

export default function SearchResults({ count }) {
  const { t } = useTranslation()

  return (
    <div>
      {count === 0
        ? t('search.noResults')
        : t('search.results', { count })
      }
    </div>
  )
}
*/

// ============================================
// Example 4: In Forms
// ============================================
/*
import { useTranslation } from '@/hooks/useTranslation'

export default function ContactForm() {
  const { t } = useTranslation()

  return (
    <form>
      <input
        placeholder={t('form.namePlaceholder')}
        aria-label={t('form.nameLabel')}
      />
      <button type="submit">{t('common.save')}</button>
    </form>
  )
}
*/

// ============================================
// Example 5: Language Switcher Component
// ============================================
/*
import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslation } from '@/hooks/useTranslation'

export default function LanguageSwitcher() {
  const { languages, selectedLanguage, handleLanguageChange } = useLanguage()
  const { t } = useTranslation()

  return (
    <select value={selectedLanguage} onChange={(e) => {
      const lang = languages.find(l => l.name === e.target.value)
      handleLanguageChange(lang)
    }}>
      {languages.map(lang => (
        <option key={lang.code} value={lang.name}>
          {lang.name}
        </option>
      ))}
    </select>
  )
}
*/

// ============================================
// Example 6: Adding New Translations
// ============================================
/*
// In src/translations/translations.js, add:

export const TRANSLATIONS = {
  en: {
    // ... existing translations
    products: {
      title: 'Our Products',
      description: 'Discover our amazing products',
      buyNow: 'Buy Now',
      price: 'Price: {{amount}}',
    },
  },
  ar: {
    // ... existing translations
    products: {
      title: 'منتجاتنا',
      description: 'اكتشف منتجاتنا الرائعة',
      buyNow: 'اشتري الآن',
      price: 'السعر: {{amount}}',
    },
  },
}

// Then use:
const { t } = useTranslation()
t('products.title')  // "Our Products" or "منتجاتنا"
t('products.price', { amount: '$100' })  // "Price: $100"
*/
