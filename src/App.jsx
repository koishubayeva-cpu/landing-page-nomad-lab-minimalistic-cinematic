import { useEffect, useRef, useState } from "react";
import { ArrowRight, MessageCircle, Send } from "lucide-react";
import { useI18n } from "./i18n/I18nContext";
import { languages } from "./i18n/translations";

function LogoMark() {
  return (
    <svg viewBox="0 0 56 24" className="h-6 w-14" aria-hidden="true">
      <path d="M2 18C10 18 13 6 22 6C30 6 31 18 39 18C46 18 48 10 54 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 18H47" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}
export default function App() {
  const { language, setLanguage, t } = useI18n();

  return (
    <main className="paper-noise relative overflow-hidden">
      <section className="relative min-h-screen px-6 pb-16 pt-6 sm:px-10 lg:px-16">
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3 text-ink">
            <LogoMark />
            <span className="font-display text-2xl tracking-[0.18em]">NOMAD LAB</span>
          </div>
          <div className="flex items-center gap-5">
            <div className="hidden gap-8 text-sm text-ink/60 md:flex">
              <a href="#about" className="transition hover:text-ink">{t.nav.about}</a>
              <a href="#ecosystem" className="transition hover:text-ink">{t.nav.ecosystem}</a>
              <a href="#contact" className="transition hover:text-ink">{t.nav.contact}</a>
            </div>
            <div className="flex items-center rounded-full border border-ink/10 bg-white/70 p-1 shadow-sm backdrop-blur-md">
              {languages.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => setLanguage(item.code)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition ${language === item.code ? "bg-ink text-white" : "text-ink/50 hover:text-ink"}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <div className="relative mx-auto mt-10 max-w-7xl overflow-hidden rounded-[2rem] bg-[#ece5d8]">
          <img src="/images/hero-realistic.png" alt={t.hero.imageAlt} className="h-[72vh] min-h-[560px] w-full object-cover" />
          <div className="hero-haze absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14">
            <Reveal className="max-w-2xl">
              <div className="section-kicker">{t.hero.kicker}</div>
              <h1 className="font-display text-5xl font-medium leading-none tracking-tight text-balance text-ink sm:text-6xl lg:text-7xl">{t.hero.title}</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-ink/70 sm:text-lg">{t.hero.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#ecosystem" className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition hover:bg-[#11181c]">
                  {t.hero.primaryCta} <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#about" className="inline-flex items-center justify-center rounded-full border border-ink/15 bg-white/40 px-6 py-3 text-sm font-medium text-ink transition hover:bg-white/70">
                  {t.hero.secondaryCta}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="about" className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="section-kicker">{t.about.kicker}</div>
            <h2 className="section-title max-w-md">{t.about.title}</h2>
          </Reveal>
          <Reveal className="max-w-3xl pt-2 text-lg leading-9 text-ink/70" delay={360}>{t.about.body}</Reveal>
        </div>
      </section>

      <div className="editorial-rule mx-auto h-px max-w-7xl" />

      <section id="ecosystem" className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="section-kicker">{t.ecosystem.kicker}</div>
            <h2 className="section-title max-w-2xl">{t.ecosystem.title}</h2>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <Reveal delay={320}>
              <article className="soft-card overflow-hidden rounded-[1.75rem]">
              <img src="/images/steppe-stories-authentic.png" alt="Steppe Stories" className="h-64 w-full object-cover" />
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.28em] text-gold">{t.ecosystem.items[0].mood}</p>
                <h3 className="mt-4 font-display text-4xl">{t.ecosystem.items[0].name}</h3>
                <p className="mt-4 leading-7 text-ink/68">{t.ecosystem.items[0].text}</p>
              </div>
            </article>
            </Reveal>

            <Reveal delay={620}>
              <article className="overflow-hidden rounded-[1.75rem] bg-[#243036] text-white shadow-editorial">
              <div className="relative h-64 overflow-hidden">
                <img src="/images/steppe-code-topographic.png" alt="Steppe Code" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,29,0.12),rgba(17,24,29,0.78))]" />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.28em] text-white/55">{t.ecosystem.items[1].mood}</p>
                <h3 className="mt-4 font-display text-4xl">{t.ecosystem.items[1].name}</h3>
                <p className="mt-4 leading-7 text-white/70">{t.ecosystem.items[1].text}</p>
              </div>
            </article>
            </Reveal>

            <Reveal delay={920}>
              <article className="soft-card overflow-hidden rounded-[1.75rem]">
              <img src="/images/steppe-experience.png" alt="Steppe Experience" className="h-64 w-full object-cover" />
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.28em] text-blue">{t.ecosystem.items[2].mood}</p>
                <h3 className="mt-4 font-display text-4xl">{t.ecosystem.items[2].name}</h3>
                <p className="mt-4 leading-7 text-ink/68">{t.ecosystem.items[2].text}</p>
              </div>
            </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
          <Reveal className="overflow-hidden rounded-[2rem]">
            <img src="/images/steppe-experience.png" alt="Mountain landscape" className="h-[420px] w-full object-cover" />
          </Reveal>
          <Reveal className="lg:pl-8" delay={380}>
            <div className="section-kicker">{t.journal.kicker}</div>
            <h2 className="section-title max-w-md">{t.journal.title}</h2>
            <p className="mt-6 max-w-lg text-lg leading-9 text-ink/70">{t.journal.body}</p>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="px-6 pb-24 pt-12 sm:px-10 lg:px-16">
        <Reveal className="soft-card mx-auto grid max-w-7xl gap-8 rounded-[2rem] p-6 sm:p-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <div className="section-kicker">{t.contact.kicker}</div>
            <h2 className="section-title">{t.contact.title}</h2>
            <p className="mt-5 max-w-md leading-8 text-ink/68">{t.contact.description}</p>
          </div>
          <div className="flex items-center lg:justify-end">
            <a
              href="https://wa.me/77472805514"
              className="inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-medium text-white transition hover:bg-[#11181c]"
            >
              <MessageCircle className="h-4 w-4" /> {t.contact.cta}
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}






