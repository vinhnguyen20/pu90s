import { useState, useCallback, useMemo, useEffect } from 'react'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import type { User } from 'firebase/auth'
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore'
import { auth, googleProvider, db, ADMIN_EMAIL } from './firebase'
import type { Project, SiteProfile, CategoryDef } from './store'
import { DEFAULT_PROFILE, SEED_PROJECTS, DEFAULT_CATEGORIES } from './store'
import { DICT, LangContext, getStoredLang, storeLang } from './i18n'
import type { Lang, TKey, Dict } from './i18n'
import Nav from './components/Nav'
import Hero from './components/Hero'
import ServicesSection from './components/ServicesSection'
import PortfolioSection from './components/PortfolioSection'
import ContactSection from './components/ContactSection'
import Lightbox from './components/Lightbox'
import LoginPage from './components/LoginPage'
import AdminPanel from './components/AdminPanel'

type Page = 'home' | 'login' | 'admin'

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [projects, setProjects] = useState<Project[]>([])
  const [profile, setProfile] = useState<SiteProfile>(DEFAULT_PROFILE)
  const [categories, setCategories] = useState<CategoryDef[]>(DEFAULT_CATEGORIES)
  const [dataLoading, setDataLoading] = useState(true)
  const [lang, setLangState] = useState<Lang>(getStoredLang)
  const [selectedProject, setSelectedProject] = useState<Project | null>(() => null)

  const authed = user?.email === ADMIN_EMAIL

  // Firebase auth listener
  useEffect(() => {
    return onAuthStateChanged(auth, u => {
      setUser(u)
      setAuthLoading(false)
    })
  }, [])

  // Firestore listeners
  useEffect(() => {
    let seeded = false

    const unsub1 = onSnapshot(collection(db, 'projects'), snap => {
      if (snap.empty && !seeded) {
        seeded = true
        SEED_PROJECTS.forEach(p => setDoc(doc(db, 'projects', p.id), p))
        setProjects(SEED_PROJECTS)
      } else if (!snap.empty) {
        setProjects(snap.docs.map(d => ({ ...d.data(), id: d.id } as Project)))
      }
      setDataLoading(false)
    })

    const unsub2 = onSnapshot(doc(db, 'profile', 'main'), snap => {
      if (snap.exists()) {
        const data = snap.data() as SiteProfile
        setProfile({ ...DEFAULT_PROFILE, ...data, profilePhoto: DEFAULT_PROFILE.profilePhoto })
      } else {
        setDoc(doc(db, 'profile', 'main'), DEFAULT_PROFILE)
        setProfile(DEFAULT_PROFILE)
      }
    })

    const unsub3 = onSnapshot(doc(db, 'config', 'categories'), snap => {
      if (snap.exists()) {
        const data = snap.data() as { items: CategoryDef[] }
        if (Array.isArray(data.items)) setCategories(data.items)
      } else {
        setDoc(doc(db, 'config', 'categories'), { items: DEFAULT_CATEGORIES })
      }
    })

    return () => {
      unsub1()
      unsub2()
      unsub3()
    }
  }, [])

  // URL hash — persist open project
  useEffect(() => {
    if (selectedProject) {
      history.replaceState(null, '', `#${selectedProject.id}`)
    } else {
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }
  }, [selectedProject])

  // Restore project from hash on load
  useEffect(() => {
    if (dataLoading) return
    const hash = window.location.hash.slice(1)
    if (hash) {
      const found = projects.find(p => p.id === hash)
      if (found) setSelectedProject(found)
    }
  }, [dataLoading])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    storeLang(next)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  // Scroll-reveal animation
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
  }, [page, dataLoading])

  const langValue = useMemo(
    () => ({
      lang,
      setLang,
      t: (<K extends TKey>(key: K) => DICT[lang][key] as Dict[K]) as <K extends TKey>(key: K) => Dict[K],
    }),
    [lang, setLang],
  )

  // ── Firebase auth actions ──
  const handleGoogleLogin = useCallback(async () => {
    const result = await signInWithPopup(auth, googleProvider)
    if (result.user.email === ADMIN_EMAIL) {
      setPage('admin')
    }
  }, [])

  const handleLogout = useCallback(async () => {
    await signOut(auth)
    setPage('home')
  }, [])

  const handleViewSite = useCallback(() => {
    setPage('home')
  }, [])

  // ── Firestore CRUD ──
  const handleAddProject = useCallback(async (project: Omit<Project, 'id'>) => {
    const id = `proj-${Date.now()}`
    await setDoc(doc(db, 'projects', id), { ...project, id })
  }, [])

  const handleUpdateProject = useCallback(async (project: Project) => {
    await updateDoc(doc(db, 'projects', project.id), { ...project })
  }, [])

  const handleDeleteProject = useCallback(async (id: string) => {
    await deleteDoc(doc(db, 'projects', id))
  }, [])

  const handleSaveProfile = useCallback(async (p: SiteProfile) => {
    await setDoc(doc(db, 'profile', 'main'), { ...p, profilePhoto: DEFAULT_PROFILE.profilePhoto })
  }, [])

  const handleSaveCategories = useCallback(async (cats: CategoryDef[]) => {
    await setDoc(doc(db, 'config', 'categories'), { items: cats })
  }, [])

  if (authLoading) return null

  let content: React.ReactNode

  if (page === 'login') {
    content = (
      <LoginPage
        onLogin={handleGoogleLogin}
        onBack={() => setPage('home')}
      />
    )
  } else if (page === 'admin' && authed) {
    content = (
      <AdminPanel
        onLogout={handleLogout}
        onViewSite={handleViewSite}
        projects={projects}
        profile={profile}
        categories={categories}
        onAddProject={handleAddProject}
        onUpdateProject={handleUpdateProject}
        onDeleteProject={handleDeleteProject}
        onSaveProfile={handleSaveProfile}
        onSaveCategories={handleSaveCategories}
      />
    )
  } else {
    content = (
      <div className="bg-cream text-ink min-h-screen">
        <Nav
          profile={profile}
          onLoginClick={() => (authed ? setPage('admin') : setPage('login'))}
          isAuthed={authed}
        />
        <Hero profile={profile} />
        <ServicesSection />
        <PortfolioSection projects={projects} categories={categories} onProjectClick={setSelectedProject} />
        <ContactSection profile={profile} />
        {selectedProject && (
          <Lightbox project={selectedProject} categories={categories} onClose={() => setSelectedProject(null)} />
        )}
      </div>
    )
  }

  return <LangContext.Provider value={langValue}>{content}</LangContext.Provider>
}
