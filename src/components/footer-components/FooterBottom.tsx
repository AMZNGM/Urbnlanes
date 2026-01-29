import MainBtn from '@/components/ui/buttons/MainBtn'

export default function FooterBottom() {
  let links = [
    { label: 'footer.privacyPolicy', to: '/privacy-policy' },
    { label: 'footer.termsOfUse', to: '/terms-of-use' },
    { label: 'footer.cookiePolicy', to: '/cookie-policy' },
  ]

  return (
    <div className="flex">
      {links.map((link) => (
        <MainBtn key={link.to} to={link.to} tKey={link.label} size="sm" look="ghost" className="text-bg! text-nowrap! hover:text-text!" />
      ))}
    </div>
  )
}
