import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import {
  closing,
  couple,
  dateLabel,
  dateLong,
  dateMm,
  eventDate,
  hero,
  invitation,
  photos,
  venue,
} from './config.js'

const ease = [0.22, 1, 0.36, 1]

function Reveal({ children, delay = 0, y = 28, className, as = 'div' }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, delay, ease }}
    >
      {children}
    </Tag>
  )
}

function Letters({ text, delay = 0 }) {
  return (
    <span className="letters" aria-label={text}>
      {[...text].map((ch, i) => (
        <span className="letter-mask" key={i} aria-hidden="true">
          <motion.span
            className="letter"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, delay: delay + i * 0.05, ease }}
          >
            {ch === ' ' ? ' ' : ch}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '45%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <header className="hero" ref={ref}>
      <motion.div
        className="hero-bg"
        style={{ y: bgY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease }}
        aria-hidden="true"
      >
        <span className="blob blob-a" />
        <span className="blob blob-b" />
        <span className="blob blob-c" />
      </motion.div>

      <motion.div className="hero-content" style={{ y: textY, opacity: fade }}>
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '0.42em' }}
          transition={{ duration: 1.6, delay: 0.3, ease }}
        >
          {hero.eyebrow}
        </motion.p>

        <h1 className="names">
          <Letters text={couple.first} delay={0.5} />
          <motion.span
            className="amp"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 1, ease }}
          >
            &amp;
          </motion.span>
          <Letters text={couple.second} delay={0.9} />
        </h1>

        <motion.div
          className="hero-date"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.7, ease }}
        >
          <span className="rule" />
          <span>{dateLabel}</span>
          <span className="rule" />
        </motion.div>
      </motion.div>

      <motion.a
        href="#invitation"
        className="scroll-cue"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
      >
        <span>Scroll</span>
        <i />
      </motion.a>
    </header>
  )
}

function useCountdown(target) {
  const calc = useCallback(() => {
    const diff = Math.max(0, new Date(target).getTime() - Date.now())
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }, [target])
  const [t, setT] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000)
    return () => clearInterval(id)
  }, [calc])
  return t
}

function Countdown() {
  const t = useCountdown(eventDate)
  return (
    <div className="countdown">
      {Object.entries(t).map(([unit, value], i) => (
        <Reveal className="count-cell" key={unit} delay={i * 0.1}>
          <span className="count-num">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={value}
                initial={{ y: '60%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-60%', opacity: 0 }}
                transition={{ duration: 0.5, ease }}
              >
                {String(value).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="count-unit">{unit}</span>
        </Reveal>
      ))}
    </div>
  )
}

function Invitation() {
  return (
    <section className="section invitation" id="invitation">
      <Reveal as="p" className="eyebrow dark">
        The Invitation
      </Reveal>
      <Reveal as="h2" className="title" delay={0.1}>
        {invitation.title}
      </Reveal>
      <Reveal as="p" className="lead mm" delay={0.2}>
        {invitation.message}
      </Reveal>
      <Reveal as="p" className="note" delay={0.3}>
        {invitation.note}
      </Reveal>
      <Reveal className="date-long" delay={0.35}>
        {dateLong}
      </Reveal>
      <Countdown />
    </section>
  )
}

function Gallery() {
  const [active, setActive] = useState(null)
  const close = () => setActive(null)
  const step = useCallback(
    (d) => setActive((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [],
  )

  useEffect(() => {
    if (active === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [active, step])

  return (
    <section className="section gallery" id="gallery">
      <Reveal as="p" className="eyebrow dark">
        Moments
      </Reveal>
      <Reveal as="h2" className="title" delay={0.1}>
        Our story in frames
      </Reveal>

      <div className="grid">
        {photos.map((p, i) => (
          <motion.button
            type="button"
            className={`tile tile-${i + 1}`}
            key={p.src}
            onClick={() => setActive(i)}
            aria-label={`Open ${p.alt}`}
            initial={{ opacity: 0, y: 40, scale: 0.96, clipPath: 'inset(10% 4% 10% 4%)' }}
            whileInView={{ opacity: 1, y: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 1.1, delay: (i % 3) * 0.1, ease }}
          >
            <motion.img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              style={{ objectPosition: p.pos || 'center' }}
              initial={{ scale: 1.14 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 1.5, delay: (i % 3) * 0.1, ease }}
            />
            <span className="tile-glow" aria-hidden="true" />
            <span className="tile-index">{String(i + 1).padStart(2, '0')}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={close}
          >
            <button className="lb-btn lb-close" onClick={close} aria-label="Close">
              ✕
            </button>
            <button
              className="lb-btn lb-prev"
              onClick={(e) => (e.stopPropagation(), step(-1))}
              aria-label="Previous photo"
            >
              ←
            </button>
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={photos[active].src}
                alt={photos[active].alt}
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) step(1)
                  else if (info.offset.x > 70) step(-1)
                }}
              />
            </AnimatePresence>
            <button
              className="lb-btn lb-next"
              onClick={(e) => (e.stopPropagation(), step(1))}
              aria-label="Next photo"
            >
              →
            </button>
            <span className="lb-count">
              {String(active + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function Venues() {
  return (
    <section className="section venues" id="venues">
      <Reveal as="p" className="eyebrow dark">
        When &amp; Where
      </Reveal>
      <Reveal as="h2" className="title mm venue-title" delay={0.1}>
        {venue.place}
      </Reveal>

      <Reveal className="venue-facts" delay={0.2}>
        <div className="venue-fact">
          <p className="venue-label">Date</p>
          <p className="venue-value">{dateLong}</p>
          <p className="venue-sub mm">{dateMm}</p>
        </div>
        <div className="venue-fact">
          <p className="venue-label">Time</p>
          <p className="venue-value">{venue.time}</p>
          <p className="venue-sub mm">{venue.timeMm}</p>
        </div>
      </Reveal>

      <Reveal as="p" className="venue-address mm" delay={0.3}>
        {venue.address}
      </Reveal>

      <Reveal delay={0.4}>
        <a className="map-link" href={venue.mapUrl} target="_blank" rel="noreferrer">
          <span>View map</span>
          <i>↗</i>
        </a>
      </Reveal>
    </section>
  )
}

function Closing() {
  return (
    <footer className="closing">
      <Reveal as="p" className="eyebrow dark">
        {dateLabel}
      </Reveal>
      <Reveal as="h2" className="title big" delay={0.1}>
        {closing.title}
      </Reveal>
      <Reveal as="p" className="lead mm" delay={0.2}>
        {closing.message}
      </Reveal>
      <Reveal className="monogram" delay={0.3}>
        {couple.first[0]} <em>&amp;</em> {couple.second[0]}
      </Reveal>
    </footer>
  )
}

export default function App() {
  const { scrollYProgress } = useScroll()
  return (
    <>
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} />
      <Hero />
      <main>
        <Invitation />
        <Gallery />
        <Venues />
      </main>
      <Closing />
    </>
  )
}
