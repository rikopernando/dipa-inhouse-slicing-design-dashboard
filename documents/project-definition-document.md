## 📄 Product Requirement Document (PRD): StableVault Dashboard

Dashboard "StableVault" ini memiliki desain modern (dark mode) dengan fitur manajemen aset kripto yang cukup komprehensif, mulai dari pemantauan portofolio, transaksi swap, hingga staking.

### 1. Ringkasan Eksekutif

StableVault adalah platform manajemen aset kripto yang memungkinkan pengguna untuk memantau performa portofolio secara real-time, melakukan penukaran aset (swap), mengelola aset yang di-stake, dan memantau tren pasar global.

### 2. Target Pengguna

- Investor kripto ritel yang memiliki aset di berbagai chain.
- Trader yang membutuhkan akses cepat untuk penukaran aset.
- Pengguna yang ingin memaksimalkan pendapatan pasif melalui staking.

### 3. Fitur Utama (Berdasarkan Gambar)

- **Security Alert:** Status keamanan user (apakah 2FA sudah aktif atau belum)
- **Portfolio Tracking:** Grafik performa historis (garis) dengan filter rentang waktu (1W, 1M, 6M, dll).
- **Quick Access (Swap):** Widget cepat untuk menukar satu token ke token lain tanpa berpindah halaman.
- **Asset Management:** Daftar aset yang dimiliki beserta nilai valuasi dan perubahan harganya.
- **Portfolio Breakdown:** Visualisasi komposisi aset menggunakan _donut chart_.
- **Staking Management:** Ringkasan estimasi pendapatan bulanan dan daftar aset yang sedang di-_stake_.
- **Market Overview:** Daftar harga pasar _real-time_ untuk koin-koin populer.
- **Community Feed:** Integrasi sosial untuk melihat opini pasar dari pengguna lain.

### 4. Spesifikasi Teknis (Rekomendasi)

- **Frontend:** React.js atau Next.js (Tailwind CSS untuk styling).
- **Charts:** Recharts atau Chart.js.
- **Icons:** Lucide React atau FontAwesome.
- **Architecture:** Lihat pada ARCHITECTURE.md

---

## ✅ TODO List Pengembangan

Saya membagi ini menjadi beberapa fase pengembangan agar lebih terstruktur.

| ID         | Task / Fitur                              | Deskripsi                                                                                                                            | Status  |
| ---------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| **Fase 1** | **Setup & Layouting**                     |                                                                                                                                      |         |
| 1.1        | Project Initialization                    | Setup Next.js, Tailwind CSS, dan Folder Structure.                                                                                   | DONE    |
| 1.2        | Sidebar Navigation                        | Membuat navigasi samping (Dashboard, Assets, Market, dll).                                                                           | Pending |
| 1.3        | Top Header                                | Membuat search bar, settings, dan profil user.                                                                                       | DONE    |
| **Fase 2** | **Core Dashboard UI**                     |                                                                                                                                      |         |
| 2.1        | Security Alert                            | Alert Status Keamanan dibagian atas dashboard page.                                                                                  | Pending |
| 2.2        | Portfolio Line Chart / Portfolio Tracking | Grafik utama di bagian atas.                                                                                                         | Pending |
| 2.3        | Quick Access                              | Membuat UI input penukaran token, selain itu terdapat 4 kategori (Swap, Deposit, Withdraw Transfer) Quick Access dan tombol preview. | Pending |
| 2.4        | Assets & Breakdown                        | Membuat tabel aset dan Donut Chart komposisi portofolio.                                                                             | Pending |
| 2.5        | Staking Management                        | Ringkasan estimasi pendapatan bulanan dan daftar aset yang sedang di-_stake_ sorting.                                                | pending |
| 2.6        | Market table                              | list harga koin dengan filter dan fungsi sorting.                                                                                    | pending |
| 2.7        | Community Feed                            | Card list horizontal scrollable, terdapat komentar, jumlah komentar, jumlah like dan tombol share                                    | pending |
| **Fase 3** | **Finishing**                             |                                                                                                                                      |         |
| 3.1        | Responsive Design                         | Memastikan dashboard rapi di tampilan tablet dan mobile.                                                                             | Pending |
| 3.2        | Dark Mode Optimization                    | Memastikan kontras warna sesuai dengan gambar referensi.                                                                             | Pending |
