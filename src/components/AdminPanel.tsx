import { useState, useCallback } from 'react'
import type { Project, Category, SiteProfile, CategoryDef } from '../store'
import { profileName } from '../store'

function convertDriveUrl(url: string): string {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
  if (match) return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1600`
  // also handle already-converted uc?export=view links
  const ucMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/)
  if (ucMatch && url.includes('drive.google.com')) return `https://drive.google.com/thumbnail?id=${ucMatch[1]}&sz=w1600`
  return url
}

function convertDriveUrls(raw: string): string {
  return raw.split('\n').map(line => convertDriveUrl(line.trim())).join('\n')
}
import { useLang } from '../i18n'

interface Props {
  onLogout: () => Promise<void>
  onViewSite: () => void
  projects: Project[]
  profile: SiteProfile
  categories: CategoryDef[]
  onAddProject: (project: Omit<Project, 'id'>) => Promise<void>
  onUpdateProject: (project: Project) => Promise<void>
  onDeleteProject: (id: string) => Promise<void>
  onSaveProfile: (profile: SiteProfile) => Promise<void>
  onSaveCategories: (categories: CategoryDef[]) => Promise<void>
}

type AdminView = 'projects' | 'add' | 'edit' | 'profile' | 'categories'

const EMPTY_FORM = {
  title: '',
  titleEn: '',
  subtitle: '',
  category: 'project' as Category,
  artist: '',
  brand: '',
  description: '',
  descriptionEn: '',
  coverImage: '',
  imagesRaw: '',
  youtubeUrl: '',
  date: new Date().getFullYear().toString(),
}

const EMPTY_CAT_FORM = { id: '', vi: '', en: '' }

export default function AdminPanel({
  onLogout,
  onViewSite,
  projects,
  profile,
  categories,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
  onSaveProfile,
  onSaveCategories,
}: Props) {
  const { lang, setLang, t } = useLang()
  const [view, setView] = useState<AdminView>('projects')
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [localProfile, setLocalProfile] = useState<SiteProfile>(profile)
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [catForm, setCatForm] = useState(EMPTY_CAT_FORM)
  const [editingCatId, setEditingCatId] = useState<string | null>(null)
  const [showCatForm, setShowCatForm] = useState(false)

  const collectImages = () => {
    const images = form.imagesRaw
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean)
    if (!images.length && form.coverImage) images.push(form.coverImage)
    return images
  }

  const buildProject = (): Omit<Project, 'id'> => {
    const images = collectImages()
    return {
      title: form.title,
      titleEn: form.titleEn || undefined,
      subtitle: form.subtitle || undefined,
      category: form.category,
      artist: form.artist || undefined,
      brand: form.brand || undefined,
      description: form.description || undefined,
      descriptionEn: form.descriptionEn || undefined,
      coverImage: form.coverImage || images[0] || '',
      images,
      youtubeUrl: form.youtubeUrl || undefined,
      date: form.date,
    }
  }

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await onAddProject(buildProject())
    setSaving(false)
    setForm(EMPTY_FORM)
    setView('projects')
  }

  const handleEditOpen = useCallback((p: Project) => {
    setEditingProject(p)
    setForm({
      title: p.title,
      titleEn: p.titleEn || '',
      subtitle: p.subtitle || '',
      category: p.category,
      artist: p.artist || '',
      brand: p.brand || '',
      description: p.description || '',
      descriptionEn: p.descriptionEn || '',
      coverImage: p.coverImage,
      imagesRaw: p.images.join('\n'),
      youtubeUrl: p.youtubeUrl || '',
      date: p.date,
    })
    setView('edit')
  }, [])

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProject) return
    setSaving(true)
    await onUpdateProject({ ...editingProject, ...buildProject() })
    setSaving(false)
    setView('projects')
    setEditingProject(null)
  }

  const handleDelete = async (id: string) => {
    await onDeleteProject(id)
    setDeleteConfirm(null)
  }

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await onSaveProfile(localProfile)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen bg-cream text-ink flex flex-col">
      {/* Top bar */}
      <header className="bg-nav border-b border-line px-6 lg:px-10 h-14 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-6 min-w-0">
          <span className="font-display text-xs sm:text-sm tracking-[0.2em] uppercase text-ink truncate">
            {profileName(profile, lang)}
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-ink-soft hidden sm:inline">
            {t('admin')}
          </span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center border border-line">
            {(['vi', 'en'] as const).map(code => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`text-[10px] tracking-[0.2em] uppercase px-2.5 py-1.5 transition-all ${
                  lang === code ? 'bg-gold/20 text-gold-deep' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {code}
              </button>
            ))}
          </div>
          <button
            onClick={onViewSite}
            className="text-[10px] tracking-[0.3em] uppercase text-ink-soft hover:text-ink transition-colors"
          >
            {t('viewSite')}
          </button>
          <button
            onClick={onLogout}
            className="text-[10px] tracking-[0.3em] uppercase border border-line text-ink-soft hover:text-ink hover:border-gold px-4 py-1.5 transition-all"
          >
            {t('logout')}
          </button>
        </div>
      </header>

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-48 lg:w-56 border-r border-line bg-cream-2 flex-shrink-0 flex flex-col py-6 px-4 gap-1">
          {(
            [
              { id: 'projects', label: t('allProjects') },
              { id: 'add', label: t('addProject') },
              { id: 'profile', label: t('editProfile') },
              { id: 'categories', label: t('manageCategories') },
            ] as { id: AdminView; label: string }[]
          ).map(item => (
            <button
              key={item.id}
              onClick={() => {
                setView(item.id)
                if (item.id !== 'edit') setEditingProject(null)
              }}
              className={`text-left text-[10px] tracking-[0.3em] uppercase px-3 py-2.5 transition-all rounded-sm ${
                view === item.id ? 'text-gold-deep bg-gold/15' : 'text-ink-soft hover:text-ink'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="mt-4 text-[9px] tracking-[0.3em] uppercase text-ink-soft/70 px-3">
            {projects.length} {t('projectsCount')}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          {/* ── Projects list ── */}
          {view === 'projects' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="font-display text-xl text-ink tracking-wide">{t('allProjects')}</h1>
                <button
                  onClick={() => { setForm(EMPTY_FORM); setView('add') }}
                  className="text-[10px] tracking-[0.3em] uppercase border border-gold/60 text-gold-deep hover:bg-gold/15 px-4 py-2 transition-all"
                >
                  {t('addNew')}
                </button>
              </div>
              <div className="space-y-2">
                {projects.map(p => (
                  <div
                    key={p.id}
                    className="flex items-center gap-4 border border-line hover:border-gold/60 bg-cream-2 p-3 transition-all group"
                  >
                    <div className="w-12 h-16 flex-shrink-0 overflow-hidden bg-cream-3">
                      <img
                        src={p.coverImage}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={e => { ;(e.target as HTMLImageElement).style.opacity = '0' }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-ink font-display tracking-wide truncate">{p.title}</p>
                      <p className="text-[10px] text-ink-soft tracking-widest uppercase mt-0.5 truncate">
                        {categories.find(c => c.id === p.category)?.vi ?? p.category} {p.artist ? `· ${p.artist}` : ''} · {p.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleEditOpen(p)}
                        className="text-[9px] tracking-[0.3em] uppercase text-ink-soft hover:text-ink transition-colors px-2 py-1"
                      >
                        {t('edit')}
                      </button>
                      {deleteConfirm === p.id ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="text-[9px] tracking-widest uppercase text-red-700 hover:text-red-800 transition-colors"
                          >
                            {t('confirm')}
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="text-[9px] tracking-widest uppercase text-ink-soft hover:text-ink transition-colors"
                          >
                            {t('cancel')}
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(p.id)}
                          className="text-[9px] tracking-widest uppercase text-ink-soft/70 hover:text-red-700 transition-colors px-2 py-1"
                        >
                          {t('delete')}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {!projects.length && (
                  <p className="text-ink-soft text-sm text-center py-16 tracking-widest">
                    {t('noProjectsYet')}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ── Add / Edit form ── */}
          {(view === 'add' || view === 'edit') && (
            <div>
              <div className="flex items-center gap-4 mb-8">
                <button
                  onClick={() => setView('projects')}
                  className="text-ink-soft hover:text-ink transition-colors"
                  aria-label={t('cancel')}
                >
                  <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
                    <path d="M9 1L4 6l5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <h1 className="font-display text-xl text-ink tracking-wide">
                  {view === 'add' ? t('addProject') : t('editProject')}
                </h1>
              </div>

              <form
                onSubmit={view === 'add' ? handleAddSubmit : handleEditSubmit}
                className="space-y-5 max-w-2xl"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label={t('fTitle')} required>
                    <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className={inputCls} required placeholder="Key Visual — Panasonic" />
                  </FormField>
                  <FormField label={t('fTitleEn')}>
                    <input type="text" value={form.titleEn} onChange={e => setForm(f => ({ ...f, titleEn: e.target.value }))} className={inputCls} placeholder="Key Visual — Panasonic" />
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label={t('fSubtitle')}>
                    <input type="text" value={form.subtitle} onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))} className={inputCls} placeholder="Dẫn Đầu Sống Xanh" />
                  </FormField>
                  <FormField label={t('fCategory')} required>
                    <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as Category }))} className={inputCls} required>
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{lang === 'en' ? c.en : c.vi}</option>
                      ))}
                    </select>
                  </FormField>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label={t('fArtist')}>
                    <input type="text" value={form.artist} onChange={e => setForm(f => ({ ...f, artist: e.target.value }))} className={inputCls} placeholder="Bling Babi" />
                  </FormField>
                  <FormField label={t('fBrand')}>
                    <input type="text" value={form.brand} onChange={e => setForm(f => ({ ...f, brand: e.target.value }))} className={inputCls} placeholder="Panasonic" />
                  </FormField>
                </div>

                <FormField label={t('fYear')} required>
                  <input type="text" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className={inputCls} required placeholder="2024" />
                </FormField>

                <FormField label={t('fYoutube')}>
                  <input type="url" value={form.youtubeUrl} onChange={e => setForm(f => ({ ...f, youtubeUrl: e.target.value }))} className={inputCls} placeholder="https://youtube.com/watch?v=..." />
                </FormField>

                <FormField label={t('fCover')} required>
                  <input
                    type="text"
                    value={form.coverImage}
                    onChange={e => setForm(f => ({ ...f, coverImage: e.target.value }))}
                    onBlur={e => setForm(f => ({ ...f, coverImage: convertDriveUrl(e.target.value.trim()) }))}
                    className={inputCls}
                    placeholder="https://drive.google.com/file/d/... hoặc https://..."
                  />
                  {form.coverImage && (
                    <div className="mt-2 w-20 h-28 overflow-hidden border border-line bg-cream-3">
                      <img src={form.coverImage} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                </FormField>

                <FormField label={t('fGallery')}>
                  <textarea
                    value={form.imagesRaw}
                    onChange={e => setForm(f => ({ ...f, imagesRaw: e.target.value }))}
                    onBlur={e => setForm(f => ({ ...f, imagesRaw: convertDriveUrls(e.target.value) }))}
                    className={`${inputCls} min-h-28 resize-y`}
                    placeholder={'https://drive.google.com/uc?export=view&id=...\nhttps://drive.google.com/uc?export=view&id=...'}
                  />
                  <p className="text-[10px] text-ink-soft/80 mt-1 tracking-wide">{t('fGalleryHint')}</p>
                </FormField>

                <FormField label={t('fDescription')}>
                  <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className={`${inputCls} min-h-20 resize-y`} />
                </FormField>

                <FormField label={t('fDescriptionEn')}>
                  <textarea value={form.descriptionEn} onChange={e => setForm(f => ({ ...f, descriptionEn: e.target.value }))} className={`${inputCls} min-h-20 resize-y`} />
                  <p className="text-[10px] text-ink-soft/80 mt-1 tracking-wide">{t('optionalEnHint')}</p>
                </FormField>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="border border-gold/60 text-gold-deep hover:bg-gold/15 text-[10px] tracking-[0.35em] uppercase px-6 py-3 transition-all disabled:opacity-50"
                  >
                    {saving ? '…' : (view === 'add' ? t('saveProject') : t('updateProject'))}
                  </button>
                  <button
                    type="button"
                    onClick={() => setView('projects')}
                    className="border border-line text-ink-soft hover:text-ink text-[10px] tracking-[0.35em] uppercase px-6 py-3 transition-all"
                  >
                    {t('cancel')}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ── Categories manager ── */}
          {view === 'categories' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="font-display text-xl text-ink tracking-wide">{t('manageCategories')}</h1>
                <button
                  onClick={() => { setCatForm(EMPTY_CAT_FORM); setEditingCatId(null); setShowCatForm(true) }}
                  className="text-[10px] tracking-[0.3em] uppercase border border-gold/60 text-gold-deep hover:bg-gold/15 px-4 py-2 transition-all"
                >
                  {t('addNew')}
                </button>
              </div>

              {showCatForm && (
                <form
                  className="space-y-4 max-w-md mb-8 p-5 border border-line bg-cream-2"
                  onSubmit={async e => {
                    e.preventDefault()
                    setSaving(true)
                    let updated: CategoryDef[]
                    if (editingCatId) {
                      updated = categories.map(c => c.id === editingCatId ? { ...catForm } : c)
                    } else {
                      updated = [...categories, { ...catForm }]
                    }
                    await onSaveCategories(updated)
                    setSaving(false)
                    setShowCatForm(false)
                    setEditingCatId(null)
                    setCatForm(EMPTY_CAT_FORM)
                  }}
                >
                  <FormField label={t('fCategoryId')} required>
                    <input
                      type="text"
                      value={catForm.id}
                      onChange={e => setCatForm(f => ({ ...f, id: e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
                      className={inputCls}
                      required
                      disabled={!!editingCatId}
                      placeholder="fashion-week"
                    />
                  </FormField>
                  <FormField label={t('fCategoryVi')} required>
                    <input type="text" value={catForm.vi} onChange={e => setCatForm(f => ({ ...f, vi: e.target.value }))} className={inputCls} required placeholder="Tuần lễ thời trang" />
                  </FormField>
                  <FormField label={t('fCategoryEn')} required>
                    <input type="text" value={catForm.en} onChange={e => setCatForm(f => ({ ...f, en: e.target.value }))} className={inputCls} required placeholder="Fashion Week" />
                  </FormField>
                  <div className="flex gap-3">
                    <button type="submit" disabled={saving} className="border border-gold/60 text-gold-deep hover:bg-gold/15 text-[10px] tracking-[0.35em] uppercase px-5 py-2.5 transition-all disabled:opacity-50">
                      {saving ? '…' : t('saveCategory')}
                    </button>
                    <button type="button" onClick={() => { setShowCatForm(false); setEditingCatId(null) }} className="border border-line text-ink-soft hover:text-ink text-[10px] tracking-[0.35em] uppercase px-5 py-2.5 transition-all">
                      {t('cancel')}
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-2 max-w-md">
                {categories.map(cat => (
                  <div key={cat.id} className="flex items-center gap-3 border border-line bg-cream-2 px-4 py-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-ink font-display truncate">{cat.vi}</p>
                      <p className="text-[10px] text-ink-soft tracking-widest">{cat.en} · <span className="opacity-60">{cat.id}</span></p>
                    </div>
                    <button
                      onClick={() => { setCatForm({ ...cat }); setEditingCatId(cat.id); setShowCatForm(true) }}
                      className="text-[9px] tracking-[0.3em] uppercase text-ink-soft hover:text-ink transition-colors px-2"
                    >
                      {t('edit')}
                    </button>
                    <button
                      onClick={async () => {
                        if (!confirm(`Xoá hạng mục "${cat.vi}"?`)) return
                        await onSaveCategories(categories.filter(c => c.id !== cat.id))
                      }}
                      className="text-[9px] tracking-widest uppercase text-ink-soft/60 hover:text-red-700 transition-colors px-2"
                    >
                      {t('delete')}
                    </button>
                  </div>
                ))}
                {!categories.length && (
                  <p className="text-ink-soft text-sm text-center py-10 tracking-widest">{t('noCategoriesYet')}</p>
                )}
              </div>
            </div>
          )}

          {/* ── Profile editor ── */}
          {view === 'profile' && (
            <div>
              <h1 className="font-display text-xl text-ink tracking-wide mb-8">{t('editProfile')}</h1>
              <form onSubmit={handleProfileSave} className="space-y-5 max-w-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label={t('fName')}>
                    <input type="text" value={localProfile.name} onChange={e => setLocalProfile(p => ({ ...p, name: e.target.value }))} className={inputCls} />
                  </FormField>
                  <FormField label={t('fNameEn')}>
                    <input type="text" value={localProfile.nameEn} onChange={e => setLocalProfile(p => ({ ...p, nameEn: e.target.value }))} className={inputCls} />
                  </FormField>
                </div>
                <FormField label={t('fNickname')}>
                  <input type="text" value={localProfile.nickname} onChange={e => setLocalProfile(p => ({ ...p, nickname: e.target.value }))} className={inputCls} />
                </FormField>
                <FormField label={t('fBio1')}>
                  <textarea value={localProfile.bio1} onChange={e => setLocalProfile(p => ({ ...p, bio1: e.target.value }))} className={`${inputCls} min-h-20 resize-y`} />
                </FormField>
                <FormField label={t('fBio2')}>
                  <textarea value={localProfile.bio2} onChange={e => setLocalProfile(p => ({ ...p, bio2: e.target.value }))} className={`${inputCls} min-h-16 resize-y`} />
                </FormField>
                <FormField label={t('fBio1En')}>
                  <textarea value={localProfile.bio1En} onChange={e => setLocalProfile(p => ({ ...p, bio1En: e.target.value }))} className={`${inputCls} min-h-20 resize-y`} />
                </FormField>
                <FormField label={t('fBio2En')}>
                  <textarea value={localProfile.bio2En} onChange={e => setLocalProfile(p => ({ ...p, bio2En: e.target.value }))} className={`${inputCls} min-h-16 resize-y`} />
                </FormField>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label={t('labelEmail')}>
                    <input type="email" value={localProfile.email} onChange={e => setLocalProfile(p => ({ ...p, email: e.target.value }))} className={inputCls} />
                  </FormField>
                  <FormField label={t('labelPhone')}>
                    <input type="text" value={localProfile.phone} onChange={e => setLocalProfile(p => ({ ...p, phone: e.target.value }))} className={inputCls} />
                  </FormField>
                  <FormField label={t('labelInstagram')}>
                    <input type="text" value={localProfile.instagram} onChange={e => setLocalProfile(p => ({ ...p, instagram: e.target.value }))} className={inputCls} />
                  </FormField>
                  <FormField label={t('labelFacebook')}>
                    <input type="url" value={localProfile.facebook} onChange={e => setLocalProfile(p => ({ ...p, facebook: e.target.value }))} className={inputCls} />
                  </FormField>
                </div>
                <button
                  type="submit"
                  disabled={saving}
                  className="border border-gold/60 text-gold-deep hover:bg-gold/15 text-[10px] tracking-[0.35em] uppercase px-6 py-3 transition-all disabled:opacity-50"
                >
                  {saved ? t('savedOk') : saving ? '…' : t('saveProfile')}
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

const inputCls =
  'w-full bg-cream-2 border border-line text-ink text-sm px-3 py-2.5 focus:outline-none focus:border-gold placeholder:text-ink-soft/50 transition-colors'

function FormField({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-[10px] tracking-[0.35em] uppercase text-ink-soft mb-2">
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </label>
      {children}
    </div>
  )
}
