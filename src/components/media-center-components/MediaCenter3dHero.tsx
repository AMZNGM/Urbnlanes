'use client'

import Image from 'next/image'
import { useGesture } from '@use-gesture/react'
import { useEffect, useMemo, useRef, useCallback, useState, memo, forwardRef } from 'react'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import db from '@/database/urbnlanes-db.json'
import ImageIn from '@/components/ui/unstyled/ImageIn'
import MainBtn from '@/components/ui/buttons/MainBtn'
import CloseBtn from '@/components/ui/buttons/CloseBtn'

interface Article {
  id: string
  type: string
  category: string
  title: string
  content?: string | string[]
  image?: string | string[]
  source?: string
  date: string
  description?: string
}

interface Item {
  x: number
  y: number
  sizeX: number
  sizeY: number
  src: string
  alt: string
  article: Article | null
}

const INERTIA_MAX_V = 5.4

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)

const normalizeAngle = (d: number) => ((d % 360) + 360) % 360

const wrapAngleSigned = (deg: number) => {
  const a = (((deg + 180) % 360) + 360) % 360
  return a - 180
}

const getDataNumber = (el: HTMLElement, name: string, fallback: number) => {
  const attr = (el as any).dataset?.[name]
  const n = attr == null ? NaN : parseFloat(attr)
  return Number.isFinite(n) ? n : fallback
}

function buildItems(pool: Article[], seg: number): Item[] {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2)
  const evenYs = [-4, -2, 0, 2, 4]
  const oddYs = [-3, -1, 1, 3, 5]

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs
    return ys.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }))
  })

  const totalSlots = coords.length
  if (pool.length === 0) {
    return coords.map((c) => ({ ...c, src: '', alt: '', article: null }))
  }
  if (pool.length > totalSlots) {
    console.warn(`[DomeGallery] Provided image count (${pool.length}) exceeds available tiles (${totalSlots}). Some images will not be shown.`)
  }

  const normalizedImages = pool.map((item) => {
    const images = Array.isArray(item.image) ? item.image : [item.image || '']

    const validImages = images.filter((img) => img && typeof img === 'string' && img.trim() !== '')
    const finalImage = validImages[0] || '/images/blogs/blog-placeholder.webp'

    return {
      src: finalImage,
      alt: item.title || '',
      article: item,
    }
  })

  if (normalizedImages.length === 0) {
    return coords.map((c) => ({ ...c, src: '', alt: '', article: null }))
  }

  const usedImages = Array.from({ length: totalSlots }, (_, i) => normalizedImages[i % normalizedImages.length])

  for (let i = 1; i < usedImages.length; i++) {
    if (usedImages[i].src === usedImages[i - 1].src) {
      for (let j = i + 1; j < usedImages.length; j++) {
        if (usedImages[j].src !== usedImages[i].src) {
          const tmp = usedImages[i]
          usedImages[i] = usedImages[j]
          usedImages[j] = tmp
          break
        }
      }
    }
  }

  return coords.map((c, i) => ({
    ...c,
    src: usedImages[i].src,
    alt: usedImages[i].alt,
    article: usedImages[i].article,
  }))
}

function computeItemBaseRotation(offsetX: number, offsetY: number, sizeX: number, sizeY: number, segments: number) {
  const unit = 360 / segments / 2
  const rotateY = unit * (offsetX + (sizeX - 1) / 2)
  const rotateX = unit * (offsetY - (sizeY - 1) / 2)
  return { rotateX, rotateY }
}

const OverlayViewer = memo(
  forwardRef<
    HTMLDivElement,
    {
      styleObj: any
      article: Article | null
      showArticleInfo?: boolean
      grayscale?: boolean
      openedImageBorderRadius?: string
      onClose: () => void
      onTransitionEnd: (ev: React.TransitionEvent) => void
    }
  >(function OverlayViewer({ styleObj, article, showArticleInfo, grayscale, openedImageBorderRadius, onClose, onTransitionEnd }, ref) {
    if (!article) {
      return (
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onTransitionEnd={onTransitionEnd}
          style={{
            left: styleObj.left,
            top: styleObj.top,
            width: styleObj.width,
            height: styleObj.height,
            opacity: styleObj.opacity,
            transform: styleObj.transform,
            transition: styleObj.transition,
          }}
          className="z-50 absolute flex max-md:flex-col bg-main/25 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-3xl rounded-2xl text-text origin-top-left cursor-auto pointer-events-auto will-change-transform"
        >
          <div className="relative w-full h-full flex flex-col justify-center items-center gap-4">
            <CloseBtn onClick={onClose} />
            <p className="text-main">Article not available</p>
          </div>
        </div>
      )
    }

    const images = Array.isArray(article.image) ? article.image : [article.image || '']
    const content = Array.isArray(article.content) ? article.content[0] : article.content

    return (
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={article.title}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onTransitionEnd={onTransitionEnd}
        style={{
          left: styleObj.left,
          top: styleObj.top,
          width: styleObj.width,
          height: styleObj.height,
          opacity: styleObj.opacity,
          transform: styleObj.transform,
          transition: styleObj.transition,
        }}
        className="z-50 absolute flex max-md:flex-col-reverse space-x-2 bg-main/25 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-3xl rounded-2xl text-text origin-top-left p-3 cursor-auto pointer-events-auto will-change-transform"
      >
        <CloseBtn onClick={onClose} className="md:hidden top-4 right-4 z-50 w-fit backdrop-blur-3xl p-4 mix-blend-difference absolute!" />

        {showArticleInfo && article && (
          <div className="relative [&::-webkit-scrollbar]:w-2 overflow-y-auto flex flex-col flex-[0_0_30%] max-md:flex-[0_0_65%] justify-between [&::-webkit-scrollbar-thumb:hover]:bg-main/50 [&::-webkit-scrollbar-thumb]:bg-main/30 [&::-webkit-scrollbar-track]:bg-transparent">
            <div className="relative space-y-8">
              <CloseBtn onClick={onClose} className="max-md:hidden z-50 w-fit p-4 mix-blend-difference" />

              <h2 className="font-medium max-md:text-xl text-2xl line-clamp-3">{article.title}</h2>

              <div className="font-mono text-main text-xs tracking-widest">
                <p>{article.date}</p>
                <p>{article.category}</p>
              </div>

              {(article.description || content || '') && !article.source && (
                <p className="text-sm normal-case leading-relaxed tracking-wide">{article.description || content || ''}</p>
              )}

              {article.source && <MainBtn href={article.source} tKey="common.seeMore" look="ghost" size="sm" className="underline p-0!" />}
            </div>

            <MainBtn to={`/media-center-news/${article.id}`} tKey="news.readFullArticle" look="wideMono" size="sm" />
          </div>
        )}

        <ImageIn
          src={images[0] || '/images/blogs/blog-placeholder.webp'}
          alt={article.title}
          sizes="full"
          className="scale-100!"
          divClassName="relative w-full h-full rounded-2xl overflow-hidden bg-transparent"
        />
      </div>
    )
  })
)

export default function MediaCenter3dHero({
  images,
  fit = 7,
  fitBasis = 'auto',
  minRadius = 600,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = '#000',
  dragDampening = 2,
  openedImageWidth = '90vw',
  openedImageHeight = '70vh',
  imageBorderRadius = '15px',
  openedImageBorderRadius = '0px',
  grayscale = false,
  onImageClick,
  showArticleInfo = true,
}: {
  images?: { src: string; alt: string; article: Article | null }[]
  fit?: number
  fitBasis?: string
  minRadius?: number
  maxRadius?: number
  padFactor?: number
  overlayBlurColor?: string
  dragDampening?: number
  openedImageWidth?: string | number
  openedImageHeight?: string | number
  imageBorderRadius?: string
  openedImageBorderRadius?: string
  grayscale?: boolean
  onImageClick?: (article: Article | null) => void
  showArticleInfo?: boolean
}) {
  const rootRef = useRef<HTMLElement>(null)
  const mainRef = useRef<HTMLElement>(null)
  const sphereRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<HTMLDivElement>(null)
  const scrimRef = useRef<HTMLDivElement>(null)
  const focusedElRef = useRef<HTMLElement | null>(null)
  const originalTilePositionRef = useRef<any>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const rotationRef = useRef({ x: 0, y: 0 })
  const startRotRef = useRef({ x: 0, y: 0 })
  const startPosRef = useRef<{ x: number; y: number } | null>(null)
  const draggingRef = useRef(false)
  const cancelTapRef = useRef(false)
  const movedRef = useRef(false)
  const inertiaRAF = useRef<number | null>(null)
  const pointerTypeRef = useRef('mouse')
  const tapTargetRef = useRef<HTMLElement | null>(null)
  const openingRef = useRef(false)
  const openStartedAtRef = useRef(0)
  const lastDragEndAt = useRef(0)
  const scrollLockedRef = useRef(false)
  const currentArticleRef = useRef<Article | null>(null)
  const lockedRadiusRef = useRef<number>(0)

  const segments = 35
  const autoRotateSpeed = 0.007
  const dragSensitivity = 20
  const maxVerticalRotationDeg = 5
  const enlargeTransitionMs = 300

  const lockScroll = useCallback(() => {
    if (typeof window === 'undefined') return
    if (!scrollLockedRef.current) {
      document.body.classList.add('dg-scroll-lock')
      scrollLockedRef.current = true
    }
  }, [])

  const unlockScroll = useCallback(() => {
    if (typeof window === 'undefined') return
    if (scrollLockedRef.current) {
      document.body.classList.remove('dg-scroll-lock')
      scrollLockedRef.current = false
    }
  }, [])

  const [overlayOpen, setOverlayOpen] = useState(false)
  const [overlayArticle, setOverlayArticle] = useState<Article | null>(null)
  const [overlayPhase, setOverlayPhase] = useState<'idle' | 'entering' | 'resizing' | 'closing'>('idle')
  const [overlayStyle, setOverlayStyle] = useState<any>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    transform: '',
    opacity: 0,
    transition: '',
  })

  const blogs = (db.mediacenter.blogs || []).map((b) => ({ ...b, type: 'Blog Post' }))
  const news = (db.mediacenter.news || []).map((n) => ({ ...n, type: 'News' }))
  const articlesData = [...blogs, ...news]

  const imagesData = useMemo(() => {
    if (images) return images
    return articlesData.map((article) => ({
      src: Array.isArray(article.image) ? article.image[0] : article.image || '/images/blogs/blog-placeholder.webp',
      alt: article.title || '',
      article,
    }))
  }, [images, articlesData])

  const items = useMemo(() => buildItems(articlesData, segments), [articlesData])

  const applyTransform = useCallback((xDeg: number, yDeg: number) => {
    const el = sphereRef.current
    if (el) {
      el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const root = rootRef.current
    if (!root) return
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect
      const w = Math.max(1, cr.width),
        h = Math.max(1, cr.height)
      const minDim = Math.min(w, h),
        maxDim = Math.max(w, h),
        aspect = w / h
      let basis
      switch (fitBasis) {
        case 'min':
          basis = minDim
          break
        case 'max':
          basis = maxDim
          break
        case 'width':
          basis = w
          break
        case 'height':
          basis = h
          break
        default:
          basis = aspect >= 1.3 ? w : minDim
      }
      let radius = basis * fit
      const heightGuard = h * 1.35
      radius = Math.min(radius, heightGuard)
      radius = clamp(radius, minRadius, maxRadius)
      lockedRadiusRef.current = Math.round(radius)

      const viewerPad = Math.max(8, Math.round(minDim * padFactor))
      root.style.setProperty('--radius', `${lockedRadiusRef.current}px`)
      root.style.setProperty('--viewer-pad', `${viewerPad}px`)
      root.style.setProperty('--overlay-blur-color', overlayBlurColor)
      applyTransform(rotationRef.current.x, rotationRef.current.y)
    })
    ro.observe(root)
    return () => ro.disconnect()
  }, [fit, fitBasis, minRadius, maxRadius, padFactor, overlayBlurColor, applyTransform])

  useEffect(() => {
    if (typeof window === 'undefined') return
    applyTransform(rotationRef.current.x, rotationRef.current.y)
  }, [applyTransform])

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current)
      inertiaRAF.current = null
    }
  }, [])

  const startInertia = useCallback(
    (vx: number, vy: number) => {
      let vX = clamp(vx, -INERTIA_MAX_V, INERTIA_MAX_V) * 80
      let vY = clamp(vy, -INERTIA_MAX_V, INERTIA_MAX_V) * 80
      let frames = 0
      const d = clamp(dragDampening ?? 0.6, 0, 1)
      const frictionMul = 0.94 + 0.055 * d
      const stopThreshold = 0.015 - 0.01 * d
      const maxFrames = Math.round(90 + 270 * d)
      const step = () => {
        vX *= frictionMul
        vY *= frictionMul
        if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
          inertiaRAF.current = null
          return
        }
        if (++frames > maxFrames) {
          inertiaRAF.current = null
          return
        }
        const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg)
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200)
        rotationRef.current = { x: nextX, y: nextY }
        applyTransform(nextX, nextY)
        inertiaRAF.current = requestAnimationFrame(step)
      }
      stopInertia()
      inertiaRAF.current = requestAnimationFrame(step)
    },
    [dragDampening, maxVerticalRotationDeg, stopInertia, applyTransform]
  )

  useGesture(
    {
      onDragStart: ({ event }) => {
        if (focusedElRef.current) return
        stopInertia()

        pointerTypeRef.current = (event as any).pointerType || 'mouse'
        if (pointerTypeRef.current === 'touch') event.preventDefault()
        if (pointerTypeRef.current === 'touch') lockScroll()
        draggingRef.current = true
        // set dragging attribute for cursor styling
        rootRef.current?.setAttribute('data-dragging', 'true')
        cancelTapRef.current = false
        movedRef.current = false
        startRotRef.current = { ...rotationRef.current }
        startPosRef.current = { x: (event as any).clientX, y: (event as any).clientY }
        const potential = (event.target as any).closest?.('.item__image')
        tapTargetRef.current = potential || null
      },
      onDrag: ({ event, last, velocity: velArr = [0, 0], direction: dirArr = [0, 0], movement }) => {
        if (focusedElRef.current || !draggingRef.current || !startPosRef.current) return

        if (pointerTypeRef.current === 'touch') event.preventDefault()

        const dxTotal = (event as any).clientX - startPosRef.current.x
        const dyTotal = (event as any).clientY - startPosRef.current.y

        if (!movedRef.current) {
          const dist2 = dxTotal * dxTotal + dyTotal * dyTotal
          if (dist2 > 16) movedRef.current = true
        }

        const nextX = clamp(startRotRef.current.x - dyTotal / dragSensitivity, -maxVerticalRotationDeg, maxVerticalRotationDeg)
        const nextY = startRotRef.current.y + dxTotal / dragSensitivity

        const cur = rotationRef.current
        if (cur.x !== nextX || cur.y !== nextY) {
          rotationRef.current = { x: nextX, y: nextY }
          applyTransform(nextX, nextY)
        }

        if (last) {
          draggingRef.current = false
          // remove dragging attribute when interaction ends
          rootRef.current?.removeAttribute('data-dragging')
          let isTap = false

          if (startPosRef.current) {
            const dx = (event as any).clientX - startPosRef.current.x
            const dy = (event as any).clientY - startPosRef.current.y
            const dist2 = dx * dx + dy * dy
            const TAP_THRESH_PX = pointerTypeRef.current === 'touch' ? 10 : 6
            if (dist2 <= TAP_THRESH_PX * TAP_THRESH_PX) {
              isTap = true
            }
          }

          const [vMagX, vMagY] = velArr
          const [dirX, dirY] = dirArr
          let vx = vMagX * dirX
          let vy = vMagY * dirY

          if (!isTap && Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001 && Array.isArray(movement)) {
            const [mx, my] = movement
            vx = (mx / dragSensitivity) * 0.02
            vy = (my / dragSensitivity) * 0.02
          }

          if (!isTap && (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005)) {
            startInertia(vx, vy)
          }
          startPosRef.current = null
          cancelTapRef.current = !isTap

          if (isTap && tapTargetRef.current && !focusedElRef.current) {
            openItemFromElement(tapTargetRef.current)
          }
          tapTargetRef.current = null

          if (cancelTapRef.current) setTimeout(() => (cancelTapRef.current = false), 120)
          if (movedRef.current) lastDragEndAt.current = performance.now()
          movedRef.current = false
          if (pointerTypeRef.current === 'touch') unlockScroll()
        }
      },
    },
    { target: mainRef, eventOptions: { passive: false } }
  )

  const cleanupAfterClose = useCallback((el: HTMLElement) => {
    const parent = el.parentElement
    if (!parent) {
      openingRef.current = false
      setOverlayOpen(false)
      setOverlayArticle(null)
      setOverlayPhase('idle')
      return
    }
    const refDiv = parent.querySelector('.item__image--reference')

    originalTilePositionRef.current = null
    if (refDiv) refDiv.remove()
    parent.style.transition = 'none'
    el.style.transition = 'none'
    parent.style.setProperty('--rot-y-delta', '0deg')
    parent.style.setProperty('--rot-x-delta', '0deg')

    requestAnimationFrame(() => {
      el.style.visibility = ''
      el.style.opacity = '0'
      el.style.zIndex = '0'
      focusedElRef.current = null
      currentArticleRef.current = null
      rootRef.current?.removeAttribute('data-enlarging')

      requestAnimationFrame(() => {
        if (parent) parent.style.transition = ''
        el.style.transition = 'opacity 300ms ease-out'
        requestAnimationFrame(() => {
          el.style.opacity = '1'
          setTimeout(() => {
            el.style.transition = ''
            el.style.opacity = ''
            openingRef.current = false
            setOverlayOpen(false)
            setOverlayArticle(null)
            setOverlayPhase('idle')
            if (!draggingRef.current && rootRef.current?.getAttribute('data-enlarging') !== 'true') document.body.classList.remove('dg-scroll-lock')
          }, 300)
        })
      })
    })
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const scrim = scrimRef.current
    if (!scrim) return

    const close = () => {
      if (performance.now() - openStartedAtRef.current < 250) return
      const el = focusedElRef.current
      if (!el) return

      // Animate overlay back to the original tile
      const originalPos = originalTilePositionRef.current
      if (!originalPos) {
        // No original, just cleanup
        cleanupAfterClose(el)
        return
      }

      const frameR = frameRef.current?.getBoundingClientRect()
      const mainR = mainRef.current?.getBoundingClientRect()

      if (!frameR || !mainR) {
        cleanupAfterClose(el)
        return
      }

      const tx0 = originalPos.left - frameR.left
      const ty0 = originalPos.top - frameR.top
      const sx0 = originalPos.width / frameR.width
      const sy0 = originalPos.height / frameR.height

      setOverlayStyle((prev: any) => ({
        ...prev,
        left: frameR.left - mainR.left,
        top: frameR.top - mainR.top,
        width: frameR.width,
        height: frameR.height,
        transition: `transform ${enlargeTransitionMs}ms ease, opacity ${enlargeTransitionMs}ms ease`,
        transform: `translate(${tx0}px, ${ty0}px) scale(${sx0}, ${sy0})`,
        opacity: 0,
      }))

      setOverlayPhase('closing')
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }

    scrim.addEventListener('click', close)
    window.addEventListener('keydown', onKey)
    return () => {
      scrim.removeEventListener('click', close)
      window.removeEventListener('keydown', onKey)
    }
  }, [enlargeTransitionMs, cleanupAfterClose])

  const TRANSFORM_EASE = useMemo(() => `transform ${enlargeTransitionMs}ms ease, opacity ${enlargeTransitionMs}ms ease`, [enlargeTransitionMs])

  const RESIZE_EASE = useMemo(
    () => `left ${enlargeTransitionMs}ms ease, top ${enlargeTransitionMs}ms ease, width ${enlargeTransitionMs}ms ease, height ${enlargeTransitionMs}ms ease`,
    [enlargeTransitionMs]
  )

  const openItemFromElement = useCallback(
    (el: HTMLElement) => {
      if (!el || cancelTapRef.current) return
      if (openingRef.current) return
      openingRef.current = true
      openStartedAtRef.current = performance.now()
      lockScroll()
      const parent = el.parentElement
      if (!parent) return
      focusedElRef.current = el
      el.setAttribute('data-focused', 'true')

      const offsetX = getDataNumber(parent, 'offsetX', 0)
      const offsetY = getDataNumber(parent, 'offsetY', 0)
      const sizeX = getDataNumber(parent, 'sizeX', 2)
      const sizeY = getDataNumber(parent, 'sizeY', 2)

      const parentRot = computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments)
      const parentY = normalizeAngle(parentRot.rotateY)
      const globalY = normalizeAngle(rotationRef.current.y)
      let rotY = -(parentY + globalY) % 360
      if (rotY < -180) rotY += 360
      const rotX = -parentRot.rotateX - rotationRef.current.x

      parent.style.setProperty('--rot-y-delta', `${rotY}deg`)
      parent.style.setProperty('--rot-x-delta', `${rotX}deg`)

      const refDiv = document.createElement('div')
      refDiv.className = 'item__image item__image--reference absolute inset-[10px] opacity-0 pointer-events-none'
      refDiv.style.transform = `rotateX(${-parentRot.rotateX}deg) rotateY(${-parentRot.rotateY}deg)`
      parent.appendChild(refDiv)

      const tileR = refDiv.getBoundingClientRect()
      const mainR = mainRef.current?.getBoundingClientRect()
      const frameR = frameRef.current?.getBoundingClientRect()

      if (!mainR || !frameR) return

      originalTilePositionRef.current = {
        left: tileR.left,
        top: tileR.top,
        width: tileR.width,
        height: tileR.height,
      }

      el.style.visibility = 'hidden'
      el.style.zIndex = '0'

      const rawSrc = parent.dataset.src || el.querySelector('img')?.src || ''
      const rawAlt = parent.dataset.alt || el.querySelector('img')?.alt || ''

      let articleData = null

      if (parent.dataset.articleId) {
        articleData = items.find((item) => item.article?.id === parent.dataset.articleId)?.article
      }

      if (!articleData) {
        articleData = items.find((item) => item.src === rawSrc || item.alt === rawAlt)?.article
      }

      currentArticleRef.current = articleData || null
      setOverlayArticle(articleData || null)
      const tx0 = tileR.left - frameR.left
      const ty0 = tileR.top - frameR.top
      const sx0 = tileR.width / frameR.width
      const sy0 = tileR.height / frameR.height

      setOverlayStyle({
        left: frameR.left - mainR.left,
        top: frameR.top - mainR.top,
        width: frameR.width,
        height: frameR.height,
        transform: `translate(${tx0}px, ${ty0}px) scale(${sx0}, ${sy0})`,
        opacity: 0,
        transition: TRANSFORM_EASE,
      })
      setOverlayOpen(true)
      rootRef.current?.setAttribute('data-enlarging', 'true')

      // Next frame: animate to full size
      requestAnimationFrame(() => {
        setOverlayStyle((prev: any) => ({
          ...prev,
          transform: 'translate(0px, 0px) scale(1, 1)',
          opacity: 1,
        }))
        setOverlayPhase('entering')
      })

      // Call the onImageClick callback if provided (for the main image click)
      if (onImageClick && !showArticleInfo && articleData) {
        onImageClick(articleData)
      }
    },
    [lockScroll, segments, TRANSFORM_EASE, onImageClick, showArticleInfo, items]
  )

  const handleOverlayTransitionEnd = useCallback(
    (ev: any) => {
      if (overlayPhase === 'entering' && ev.propertyName === 'transform') {
        const wantsResize = openedImageWidth || openedImageHeight
        if (!wantsResize) {
          setOverlayPhase('idle')
          return
        }
        const overlayEl = overlayRef.current
        if (!overlayEl) {
          setOverlayPhase('idle')
          return
        }

        const frameR = frameRef.current?.getBoundingClientRect()
        const mainR = mainRef.current?.getBoundingClientRect()

        if (!frameR || !mainR) return

        const prevTransition = overlayEl.style.transition
        const prevWidth = overlayEl.style.width
        const prevHeight = overlayEl.style.height
        overlayEl.style.transition = 'none'
        const tempWidth = openedImageWidth || `${frameR.width}px`
        const tempHeight = openedImageHeight || `${frameR.height}px`
        overlayEl.style.width = typeof tempWidth === 'number' ? `${tempWidth}px` : tempWidth
        overlayEl.style.height = typeof tempHeight === 'number' ? `${tempHeight}px` : tempHeight
        const newRect = overlayEl.getBoundingClientRect()
        overlayEl.style.width = prevWidth
        overlayEl.style.height = prevHeight
        overlayEl.style.transition = prevTransition

        const centeredLeft = frameR.left - mainR.left + (frameR.width - newRect.width) / 2
        const centeredTop = frameR.top - mainR.top + (frameR.height - newRect.height) / 2

        setOverlayStyle((prev: any) => ({
          ...prev,
          transition: RESIZE_EASE,
          left: centeredLeft,
          top: centeredTop,
          width: typeof tempWidth === 'number' ? `${tempWidth}px` : tempWidth,
          height: typeof tempHeight === 'number' ? `${tempHeight}px` : tempHeight,
        }))
        setOverlayPhase('resizing')
        return
      }

      if (overlayPhase === 'resizing' && ['left', 'top', 'width', 'height'].includes(ev.propertyName)) {
        setOverlayPhase('idle')
        return
      }

      if (overlayPhase === 'closing' && (ev.propertyName === 'transform' || ev.propertyName === 'opacity')) {
        const el = focusedElRef.current
        if (!el) return
        cleanupAfterClose(el)
      }
    },
    [RESIZE_EASE, openedImageWidth, openedImageHeight, overlayPhase, cleanupAfterClose]
  )

  const closeOverlay = useCallback(() => {
    const el = focusedElRef.current
    if (!el) return
    const originalPos = originalTilePositionRef.current
    const frameR = frameRef.current?.getBoundingClientRect()
    const mainR = mainRef.current?.getBoundingClientRect()

    if (!originalPos || !frameR || !mainR) {
      cleanupAfterClose(el)
      return
    }
    const tx0 = originalPos.left - frameR.left
    const ty0 = originalPos.top - frameR.top
    const sx0 = originalPos.width / frameR.width
    const sy0 = originalPos.height / frameR.height
    setOverlayStyle((prev: any) => ({
      ...prev,
      left: frameR.left - mainR.left,
      top: frameR.top - mainR.top,
      width: frameR.width,
      height: frameR.height,
      transition: TRANSFORM_EASE,
      transform: `translate(${tx0}px, ${ty0}px) scale(${sx0}, ${sy0})`,
      opacity: 0,
    }))
    setOverlayPhase('closing')
  }, [TRANSFORM_EASE, cleanupAfterClose])

  useEffect(() => {
    if (typeof window === 'undefined') return
    let rafId: number | null = null
    const running = true

    const degPerFrame = autoRotateSpeed

    const tick = () => {
      const isDragging = draggingRef.current
      const isEnlarging = rootRef.current?.getAttribute('data-enlarging') === 'true'
      if (!isDragging && !isEnlarging) {
        const nextX = rotationRef.current.x
        const nextY = wrapAngleSigned(rotationRef.current.y + degPerFrame)
        rotationRef.current = { x: nextX, y: nextY }
        applyTransform(nextX, nextY)
      }
      if (running) rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [autoRotateSpeed, applyTransform])

  useEffect(() => {
    return () => {
      document.body.classList.remove('dg-scroll-lock')
    }
  }, [])

  useBodyScrollLock(overlayOpen)

  return (
    <section
      ref={rootRef}
      style={
        {
          '--segments-x': segments,
          '--segments-y': segments,
          '--overlay-blur-color': overlayBlurColor,
        } as React.CSSProperties
      }
      className="group relative w-dvw h-dvh overflow-hidden bg-black text-text sphere-root"
    >
      <main
        ref={mainRef}
        className="absolute inset-0 overflow-hidden place-items-center grid bg-transparent touch-none cursor-grab group-data-[dragging=true]:cursor-grabbing select-none"
      >
        {/* stage */}
        <div
          style={{ perspective: 'calc(var(--radius) * 2)' }}
          className="absolute inset-0 size-full place-items-center grid origin-center m-auto cursor-grab group-data-[dragging=true]:cursor-grabbing stage"
        >
          <div ref={sphereRef} className="absolute cursor-grab group-data-[dragging=true]:cursor-grabbing will-change-transform sphere">
            {items.map((it, i) => (
              <div
                key={`${it.x},${it.y},${i}`}
                data-src={it.src}
                data-alt={it.alt}
                data-offset-x={it.x}
                data-offset-y={it.y}
                data-size-x={it.sizeX}
                data-size-y={it.sizeY}
                data-article-id={it.article?.id || ''}
                style={
                  {
                    '--offset-x': it.x,
                    '--offset-y': it.y,
                    '--item-size-x': it.sizeX,
                    '--item-size-y': it.sizeY,
                    top: '-999px',
                    bottom: '-999px',
                    left: '-999px',
                    right: '-999px',
                  } as React.CSSProperties
                }
                className="absolute transform-style-3d transition-transform duration-300 backface-hidden m-auto sphere-item"
              >
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={it.alt || 'Open image'}
                  onClick={(e) => {
                    if (performance.now() - lastDragEndAt.current < 80) return
                    openItemFromElement(e.currentTarget)
                  }}
                  onTouchEnd={(e) => {
                    if (performance.now() - lastDragEndAt.current < 80) return
                    openItemFromElement(e.currentTarget)
                  }}
                  style={{
                    inset: '10px',
                    borderRadius: imageBorderRadius,
                  }}
                  className="block absolute overflow-hidden bg-main/20 transform-style-3d transition-transform duration-300 backface-hidden cursor-pointer pointer-events-auto item__image"
                >
                  {it.src && (
                    <Image
                      src={typeof it.src === 'string' ? it.src : ''}
                      alt={it.alt}
                      fill
                      sizes="300px"
                      loading="eager"
                      draggable={false}
                      style={{
                        filter: grayscale ? 'grayscale(1)' : 'none',
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = '/images/blogs/blog-placeholder.webp'
                      }}
                      className="object-cover backface-hidden pointer-events-none"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient overlays */}
        <div>
          <div className="z-3 absolute inset-0 bg-[radial-gradient(rgba(235,235,235,0)_65%,var(--overlay-blur-color,#000)_100%)] m-auto pointer-events-none" />
          <div className="z-3 absolute inset-0 backdrop-blur-sm mask-[radial-gradient(rgba(235,235,235,0)_70%,var(--overlay-blur-color,#000)_90%)] m-auto pointer-events-none" />
          <div className="top-0 right-0 left-0 z-5 absolute h-30 bg-[linear-gradient(to_bottom,transparent,var(--overlay-blur-color,#000))] rotate-180 pointer-events-none" />
          <div className="right-0 bottom-0 left-0 z-5 absolute h-30 bg-[linear-gradient(to_bottom,transparent,var(--overlay-blur-color,#000))] pointer-events-none" />
        </div>

        {/* Viewer section */}
        <div ref={viewerRef} style={{ padding: 'var(--viewer-pad)' }} className="z-20 absolute inset-0 flex justify-center items-center pointer-events-none">
          {overlayOpen && (
            <OverlayViewer
              ref={overlayRef}
              styleObj={overlayStyle}
              article={overlayArticle}
              showArticleInfo={showArticleInfo}
              grayscale={grayscale}
              openedImageBorderRadius={openedImageBorderRadius}
              onClose={closeOverlay}
              onTransitionEnd={handleOverlayTransitionEnd}
            />
          )}

          <div
            ref={scrimRef}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            className="z-10 absolute inset-0 bg-black/40 opacity-0 group-data-[enlarging=true]:opacity-100 backdrop-blur-sm transition-opacity duration-500 pointer-events-none group-data-[enlarging=true]:pointer-events-auto scrim"
          />

          <div ref={frameRef} style={{ borderRadius: openedImageBorderRadius }} className="h-full aspect-square flex rounded-lg viewer-frame" />
        </div>
      </main>

      <style>{`
        .sphere-root {
          --radius: 520px;
          --viewer-pad: 72px;
          --circ: calc(var(--radius) * 3.14);
          --rot-y: calc((360deg / var(--segments-x)) / 2);
          --rot-x: calc((360deg / var(--segments-y)) / 2);
          --item-width: calc(var(--circ) / var(--segments-x));
          --item-height: calc(var(--circ) / var(--segments-y));
        }

        .sphere,
        .sphere-item,
        .item__image {
          transform-style: preserve-3d;
        }

        .stage {
          perspective: calc(var(--radius) * 2);
          perspective-origin: 50% 50%;
        }

        .sphere {
          transform: translateZ(calc(var(--radius) * -1));
          will-change: transform;
        }

        .sphere-item {
          width: calc(var(--item-width) * var(--item-size-x));
          height: calc(var(--item-height) * var(--item-size-y));
          transform-origin: 50% 50%;
          backface-visibility: hidden;
          transform: rotateY(
              calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)) + var(--rot-y-delta, 0deg))
            )
            rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)) + var(--rot-x-delta, 0deg)))
            translateZ(var(--radius));
        }

        .sphere-root[data-enlarging="true"] .scrim {
          opacity: 1 !important;
          pointer-events: all !important;
        }

        .item__image {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }

        /* Cursor behavior */
        .sphere-root main,
        .sphere-root .stage,
        .sphere-root .sphere {
          cursor: grab;
        }
        .sphere-root[data-dragging="true"] main,
        .sphere-root[data-dragging="true"] .stage,
        .sphere-root[data-dragging="true"] .sphere {
          cursor: grabbing;
        }
        /* Items are clickable when not dragging */
        .sphere-root .item__image { cursor: pointer; }
        .sphere-root[data-dragging="true"] .item__image { cursor: grabbing !important; }

        @media (max-width: 768px) {
          .enlarge {
            flex-direction: column !important;
          }

          .enlarge > div:first-child {
            flex: 0 0 40% !important;
          }

          .enlarge > div:last-child {
            flex: 0 0 60% !important;
          }
        }
      `}</style>
    </section>
  )
}
