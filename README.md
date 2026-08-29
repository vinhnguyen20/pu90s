# Nguyễn Khánh Hà — Portfolio (VI / EN)

Website portfolio stylist, viết bằng React 19 + TypeScript + Vite 8 + Tailwind CSS 4.

## Chạy dự án

Yêu cầu: Node.js 20 trở lên.

```bash
npm install
npm run dev      # chạy dev tại http://localhost:8443
npm run build    # build ra thư mục dist/
npm run preview  # xem thử bản build
```

Đổi cổng dev: `PORT=3000 npm run dev`.

## Những gì đã thay đổi

- **Tông màu vàng kem sáng.** Toàn bộ palette nằm ở `src/index.css` (khối `@theme`).
  Chỉnh vài dòng ở đó là đổi được cả site:

  | Token | Dùng cho | Giá trị |
  |---|---|---|
  | `--color-cream` | nền trang | `#fdf6df` |
  | `--color-cream-2` | section xen kẽ, panel | `#f9edcb` |
  | `--color-cream-3` | ô ảnh / placeholder | `#f3e4b4` |
  | `--color-nav` | navbar khi ở đầu trang | `#f2e1a8` |
  | `--color-nav-solid` | navbar khi đã cuộn | `#ecd894` |
  | `--color-ink` / `--color-ink-soft` | chữ | `#3a2f18` / `#6b5a34` |
  | `--color-gold` / `--color-gold-deep` | màu nhấn | `#a37f25` / `#7d601a` |
  | `--color-line` | đường viền | `#ddc98c` |

  Navbar dùng `--color-nav` / `--color-nav-solid`, đậm hơn nền trang một chút để tách khỏi nội dung.

- **Song ngữ Việt / Anh.** Toàn bộ chuỗi giao diện nằm trong `src/i18n.ts` (`DICT.vi` và `DICT.en`).
  Nút VI/EN nằm ở navbar và ở thanh trên của trang quản trị; lựa chọn được lưu trong `localStorage`.
  Mặc định là tiếng Việt.

  Nội dung do chủ site nhập (tiêu đề, mô tả dự án, bio) có thêm ô **(EN)** trong trang quản trị.
  Bỏ trống ô EN thì bản tiếng Anh sẽ tự dùng lại nội dung tiếng Việt.

- **Hạng mục mới** (`src/store.ts`): `PROJECT`, `Artist`, `Brand - Comercial`, `KOL / INFLUENCERS`.
  Dữ liệu cũ trong `localStorage` được tự động chuyển đổi:
  `commercial → Brand`, `editorial → PROJECT`, `celebrity-mv → Artist`, `photoshoot → KOL`.

- **Logo** lấy từ hồ sơ: `Nguyễn Khánh Hà` (VI) và `Nguyen Khanh Ha` (EN).
  Sửa trong trang quản trị → *Sửa hồ sơ* → ô **Tên (VI)** / **Tên (EN)**.

## Trang quản trị

Nhấn **Đăng nhập** ở navbar. Mật khẩu mặc định: `pu90s2024`
(đổi ở hằng số `PASSWORD` trong `src/store.ts`).

Dữ liệu dự án và hồ sơ được lưu trong `localStorage` của trình duyệt, chưa có backend —
nghĩa là mỗi máy/trình duyệt giữ dữ liệu riêng.

## Cấu trúc

```
src/
  App.tsx                  điều phối trang + provider ngôn ngữ
  i18n.ts                  từ điển VI/EN + hook useLang()
  store.ts                 dữ liệu, hạng mục, localStorage, helper theo ngôn ngữ
  index.css                bảng màu + font + animation
  components/
    Nav.tsx                navbar, logo, nút VI/EN
    Hero.tsx               giới thiệu + strip INTRODUCTION
    PortfolioSection.tsx   lọc theo hạng mục / nghệ sĩ, lưới dự án
    Lightbox.tsx           xem ảnh + video YouTube
    ContactSection.tsx     liên hệ + footer
    LoginPage.tsx          đăng nhập quản trị
    AdminPanel.tsx         thêm / sửa / xoá dự án, sửa hồ sơ
```
