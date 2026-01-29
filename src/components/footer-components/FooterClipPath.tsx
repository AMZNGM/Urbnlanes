import FooterContent from '@/components/footer-components/FooterContent'

export default function FooterClipPath() {
  return (
    <footer className="relative w-full md:h-[800px]" style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>
      <div className="md:-top-[100vh] relative md:h-[calc(100vh+800px)]">
        <div className="md:top-[calc(100vh-800px)] md:sticky h-[800px]">
          <FooterContent />
        </div>
      </div>
    </footer>
  )
}
