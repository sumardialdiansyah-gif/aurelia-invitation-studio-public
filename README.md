# AURELIA INVITATION STUDIO — Situs Publik (Redesign Master Prompt)

Situs statis, tanpa framework, tanpa package manager, tanpa build command.
Halaman: index.html (beranda + katalog + paket + form) dan demo.html (pratinjau per template).
File lain: styles.css, app.js, vercel.json, robots.txt, sitemap.xml.

## 1. Ringkasan perubahan desain
- Design tokens persis dari brief: Warm Ivory #F8F5EF, Champagne Beige #E8DDCE, Soft Taupe #A79886, Deep Espresso #352D28, Muted Sage #A7AD99, White #FFFFFF.
- Homepage diurutkan: announcement bar (info aktual saja, tanpa countdown/kelangkaan palsu), header + menu HP, hero baru, keunggulan, koleksi unggulan, cara pemesanan 7 langkah, katalog, paket, add-on, contoh, form multistep, FAQ, kebijakan, footer dengan tahun copyright otomatis.
- Hero baru: "Rayakan Kisah Cintamu dengan Undangan Digital yang Berkesan." + subheadline dari brief, CTA Jelajahi Koleksi dan Konsultasi via WhatsApp, mockup smartphone CSS (bukan foto).
- Katalog: 2 kolom HP (termasuk penyesuaian 320–380px), 3 tablet, 4 desktop; pencarian nama/kode, filter tema, urutan (unggulan dulu / nama / kategori), filter hanya unggulan, reset filter, empty state informatif, template terpilih tersimpan di localStorage perangkat dan tetap terlihat saat kembali dari demo.
- Form pemesanan multistep 6 langkah dengan indikator progres, tombol kembali/lanjut, validasi per langkah, state tidak hilang saat kembali, dan langkah 6 berisi ringkasan final + tombol Salin Ringkasan + tombol WhatsApp.

## 2. Halaman dan komponen yang diubah
- index.html, styles.css, app.js (perubahan utama)
- demo.html dipertahankan dengan data katalog yang sama; tautan Pesan dari demo mengisi template di form.
- Baru: robots.txt, sitemap.xml
- Tidak diubah: vercel.json

## 3. Fitur baru
- Menu navigasi HP, announcement bar, koleksi unggulan, cara pemesanan visual, contoh hasil (pratinjau template, bukan undangan asli pelanggan)
- Filter tema + urutan + reset filter + empty state
- Penyimpanan pilihan template di localStorage
- Form multistep dengan data acara: nama pasangan, tanggal, waktu, lokasi, alamat/tautan peta, detail acara, catatan (wajib hanya nama pemesan + nomor WhatsApp + template + paket)
- Validasi nomor WhatsApp (digit 9–15, diawali 0 atau 62) dan tanggal, error di dekat kolom
- Kupon dengan tombol Terapkan + status berhasil/gagal (hanya AURELIA10 yang dikenali)
- Pesan WhatsApp terstruktur sesuai format brief, ter-encode, plus tombol Salin Ringkasan sebagai cadangan
- Stub analytics yang tidak aktif (AURELIA_ANALYTICS_ID kosong) dan tidak mengirim nama/nomor/detail acara
- SEO dasar: canonical, Open Graph, favicon, robots.txt, sitemap.xml

## 4. Bug yang diperbaiki
- Bug modal demo sebelumnya (CSS display:flex menimpa hidden, modal tampil kosong dan tidak bisa ditutup) sudah diperbaiki pada commit 87f6cb1 dan dipertahankan di redesign ini: aturan .modal[hidden]{display:none !important} + penguncian scroll.
- Tidak ada bug baru yang ditemukan pada pemeriksaan lokal kali ini.

## 5. Fitur lama yang dipertahankan
- URL, nomor WhatsApp 6281290603522, harga paket (Starter Rp49.000, Signature Rp99.000, Royal Rp179.000, Custom sesuai kebutuhan), harga 9 add-on, kupon AURELIA10 (10% dari harga paket), seluruh 40 template (12 unggulan), kontak admin, dan info transfer manual Bank BCA.
- Tidak ada label "Paling Populer" (tidak ada data pendukung), tidak ada testimoni (belum ada testimoni pelanggan nyata), tidak ada klaim revisi tanpa batas / pengerjaan instan / garansi / sertifikasi / jumlah pelanggan.

## 6. Hasil build dan pengujian (lokal, 2026-10-28)
- Situs statis, tanpa build command; node --check app.js lolos.
- Data: 40 template, 12 unggulan, 9 add-on terverifikasi dari file.
- Hitungan: Signature Rp99.000 + Custom Domain Rp75.000 − diskon Rp9.900 = Rp164.100; Starter tanpa add-on/kupon = Rp49.000; kupon salah = tanpa diskon; total tidak negatif (Math.max 0).
- Server lokal: index 200, demo?template=botanical-green 200, robots.txt 200, sitemap.xml 200.
- Pencarian secret di frontend: tidak ditemukan service-role key atau kredensial (hanya kata "secret" di kalimat penjelasan README lama yang sudah diganti di versi ini).

## 7. Masalah yang belum terselesaikan
- Thumbnail kartu masih pratinjau gaya CSS, bukan gambar desain asli template, karena file gambar desain asli belum tersedia di proyek situs publik ini. Jangan klaim kartu itu foto desain asli.
- Filter gaya dan warna tidak tersedia karena metadata gaya/warna tidak ada di data katalog.
- Pesanan WhatsApp tidak otomatis masuk ke database situs publik ini. Supabase memiliki tabel orders dll., tetapi situs publik ini tidak menulis pesanan ke Supabase dan tidak punya dashboard admin. Itu rekomendasi pengembangan berikutnya, bukan fitur yang diklaim berjalan.
- RLS Supabase masih kebijakan contoh dasar dan perlu diuji ulang sebelum go-live penuh (temuan sebelumnya, belum diubah di langkah ini).
- Tabel settings Supabase masih kosong; data kontak di situs ini berasal dari file situs, belum disinkronkan ke tabel settings.

## 8. Konfigurasi yang masih membutuhkan data dari pemilik
- Detail fitur tiap paket, batas revisi, masa aktif, dan waktu pengerjaan — ditandai "Dikonfigurasi admin" di situs.
- Kebijakan revisi dan pembatalan/pengembalian dana tertulis — belum ditetapkan, diarahkan ke konfirmasi admin.
- Gambar desain asli tiap template, jika ingin thumbnail benar-benar sesuai desain.
- Metadata gaya/warna tiap template, jika ingin filter gaya/warna.
- ID analytics, jika pemilik ingin mengaktifkan analytics (saat ini kosong dan tidak aktif).

## 9. Instruksi menjalankan proyek
- Situs statis: buka index.html langsung, atau jalankan server lokal dari folder ini, contoh: python3 -m http.server 8000, lalu buka http://127.0.0.1:8000/index.html
- Tidak ada instalasi dependensi dan tidak ada build.

## 10. Instruksi deployment ke Vercel
1. Commit dan push file yang diubah ke repo GitHub aurelia-invitation-studio-public, branch main.
2. Vercel (proyek aurelia-invitation-studio-public, tim trial, Hobby) otomatis deploy dari repo itu — framework Other/static, tanpa build command, tanpa environment variable rahasia.
3. Tunggu status Ready, lalu buka https://aurelia-invitation-studio-public.vercel.app dan cek: hero, menu HP, pencarian/filter katalog, demo, form multistep, ringkasan, dan tombol WhatsApp.
4. Jika ada perubahan data kontak/harga di masa depan, ubah di file situs ini dan di data Supabase secara bersamaan, lalu deploy ulang.

## 11. Pengujian manual yang masih harus dilakukan
- Buka situs live di HP 320–430px, tablet, dan desktop; cek tidak ada horizontal overflow dan modal bisa ditutup.
- Coba alur penuh: pilih template dari katalog → paket → add-on → isi data → terapkan kupon → tinjau → salin ringkasan → buka WhatsApp, dan pastikan pesan yang terbuka sama dengan ringkasan.
- Coba kembali ke langkah sebelumnya dan pastikan pilihan tidak hilang.
- Coba input salah (nama kosong, nomor WhatsApp tidak valid, template/paket belum dipilih) dan pastikan error tampil di dekat kolom.
- Coba filter yang tidak menghasilkan apa-apa dan tombol Reset Filter.
