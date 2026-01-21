import FooterContent from '@/components/footer-components/FooterContent'

export default function FooterClipPath() {
  return (
    <>
      <footer className="max-md:hidden relative w-full h-[800px]" style={{ clipPath: 'inset(0% 0% 0% 0%)' }}>
        <div className="-top-[100vh] relative h-[calc(100vh+800px)]">
          <div className="top-[calc(100vh-800px)] sticky h-[800px]">
            <FooterContent />
          </div>
        </div>
      </footer>

      <footer className="md:hidden">
        <FooterContent />
      </footer>
    </>
  )
}
