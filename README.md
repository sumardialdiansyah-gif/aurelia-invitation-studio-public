# AURELIA INVITATION STUDIO — Situs Publik Multi-Page

Situs statis multi-page, tanpa framework, tanpa package manager, tanpa build command.
Satu sumber data: data.js (40 template, paket, add-on, kupon, kontak).
Logika bersama: site.js. Galeri: gallery.js. Pemesanan: order.js.

## Route
- / — Homepage (index.html)
- /collections — Galeri semua template (collections.html)
- /collections/:slug — Detail template (collection.html, slug dibaca dari path atau ?slug=)
- /demo/:slug — Demo interaktif per template (demo.html, slug dibaca dari path atau ?slug=)
- /pricing — Paket harga (pricing.html)
- /addons — Add-on (addons.html)
- /order — Form pemesanan multistep (order.html)
- /faq — FAQ (faq.html)
- /contact — Kontak (contact.html)
- /privacy — Kebijakan privasi (privacy.html)
- /terms — Syarat dan ketentuan (terms.html)
- /revision — Kebijakan revisi dan pengembalian dana (revision.html)
- Routing Vercel: vercel.json rewrites + cleanUrls, agar direct URL dan refresh tetap bekerja.

## Jumlah template yang memiliki thumbnail valid dan demo aktif — JUJUR
- Thumbnail valid berupa screenshot/gambar desain asli: 0 dari 40. File gambar asli belum tersedia di proyek situs publik ini.
- Thumbnail pratinjau gaya berbasis kategori (CSS, konsisten, berbeda per kategori): 40 dari 40.
- Demo aktif: 40 dari 40, memakai renderer berbasis kategori dan metadata yang benar-benar ada (cover, detail contoh, lokasi contoh, hitung mundur ke tanggal contoh, RSVP demo lokal). Demo ini BUKAN replika final desain asli, dan ditandai DEMO di halaman.
- Fitur yang masih simulasi: RSVP di demo (hanya tampil di perangkat, tidak tersimpan, tidak dikirim), pratinjau gaya, dan hitung mundur ke tanggal contoh.
- Tidak ditambahkan: musik demo dan galeri foto asli, karena belum didukung/diuji.

## File yang diubah pada multi-page ini
- Baru: data.js, site.js, gallery.js, order.js, collections.html, collection.html, pricing.html, addons.html, order.html, faq.html, contact.html, privacy.html, terms.html, revision.html
- Diubah total: index.html (homepage saja), demo.html (demo interaktif per template), styles.css (animasi envelope/floating/petal/ribbon/selected/page fade, reduced motion), vercel.json (rewrites), sitemap.xml, README.md
- Dihapus: app.js lama (digantikan data.js/site.js/gallery.js/order.js)
- Dipertahankan: robots.txt, data harga, kupon, nomor WhatsApp, kontak, dan seluruh 40 template.

## Fitur yang berhasil diuji (lokal, 2026-10-28)
- Sintaks: node --check data.js, site.js, gallery.js, order.js lolos.
- Data: 40 template, 12 unggulan, 4 paket, 9 add-on.
- Hitungan: Signature Rp99.000 + Custom Domain Rp75.000 − diskon Rp9.900 = Rp164.100; total tidak negatif.
- Server lokal: semua 12 halaman + robots + sitemap + 4 file JS + CSS mengembalikan 200.
- Logika slug dari path /collections/:slug dan /demo/:slug sudah ditulis di data.js (slugFromUrl), tetapi rewrite Vercel-nya sendiri baru bisa diverifikasi setelah deploy (lihat pengujian manual di bawah).

## Error yang ditemukan
- Tidak ada error sintaks atau error server lokal.
- Audit awal: proyek sebelumnya satu halaman (index + demo), data hardcoded di app.js, tidak ada thumbnail asli, tidak ada router, tidak ada API/auth, Supabase tidak terhubung live ke situs publik. Semua itu dicatat di sini, bukan disembunyikan.
- Perbaikan route slug 2026-10-28: /collections dan rute tanpa slug bekerja, tetapi /collections/:slug dan /demo/:slug sempat 404 di live. Penyebabnya: vercel.json memakai cleanUrls:true bersama destination rewrite berekstensi .html (/demo.html, /collection.html), yang tidak berlaku seperti yang diharapkan di bawah cleanUrls. Perbaikannya: rewrite slug saja, dengan destination tanpa ekstensi (/demo, /collection) agar cleanUrls memetakannya ke demo.html/collection.html, dan semua aset halaman diubah ke path absolut (/styles.css, /data.js, dll) agar tidak rusak saat dibuka dari path bertingkat /demo/:slug. Rewrite Vercel hasil perbaikan ini baru bisa diverifikasi setelah deploy berikutnya.

## Data yang masih membutuhkan aset atau konfigurasi pemilik
- Gambar/screenshot desain asli tiap template, jika ingin thumbnail benar-benar sesuai desain.
- Deskripsi dan fitur detail asli tiap template (saat ini deskripsi dibuat dari nama + kategori).
- Metadata gaya/warna tiap template, jika ingin filter gaya/warna.
- Detail fitur paket, batas revisi, masa aktif, waktu pengerjaan, dan kebijakan revisi/pengembalian dana tertulis.
- Gambar galeri asli dan data acara asli (demo memakai contoh yang ditandai DEMO).
- ID analytics (saat ini tidak aktif).
- Sinkronisasi tabel settings Supabase dan pengujian ulang RLS contoh dasar.

## Hasil production build
- Tidak ada build command (situs statis). "Build" di sini adalah pemeriksaan sintaks dan server lokal di atas, yang lolos. Production build framework tidak berlaku untuk proyek ini.

## Langkah deployment Vercel
1. Commit dan push semua file baru/ubah dan hapus app.js lama ke repo GitHub aurelia-invitation-studio-public, branch main.
2. Vercel (proyek aurelia-invitation-studio-public, tim trial, Hobby) otomatis deploy dari repo itu — framework Other/static, tanpa build command, tanpa environment variable rahasia.
3. Tunggu Ready, lalu buka https://aurelia-invitation-studio-public.vercel.app dan uji route langsung di bawah.

## Pengujian manual yang masih harus dilakukan (BELUM DIUJI di live)
- Buka langsung /collections, /collections/botanical-green, /demo/botanical-green, /pricing, /addons, /order, /faq, /contact, /privacy, /terms, /revision, lalu refresh tiap halaman dan pakai tombol back browser.
- Alur penuh: koleksi → detail → demo → pilih → order (template terisi) → ganti paket → tambah/hapus add-on → kupon → total → pesan WhatsApp, pastikan pesan sama dengan ringkasan.
- HP 320–430px, tablet, desktop: tanpa overflow, tombol mudah disentuh, modal/demo bisa ditutup, reduced motion dihormati.
