import { useState, useCallback, useMemo, useEffect } from 'react'
import { isAuthenticated, logout, getProjects, getProfile } from './store'
import type { Project } from './store'
import { DICT, LangContext, getStoredLang, storeLang } from './i18n'
import type { Lang, TKey, Dict } from './i18n'
import Nav from './components/Nav'
import Hero from './components/Hero'
import PortfolioSection from './components/PortfolioSection'
import ContactSection from './components/ContactSection'
import Lightbox from './components/Lightbox'
import LoginPage from './components/LoginPage'
import AdminPanel from './components/AdminPanel'

type Page = 'home' | 'login' | 'admin'

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [authed, setAuthed] = useState(isAuthenticated)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projects, setProjects] = useState(getProjects)
  const [profile, setProfile] = useState(getProfile)
  const [lang, setLangState] = useState<Lang>(getStoredLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    storeLang(next)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    if (page !== 'home') return
    const init = () => {
      const els = document.querySelectorAll('[data-reveal]')
      if (!els.length) return
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              e.target.classList.add('is-visible')
              observer.unobserve(e.target)
            }
          })
        },
        { threshold: 0.1 },
      )
      els.forEach(el => observer.observe(el))
      return () => observer.disconnect()
    }
    const cleanup = init()
    return cleanup
  }, [page])

  const langValue = useMemo(
    () => ({
      lang,
      setLang,
      t: (<K extends TKey>(key: K) => DICT[lang][key] as Dict[K]) as <K extends TKey>(key: K) => Dict[K],
    }),
    [lang, setLang],
  )

  const handleLogin = useCallback(() => {
    setAuthed(true)
    setPage('admin')
  }, [])

  const handleLogout = useCallback(() => {
    logout()
    setAuthed(false)
    setPage('home')
    setProfile(getProfile())
    setProjects(getProjects())
  }, [])

  const handleViewSite = useCallback(() => {
    setProfile(getProfile())
    setProjects(getProjects())
    setPage('home')
  }, [])

  let content: React.ReactNode

  if (page === 'login') {
    content = <LoginPage onLogin={handleLogin} onBack={() => setPage('home')} />
  } else if (page === 'admin' && authed) {
    content = <AdminPanel onLogout={handleLogout} onViewSite={handleViewSite} />
  } else {
    content = (
      <div className="bg-cream text-ink min-h-screen">
        <Nav
          profile={profile}
          onLoginClick={() => (authed ? setPage('admin') : setPage('login'))}
          isAuthed={authed}
        />

        <Hero profile={profile} />

        <PortfolioSection projects={projects} onProjectClick={setSelectedProject} />

        <ContactSection profile={profile} />

        {selectedProject && (
          <Lightbox project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </div>
    )
  }

  return <LangContext.Provider value={langValue}>{content}</LangContext.Provider>
}
