# 📄 Product Requirement Document (PRD) - Slicing Design Project

## I. Ringkasan Proyek

| **Atribut**               | **Detail**                                                                                                                                           |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Nama Proyek**           | Dipa Inhouse UI Slicing Project                                                                                                                      |
| **Tujuan**                | Menerjemahkan desain statis menjadi antarmuka web yang **fungsional, _pixel-perfect_, dan responsif** menggunakan praktik terbaik _Senior Frontend_. |
| **Deliverables**          | Kode sumber yang di-_push_ ke GitHub/GitLab dan _preview_ yang di-_deploy_ di Vercel/Netlify.                                                        |
| **Tech Stack Wajib**      | Next.js (TypeScript), React, Tailwind CSS, ESLint/Prettier.                                                                                          |
| **Kriteria Kunci Sukses** | **Pixel Perfection**, **Mobile-First Responsiveness**, **Smooth Animation**.                                                                         |

---

## II. Tugas Utama dan Kriteria Implementasi

Proyek ini terbagi menjadi tiga fokus utama: Struktur, Desain/Slicing, dan Animasi/Interaksi.

### 1. Struktur dan Kualitas Kode

| **ID**   | **Tugas**               | **Kriteria Penilaian**                                                                                                                         |
| -------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **S-01** | **Arsitektur Komponen** | Wajib menggunakan prinsip **Atomic Design** yang ketat (Atom, Molecule, Organism, Template). Struktur folder harus mencerminkan pembagian ini. |
| **S-02** | **Type Safety**         | Semua komponen (terutama Atom dan Molecule) harus memiliki **Props Interface** yang didefinisikan secara eksplisit menggunakan **TypeScript**. |
| **S-03** | **Standar Kode**        | Kode harus bersih dan konsisten, mematuhi aturan **ESLint** dan format **Prettier** (termasuk `prettier-plugin-tailwindcss`).                  |

### 2. Slicing dan Responsiveness (Mobile-First)

| **ID**   | **Tugas**               | **Kriteria Penilaian**                                                                                                                                                                                                 |
| -------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **D-01** | **Pixel Perfection**    | Semua margin, padding, _font size_, dan skema warna harus sesuai 1:1 dengan desain yang diberikan.                                                                                                                     |
| **D-02** | **Mobile View (Wajib)** | Menerapkan pendekatan **Mobile-First**. Tata letak harus berfungsi dengan baik pada lebar layar kecil (misalnya, 375px). _Breakpoint_ harus disesuaikan menggunakan utilitas responsif Tailwind (`sm:`, `md:`, `lg:`). |
| **D-03** | **Navbar Responsif**    | Implementasikan _Header_ dengan navigasi yang berfungsi. Pada _mobile view_, tampilkan **Hamburger Menu** yang dapat dibuka/ditutup (menggunakan _state_ React).                                                       |
| **D-04** | **Penggunaan Tailwind** | Gunakan utilitas Tailwind secara efisien dan hindari _inline style_ yang berlebihan. Konfigurasi `tailwind.config.js` jika ada warna atau _font_ kustom.                                                               |

### 3. Interaksi dan Animasi

| **ID**   | **Tugas**                         | **Kriteria Penilaian**                                                                                                                                                                                       |
| -------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **A-01** | **Simple Animation**              | Terapkan **efek _hover_** halus pada tombol dan kartu (`transition`, `duration-300`, `ease-in-out`, `scale`).                                                                                                |
| **A-02** | **Scroll Animation (Nilai Plus)** | Implementasikan efek **Scroll Reveal** (misalnya, _fade-in_ atau _slide-up_) pada bagian-bagian utama halaman saat pengguna menggulir. **Framer Motion** sangat disarankan untuk implementasi yang _smooth_. |
| **A-03** | **Transisi UI**                   | Pastikan setiap perubahan _state_ UI (misalnya, membuka/menutup menu _mobile_) memiliki transisi yang halus.                                                                                                 |

---

## III. Langkah Kerja Prioritas

Mengingat Anda telah menyelesaikan _setup_ dasar (Tailwind, Next.js, TS), fokus harus langsung pada _slicing_ dan _responsiveness_.

| **Langkah** | **Fokus Utama**           | **Durasi Estimasi** |
| ----------- | ------------------------- | ------------------- |
| **L1**      | **Slicing Layout Dasar**  | 20% Waktu           |
| **L2**      | **Slicing Section Utama** | 40% Waktu           |
| **L3**      | **Finishing & Animation** | 30% Waktu           |
| **L4**      | **QA & Dokumentasi**      | 10% Waktu           |

---
