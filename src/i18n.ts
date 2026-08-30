import { createContext, useContext } from 'react'

export type Lang = 'vi' | 'en'

export const LANG_KEY = 'khanhha_lang'

export const DICT = {
  vi: {
    // ── Nav ──
    navAbout: 'Giới thiệu',
    navServices: 'Dịch vụ',
    navPortfolio: 'Portfolio',
    navArtists: 'Nghệ sĩ',
    navContact: 'Liên hệ',
    login: 'Đăng nhập',
    dashboard: 'Quản trị',
    ownerLogin: 'Đăng nhập quản trị',
    toggleMenu: 'Mở menu',

    // ── Hero ──
    heroQuote: '"Stylist là những người hùng thầm lặng của ngành thời trang."',
    aboutMe: 'Giới thiệu',
    role: 'Stylist',
    labelEmail: 'Email',
    labelPhone: 'Điện thoại',
    labelInstagram: 'Instagram',
    labelFacebook: 'Facebook',

    introText1:
      'Mỗi dự án trong portfolio này là sự giao thoa giữa thẩm mỹ tinh tế, sự tỉ mỉ trong từng chi tiết và khả năng nắm bắt xu hướng. Mình luôn tin rằng thời trang không chỉ là bề ngoài, mà là cách kể chuyện, truyền cảm hứng và tạo nên phong cách riêng biệt cho mỗi cá nhân.',
    introText2: 'Rất hân hạnh được chia sẻ hành trình sáng tạo của mình qua từng dự án.',
    introHeading: 'GIỚI THIỆU',

    // ── Portfolio ──
    portfolio: 'Portfolio',
    selectedWorks: 'DỰ ÁN TIÊU BIỂU',
    byCategory: 'Theo hạng mục',
    byArtist: 'Theo nghệ sĩ',
    all: 'Tất cả',
    allArtists: 'Tất cả nghệ sĩ',
    noProjects: 'Chưa có dự án nào',
    viewProject: 'Xem dự án',

    // ── Lightbox ──
    artist: 'Nghệ sĩ',
    labelBrand: 'Thương hiệu',
    year: 'Năm',
    photos: 'Ảnh',
    watchVideo: 'Xem video',
    backToPhotos: 'Quay lại ảnh',
    close: 'Đóng',
    previous: 'Trước',
    next: 'Sau',

    // ── Contact ──
    contactHeading: ['HỢP TÁC VÀ', 'GIỚI THIỆU'],
    footerRole: 'Stylist',

    // ── Login ──
    backToPortfolio: 'Quay lại portfolio',
    ownerDashboard: 'Trang quản trị',
    password: 'Mật khẩu',
    passwordPlaceholder: 'Nhập mật khẩu',
    enterDashboard: 'Vào trang quản trị',
    verifying: 'Đang kiểm tra…',
    wrongPassword: 'Mật khẩu không đúng.',
    defaultPassword: 'Mật khẩu mặc định: pu90s2024',
    signInWithGoogle: 'Đăng nhập bằng Google',
    signingIn: 'Đang đăng nhập…',
    accessDenied: 'Tài khoản này không có quyền truy cập.',

    // ── Admin ──
    admin: 'Quản trị',
    viewSite: 'Xem website',
    logout: 'Đăng xuất',
    allProjects: 'Tất cả dự án',
    addProject: 'Thêm dự án',
    editProject: 'Sửa dự án',
    editProfile: 'Sửa hồ sơ',
    projectsCount: 'dự án',
    addNew: '+ Thêm mới',
    edit: 'Sửa',
    delete: 'Xoá',
    confirm: 'Xác nhận',
    cancel: 'Huỷ',
    noProjectsYet: 'Chưa có dự án nào.',
    fTitle: 'Tiêu đề (VI)',
    fTitleEn: 'Tiêu đề (EN)',
    fSubtitle: 'Phụ đề',
    fCategory: 'Hạng mục',
    fArtist: 'Nghệ sĩ / Khách hàng',
    fYear: 'Năm',
    fYoutube: 'Link YouTube',
    fCover: 'Ảnh bìa (URL)',
    fBrand: 'Thương hiệu',
    fGallery: 'Ảnh bộ sưu tập (mỗi dòng một URL)',
    fGalleryHint: 'Mỗi URL một dòng. Ảnh bìa được tự động thêm vào.',
    fDescription: 'Mô tả (VI)',
    fDescriptionEn: 'Mô tả (EN)',
    saveProject: 'Lưu dự án',
    updateProject: 'Cập nhật',
    fName: 'Tên (VI)',
    fNameEn: 'Tên (EN)',
    fNickname: 'Biệt danh',
    fPhoto: 'Ảnh đại diện (URL)',
    fBio1: 'Giới thiệu — đoạn 1 (VI)',
    fBio2: 'Giới thiệu — đoạn 2 (VI)',
    fBio1En: 'Giới thiệu — đoạn 1 (EN)',
    fBio2En: 'Giới thiệu — đoạn 2 (EN)',
    saveProfile: 'Lưu hồ sơ',
    savedOk: 'Đã lưu ✓',
    optionalEnHint: 'Bỏ trống sẽ dùng nội dung tiếng Việt.',
    manageCategories: 'Hạng mục',
    addCategory: 'Thêm hạng mục',
    fCategoryId: 'ID (không dấu, không cách)',
    fCategoryVi: 'Tên hạng mục (VI)',
    fCategoryEn: 'Tên hạng mục (EN)',
    saveCategory: 'Lưu hạng mục',
    noCategoriesYet: 'Chưa có hạng mục nào.',
  },

  en: {
    // ── Nav ──
    navAbout: 'About',
    navServices: 'Services',
    navPortfolio: 'Portfolio',
    navArtists: 'Artists',
    navContact: 'Contact',
    login: 'Login',
    dashboard: 'Dashboard',
    ownerLogin: 'Owner Login',
    toggleMenu: 'Toggle menu',

    // ── Hero ──
    heroQuote: '"Stylists are the unsung heroes of the fashion industry."',
    aboutMe: 'Giới thiệu',
    role: 'Stylist',
    labelEmail: 'Email',
    labelPhone: 'Phone',
    labelInstagram: 'Instagram',
    labelFacebook: 'Facebook',

    introText1:
      'Every project in this portfolio sits at the intersection of refined taste, meticulous attention to detail and a close read of where fashion is heading. I believe styling is never only about the surface — it is a way of telling a story, creating a mood and shaping a look that belongs to one person alone.',
    introText2: 'It is a pleasure to share my creative journey through each of these projects.',
    introHeading: 'INTRODUCTION',

    // ── Portfolio ──
    portfolio: 'Portfolio',
    selectedWorks: 'SELECTED WORKS',
    byCategory: 'By Category',
    byArtist: 'By Artist',
    all: 'All',
    allArtists: 'All Artists',
    noProjects: 'No projects yet',
    viewProject: 'View Project',

    // ── Lightbox ──
    artist: 'Artist',
    labelBrand: 'Brand',
    year: 'Year',
    photos: 'Photos',
    watchVideo: 'Watch Video',
    backToPhotos: 'Back to Photos',
    close: 'Close',
    previous: 'Previous',
    next: 'Next',

    // ── Contact ──
    contactHeading: ["LET'S WORK", 'TOGETHER'],
    footerRole: 'Stylist',

    // ── Login ──
    backToPortfolio: 'Back to Portfolio',
    ownerDashboard: 'Owner Dashboard',
    password: 'Password',
    passwordPlaceholder: 'Enter password',
    enterDashboard: 'Enter Dashboard',
    verifying: 'Verifying…',
    wrongPassword: 'Incorrect password.',
    defaultPassword: 'Default password: pu90s2024',
    signInWithGoogle: 'Sign in with Google',
    signingIn: 'Signing in…',
    accessDenied: 'This account does not have access.',

    // ── Admin ──
    admin: 'Admin',
    viewSite: 'View Site',
    logout: 'Logout',
    allProjects: 'All Projects',
    addProject: 'Add Project',
    editProject: 'Edit Project',
    editProfile: 'Edit Profile',
    projectsCount: 'projects',
    addNew: '+ Add New',
    edit: 'Edit',
    delete: 'Delete',
    confirm: 'Confirm',
    cancel: 'Cancel',
    noProjectsYet: 'No projects yet.',
    fTitle: 'Title (VI)',
    fTitleEn: 'Title (EN)',
    fSubtitle: 'Subtitle',
    fCategory: 'Category',
    fArtist: 'Artist / Client',
    fYear: 'Year',
    fYoutube: 'YouTube URL',
    fCover: 'Cover Image URL',
    fBrand: 'Brand',
    fGallery: 'Gallery Images (one URL per line)',
    fGalleryHint: 'Each URL on a separate line. Cover image is included automatically.',
    fDescription: 'Description (VI)',
    fDescriptionEn: 'Description (EN)',
    saveProject: 'Save Project',
    updateProject: 'Update',
    fName: 'Name (VI)',
    fNameEn: 'Name (EN)',
    fNickname: 'Nickname',
    fPhoto: 'Profile Photo URL',
    fBio1: 'Bio — paragraph 1 (VI)',
    fBio2: 'Bio — paragraph 2 (VI)',
    fBio1En: 'Bio — paragraph 1 (EN)',
    fBio2En: 'Bio — paragraph 2 (EN)',
    saveProfile: 'Save Profile',
    savedOk: 'Saved ✓',
    optionalEnHint: 'Leave empty to fall back to the Vietnamese text.',
    manageCategories: 'Categories',
    addCategory: 'Add Category',
    fCategoryId: 'ID (no spaces, no accents)',
    fCategoryVi: 'Category name (VI)',
    fCategoryEn: 'Category name (EN)',
    saveCategory: 'Save Category',
    noCategoriesYet: 'No categories yet.',
  },
} as const

export type Dict = (typeof DICT)['vi']
export type TKey = keyof Dict

export interface LangContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: <K extends TKey>(key: K) => Dict[K]
}

export const LangContext = createContext<LangContextValue>({
  lang: 'vi',
  setLang: () => {},
  t: (<K extends TKey>(key: K) => DICT.vi[key]) as LangContextValue['t'],
})

export function useLang(): LangContextValue {
  return useContext(LangContext)
}

export function getStoredLang(): Lang {
  try {
    const stored = localStorage.getItem(LANG_KEY)
    if (stored === 'vi' || stored === 'en') return stored
  } catch {}
  return 'vi'
}

export function storeLang(lang: Lang): void {
  try {
    localStorage.setItem(LANG_KEY, lang)
  } catch {}
}

/** Picks the English value when the current language is EN and a value exists. */
export function pick(lang: Lang, vi: string | undefined, en: string | undefined): string {
  if (lang === 'en') return (en && en.trim()) || vi || ''
  return vi || ''
}
