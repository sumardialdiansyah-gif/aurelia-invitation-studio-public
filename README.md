# AURELIA INVITATION STUDIO — Situs Publik Versi Pertama

Ini adalah kode situs publik versi pertama, BUKAN salinan penuh aplikasi Muse.
Yang ada di versi ini: beranda penjualan, katalog 40 template (12 unggulan),
4 paket, 9 add-on, dan pemesanan WhatsApp click-to-chat.

Yang BELUM ada di versi ini dan menjadi fase berikutnya:
editor undangan, login pelanggan/admin, dashboard, dan publikasi /i/nama-acara
dengan data dari Supabase secara live.

## Data
Data di app.js sama dengan data Supabase yang sudah terverifikasi:
- packages: Starter Rp49.000, Signature Rp99.000, Royal Rp179.000, Custom Rp0
- coupons: AURELIA10, diskon 10%, aktif
- templates: 40, featured 12
- addons: 9
- Supabase project: aurelia-invitation-studio, region ap-southeast-1

## Sebelum dipakai untuk pembeli asli
1. Isi ADMIN_WHATSAPP_NUMBER di app.js dengan format 628... tanpa +, spasi, atau strip.
   Saat ini sengaja kosong dan tombol pesan menampilkan peringatan.
2. Jangan klaim situs ini sudah punya editor/login/admin — itu belum ada di versi ini.

## Deploy ke Vercel (gratis)
1. Buat repo GitHub baru, upload semua file di folder ini sebagai commit awal.
2. Di Vercel, import repo tersebut, pilih framework "Other" / static, tanpa build command.
3. Deploy, lalu cek katalog, paket, pencarian template, dan tombol WhatsApp.
4. Setelah itu, lanjutkan fase editor/login/admin sebagai pengembangan terpisah.
