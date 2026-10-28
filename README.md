# AURELIA INVITATION STUDIO — Situs Publik

Situs publik versi redesign, dibangun di atas proyek yang sama (bukan proyek baru).
Yang berjalan di situs ini: beranda/hero, katalog, demo pratinjau, paket, add-on,
form pemesanan WhatsApp, FAQ, kebijakan privasi & syarat layanan, dan kontak resmi.

Yang BELUM ada di versi ini dan menjadi fase berikutnya:
editor undangan, login pelanggan/admin, dan dashboard.
Jangan klaim fitur-fitur itu sudah berjalan.

## Data (tidak diubah oleh redesign)
- Admin: Ardi, WhatsApp 6281290603522, email sumardialdiansyah@gmail.com, Instagram @kafee.in, jam layanan 08.00–22.00 WIB
- Transfer manual: Bank BCA, rekening 6881131649, atas nama Sumardi
- Harga tetap: Starter Rp49.000, Signature Rp99.000, Royal Rp179.000, Custom sesuai kebutuhan; kupon AURELIA10 tetap aktif (10% dari harga paket).
- Katalog: 40 template, 12 unggulan; add-on: 9. Data sama dengan seed Supabase proyek aurelia-invitation-studio.
- Supabase project: aurelia-invitation-studio, region ap-southeast-1
- Tidak ada secret key, kredensial admin, atau environment variable rahasia di file situs ini.
- Tidak ada testimoni di situs ini, karena belum ada testimoni dari pelanggan nyata.
- Kebijakan revisi dan pengembalian dana belum ditentukan secara tertulis di situs ini; di FAQ dan syarat layanan hal itu dinyatakan apa adanya dan diarahkan ke konfirmasi admin.

## File yang diubah pada redesign (2026-10-28)
- index.html — hero + mockup CSS, katalog dengan pencarian & filter kategori, tabel perbandingan paket, form pemesanan lengkap dengan ringkasan, FAQ, kebijakan, kontak.
- styles.css — tema ivory/warm beige/champagne gold/sage secukupnya, serif + sans-serif sistem (tanpa font eksternal agar cepat), grid katalog 2 kolom HP / 3 tablet / 4 desktop, tombol min. 48px, fokus keyboard terlihat.
- app.js — data 40 template dipertahankan, filter/pencarian, demo modal, halaman demo, perhitungan subtotal − diskon + total, validasi form, pesan WhatsApp ter-encode.
- demo.html — halaman pratinjau baru per template (?template=kode-template), memakai data katalog yang sama, bukan data dummy.

## Fitur yang berhasil diuji (lokal, 2026-10-28)
- Sintaks app.js: node --check lolos.
- Jumlah data: 40 template, 12 unggulan, 9 add-on, harga paket lengkap.
- Hitungan contoh: Signature Rp99.000 + Custom Domain Rp75.000 − diskon AURELIA10 Rp9.900 = Rp164.100.
- Server lokal: index.html 200, demo.html?template=botanical-green 200.
- Catatan uji: alur WhatsApp end-to-end di browser nyata (klik tombol sampai WhatsApp terbuka) belum diuji di sesi lokal ini; itu akan diverifikasi setelah deploy Vercel, karena tombol memakai wa.me yang sama seperti versi sebelumnya.

## Error yang masih tersisa
- Tidak ada error sintaks atau error build yang ditemukan pada pemeriksaan lokal (situs statis, tanpa build command).
- Batasan yang masih ada, bukan error: editor/login/admin belum ada; detail fitur paket, batas revisi, dan masa aktif belum ditentukan admin; Supabase settings di proyek database masih kosong (data kontak di situs ini berasal dari file situs, belum disinkronkan ke tabel settings Supabase).

## Deploy ke Vercel (gratis, sudah terhubung)
1. Commit dan push file yang diubah ke repo GitHub aurelia-invitation-studio-public, branch main.
2. Vercel (proyek aurelia-invitation-studio-public, tim trial, Hobby) otomatis deploy dari repo itu — framework Other/static, tanpa build command, tanpa environment variable rahasia.
3. Tunggu status deployment Ready, lalu buka https://aurelia-invitation-studio-public.vercel.app dan cek: hero, pencarian/filter katalog, demo, form pemesanan, dan ringkasan.
4. Jika ada perubahan data kontak/harga di masa depan, ubah di file situs ini dan di data Supabase secara bersamaan, lalu deploy ulang.
