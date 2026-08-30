import type { Lang } from './i18n'

const mainPuPhoto = '/images/main_pu.png'
const panasonicV1 = '/images/Panasonic_v1.png'
const panasonicV2 = '/images/Panasonic_v2.png'
const panasonicV3 = '/images/Panasonic_v3.png'
const panasonicV4 = '/images/Panasonic_v4.png'

/* ──────────────────────────────────────────────
   Categories
   ────────────────────────────────────────────── */

export type Category = 'project' | 'artist' | 'brand' | 'kol'

/** Labels are brand terms — identical in both languages. */
export const CATEGORY_LABELS: Record<Category, string> = {
  project: 'PROJECT',
  artist: 'Artist',
  brand: 'Brand - Comercial',
  kol: 'KOL / INFLUENCERS',
}

export const CATEGORY_ORDER: Category[] = ['project', 'artist', 'brand', 'kol']

/** Old category keys → new ones, so data already in localStorage keeps working. */
const LEGACY_CATEGORY_MAP: Record<string, Category> = {
  commercial: 'brand',
  editorial: 'project',
  'celebrity-mv': 'artist',
  photoshoot: 'kol',
}

function normalizeCategory(value: unknown): Category {
  if (typeof value !== 'string') return 'project'
  if ((CATEGORY_ORDER as string[]).includes(value)) return value as Category
  return LEGACY_CATEGORY_MAP[value] ?? 'project'
}

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */

export interface Project {
  id: string
  title: string
  titleEn?: string
  subtitle?: string
  category: Category
  artist?: string
  brand?: string
  images: string[]
  youtubeUrl?: string
  description?: string
  descriptionEn?: string
  coverImage: string
  date: string
}

export interface SiteProfile {
  name: string
  nameEn: string
  nickname: string
  bio1: string
  bio2: string
  bio1En: string
  bio2En: string
  profilePhoto: string
  email: string
  phone: string
  instagram: string
  facebook: string
}

/* ──────────────────────────────────────────────
   Defaults
   ────────────────────────────────────────────── */

const DEFAULT_PROFILE: SiteProfile = {
  name: 'Nguyễn Khánh Hà',
  nameEn: 'Nguyen Khanh Ha',
  nickname: 'Pu90s',
  bio1: 'Xin chào! Mình là Nguyễn Khánh Hà (Pu90s), một stylist với niềm đam mê sáng tạo và thời trang. Với 6 năm kinh nghiệm, mình đã làm việc cùng nhiều thương hiệu và nghệ sĩ, tạo nên những hình ảnh ấn tượng, mang đậm cá tính.',
  bio2: 'Mình tin rằng thời trang là ngôn ngữ của sự tự tin và cá nhân hóa. Styling của mình hướng đến giúp khách hàng thể hiện rõ nét bản sắc riêng.',
  bio1En: "Hi! I'm Nguyen Khanh Ha (Pu90s), a stylist driven by a love of creativity and fashion. Over six years I have worked with brands and artists to build striking, character-rich imagery.",
  bio2En: 'I believe fashion is the language of confidence and individuality. My styling is about helping each client express who they really are.',
  profilePhoto: mainPuPhoto,
  email: 'nguyenthothangqt12@gmail.com',
  phone: '0867.470.512',
  instagram: 'Pu90s',
  facebook: 'https://www.facebook.com/ic.nguyen.16',
}

const SEED_PROJECTS: Project[] = [
  {
    id: 'seed-1',
    title: 'Key Visual — Panasonic',
    titleEn: 'Key Visual — Panasonic',
    subtitle: 'Dẫn Đầu Sống Xanh',
    category: 'brand',
    artist: 'Panasonic',
    brand: 'Panasonic',
    images: [panasonicV1, panasonicV2, panasonicV3, panasonicV4],
    youtubeUrl: 'https://www.youtube.com/watch?v=G0a2E7VHmEU',
    description: 'Chiến dịch key visual "Dẫn Đầu Sống Xanh" — Mặc Xanh, Ăn Xanh, Sống Xanh cho Panasonic Việt Nam. Styling cho 3 khung hình chủ đạo của chiến dịch.',
    descriptionEn: 'Key visual campaign "Dan Dau Song Xanh" — Wear Green, Eat Green, Live Green for Panasonic Vietnam. Styling for three hero shots across the brand campaign.',
    coverImage: panasonicV1,
    date: '2024',
  },
  {
    id: 'seed-2',
    title: 'Chiến dịch 7Up',
    titleEn: '7Up Campaign',
    subtitle: 'Soda Chanh',
    category: 'brand',
    artist: '7Up',
    brand: '7Up',
    images: [
      'https://images.unsplash.com/photo-1551113006-731674fbb3ff?w=900&h=1200&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1662532577856-e8ee8b138a8b?w=900&h=1200&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1613915617430-8ab0fd7c6baf?w=900&h=1200&fit=crop&auto=format',
    ],
    description: 'Styling rực rỡ cho TVC 7Up Soda Chanh. Bảng màu tươi trẻ, đồng bộ trên toàn bộ dàn diễn viên.',
    descriptionEn: 'Vibrant fashion styling for the 7Up Soda Chanh commercial. A bright, youthful colour palette coordinated across a full ensemble cast.',
    coverImage: 'https://images.unsplash.com/photo-1551113006-731674fbb3ff?w=600&h=800&fit=crop&auto=format',
    date: '2024',
  },
  {
    id: 'seed-3',
    title: 'Đồ án tốt nghiệp Styling',
    titleEn: 'Styling Graduation Project',
    subtitle: 'The Dark Garden',
    category: 'project',
    artist: 'Pu90s',
    brand: 'SFTV',
    images: [
      'https://images.unsplash.com/photo-1784031208107-f489c769e1f9?w=900&h=1200&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1704775986112-281c826c3ebd?w=900&h=1200&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1775829102453-bb16cc85c353?w=900&h=1200&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1770062422093-ae32c8fed2a3?w=900&h=1200&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1770062421988-7929b4748e29?w=900&h=1200&fit=crop&auto=format',
    ],
    description: 'Đồ án tốt nghiệp — editorial sân khấu tối, khai thác sự huyền ảo, nữ tính và siêu thực. Trang phục, mũ đội đầu và phối hợp tổng thể.',
    descriptionEn: 'Final styling graduation project — a dark theatrical editorial exploring fantasy, femininity and the surreal. Costumes, headpieces and full look coordination.',
    coverImage: 'https://images.unsplash.com/photo-1784031208107-f489c769e1f9?w=600&h=800&fit=crop&auto=format',
    date: '2023',
  },
  {
    id: 'seed-4',
    title: 'Styling 9 Em Xinh',
    titleEn: 'Styling 9 Em Xinh',
    subtitle: 'Music Video',
    category: 'artist',
    artist: '9 Em Xinh',
    brand: '9 Em Xinh',
    images: [
      'https://images.unsplash.com/photo-1674156397151-5694a8bfbd51?w=900&h=1200&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1681028442065-6d1a85eea2ef?w=900&h=1200&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1553375886-59c75d4ee8a3?w=900&h=1200&fit=crop&auto=format',
    ],
    youtubeUrl: '',
    description: 'Styling nhóm nghệ sĩ cho MV "Cảm ơn, cảm ơn" — chín thành viên, chín look riêng biệt gắn kết bằng một concept hình ảnh chung.',
    descriptionEn: 'Celebrity group styling for the music video "Cam on, cam on" — nine members, nine distinct looks tied together by one visual concept.',
    coverImage: 'https://images.unsplash.com/photo-1674156397151-5694a8bfbd51?w=600&h=800&fit=crop&auto=format',
    date: '2024',
  },
  {
    id: 'seed-5',
    title: 'KOL Bling Babi',
    titleEn: 'KOL Bling Babi',
    subtitle: 'Winter Luxe',
    category: 'kol',
    artist: 'Bling Babi',
    brand: 'Bling Babi',
    images: [
      'https://images.unsplash.com/photo-1553375886-59c75d4ee8a3?w=900&h=1200&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1775829102453-bb16cc85c353?w=900&h=1200&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1704775986112-281c826c3ebd?w=900&h=1200&fit=crop&auto=format',
    ],
    description: 'Bộ ảnh mùa đông sang trọng cho KOL Bling Babi. Lông vũ trắng, phom dáng oversized, mũ cấu trúc.',
    descriptionEn: 'Winter luxury photoshoot for KOL Bling Babi. All-white faux fur looks, oversized silhouettes, structured headwear.',
    coverImage: 'https://images.unsplash.com/photo-1553375886-59c75d4ee8a3?w=600&h=800&fit=crop&auto=format',
    date: '2024',
  },
  {
    id: 'seed-6',
    title: 'KOL Yuldaily',
    titleEn: 'KOL Yuldaily',
    subtitle: 'City Luxe',
    category: 'kol',
    artist: 'Yuldaily',
    brand: 'Yuldaily',
    images: [
      'https://images.unsplash.com/photo-1613915617430-8ab0fd7c6baf?w=900&h=1200&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1770062422093-ae32c8fed2a3?w=900&h=1200&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1662532577856-e8ee8b138a8b?w=900&h=1200&fit=crop&auto=format',
    ],
    description: 'Bộ ảnh city luxury hiện đại cho KOL Yuldaily. Tông hồng editorial trên nền kiến trúc, styling thường ngày nâng cấp.',
    descriptionEn: 'Modern city luxury photoshoot for KOL Yuldaily. A pink-toned editorial with architectural backdrops and elevated everyday styling.',
    coverImage: 'https://images.unsplash.com/photo-1613915617430-8ab0fd7c6baf?w=600&h=800&fit=crop&auto=format',
    date: '2024',
  },
]

/* ──────────────────────────────────────────────
   Persistence
   ────────────────────────────────────────────── */

const PROJECTS_KEY = 'pu90s_projects'
const PROFILE_KEY = 'pu90s_profile'
const AUTH_KEY = 'pu90s_auth'
const PASSWORD = 'pu90s2024'
const SEED_VERSION_KEY = 'pu90s_seed_v'
const SEED_VERSION = '7'

function migrateProject(raw: any): Project {
  return {
    id: String(raw?.id ?? `proj-${Math.random().toString(36).slice(2)}`),
    title: raw?.title ?? '',
    titleEn: raw?.titleEn ?? undefined,
    subtitle: raw?.subtitle ?? undefined,
    category: normalizeCategory(raw?.category),
    artist: raw?.artist ?? undefined,
    images: Array.isArray(raw?.images) ? raw.images.filter(Boolean) : [],
    brand: raw?.brand ?? undefined,
    youtubeUrl: raw?.youtubeUrl ?? undefined,
    description: raw?.description ?? undefined,
    descriptionEn: raw?.descriptionEn ?? undefined,
    coverImage: raw?.coverImage ?? (Array.isArray(raw?.images) ? raw.images[0] : '') ?? '',
    date: raw?.date ?? '',
  }
}

export function getProjects(): Project[] {
  try {
    const seedVersion = localStorage.getItem(SEED_VERSION_KEY)
    if (seedVersion !== SEED_VERSION) {
      localStorage.removeItem(PROJECTS_KEY)
      localStorage.removeItem(PROFILE_KEY)
      localStorage.setItem(SEED_VERSION_KEY, SEED_VERSION)
    }
    const stored = localStorage.getItem(PROJECTS_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) return parsed.map(migrateProject)
    }
  } catch {}
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(SEED_PROJECTS))
    localStorage.setItem(SEED_VERSION_KEY, SEED_VERSION)
  } catch {}
  return SEED_PROJECTS
}

export function saveProjects(projects: Project[]): void {
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects))
  } catch {}
}

export function addProject(project: Omit<Project, 'id'>): Project {
  const projects = getProjects()
  const newProject: Project = { ...project, id: `proj-${Date.now()}` }
  saveProjects([newProject, ...projects])
  return newProject
}

export function deleteProject(id: string): void {
  saveProjects(getProjects().filter(p => p.id !== id))
}

export function updateProject(project: Project): void {
  saveProjects(getProjects().map(p => (p.id === project.id ? project : p)))
}

export function getProfile(): SiteProfile {
  try {
    const stored = localStorage.getItem(PROFILE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      // Always use the code-defined photo, never the localStorage value
      return { ...DEFAULT_PROFILE, ...parsed, profilePhoto: DEFAULT_PROFILE.profilePhoto }
    }
  } catch {}
  return DEFAULT_PROFILE
}

export function saveProfile(profile: SiteProfile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
  } catch {}
}

export function login(password: string): boolean {
  if (password === PASSWORD) {
    try {
      localStorage.setItem(AUTH_KEY, 'true')
    } catch {}
    return true
  }
  return false
}

export function logout(): void {
  try {
    localStorage.removeItem(AUTH_KEY)
  } catch {}
}

export function isAuthenticated(): boolean {
  try {
    return localStorage.getItem(AUTH_KEY) === 'true'
  } catch {
    return false
  }
}

export function getArtists(projects: Project[]): string[] {
  const set = new Set<string>()
  projects.forEach(p => {
    if (p.artist) set.add(p.artist)
  })
  return Array.from(set)
}

/* ──────────────────────────────────────────────
   Language-aware helpers
   ────────────────────────────────────────────── */

export function projectTitle(p: Project, lang: Lang): string {
  return lang === 'en' ? (p.titleEn?.trim() || p.title) : p.title
}

export function projectDescription(p: Project, lang: Lang): string {
  return lang === 'en' ? (p.descriptionEn?.trim() || p.description || '') : p.description || ''
}

export function profileName(profile: SiteProfile, lang: Lang): string {
  return lang === 'en' ? (profile.nameEn?.trim() || profile.name) : profile.name
}

export function profileBio(profile: SiteProfile, lang: Lang): [string, string] {
  if (lang === 'en') {
    return [profile.bio1En?.trim() || profile.bio1, profile.bio2En?.trim() || profile.bio2]
  }
  return [profile.bio1, profile.bio2]
}
