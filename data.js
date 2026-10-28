// Sumber data tunggal situs publik AURELIA.
// Data ini sama dengan data sebelumnya dan seed Supabase: 40 template, 12 unggulan,
// paket Starter Rp49.000 / Signature Rp99.000 / Royal Rp179.000 / Custom, 9 add-on, kupon AURELIA10.
// JUJUR SOAL ASET: tidak ada screenshot/gambar desain asli template di proyek situs publik ini.
// thumbnail di sini adalah pratinjau gaya berbasis kategori (CSS), BUKAN foto desain asli.
// description dibuat dari metadata nama + kategori yang benar-benar ada, bukan deskripsi asli template.
// startingPrice adalah harga paket termurah (Starter), bukan harga per template, karena template tidak punya harga sendiri.
// availableFeatures adalah fitur situs yang benar-benar berjalan untuk semua template.
const ADMIN_WHATSAPP_NUMBER = "6281290603522";
const CONTACT = { admin: "Ardi", whatsapp: "6281290603522", email: "sumardialdiansyah@gmail.com", instagram: "@kafee.in", hours: "08.00–22.00 WIB", bank: "BCA", account: "6881131649", accountName: "Sumardi" };
const PACKAGES = [
  { id: "starter", slug: "starter", name: "Starter", price: 49000 },
  { id: "signature", slug: "signature", name: "Signature", price: 99000 },
  { id: "royal", slug: "royal", name: "Royal", price: 179000 },
  { id: "custom", slug: "custom", name: "Custom", price: 0 }
];
const ADDONS = [
  { id: "custom-domain", slug: "custom-domain", name: "Custom Domain", price: 75000, description: "Domain khusus untuk tautan undangan, bukan subdomain bawaan." },
  { id: "extra-gallery", slug: "extra-gallery", name: "Tambahan Galeri", price: 25000, description: "Kapasitas galeri foto tambahan di dalam undangan." },
  { id: "premium-animation", slug: "premium-animation", name: "Animasi Premium", price: 35000, description: "Pilihan animasi pembuka dan elemen yang lebih kaya." },
  { id: "custom-design", slug: "custom-design", name: "Desain Khusus", price: 150000, description: "Penyesuaian desain di luar template standar, sesuai permintaan yang disepakati dengan admin." },
  { id: "data-entry-help", slug: "data-entry-help", name: "Bantuan Pengisian Data", price: 30000, description: "Bantuan admin mengisi data undangan dari data yang kamu kirim." },
  { id: "content-adjust", slug: "content-adjust", name: "Penyesuaian Konten", price: 20000, description: "Perubahan teks atau konten undangan setelah template dipilih." },
  { id: "rsvp-report", slug: "rsvp-report", name: "RSVP & Laporan Tamu", price: 29000, description: "Rekap konfirmasi kehadiran tamu." },
  { id: "guest-export", slug: "guest-export", name: "Ekspor Daftar Tamu", price: 15000, description: "Daftar tamu dalam format yang bisa digunakan admin." },
  { id: "extend-active", slug: "extend-active", name: "Perpanjangan Masa Aktif", price: 19000, description: "Memperpanjang masa aktif undangan yang sudah berjalan." }
];
const COUPON = { code: "AURELIA10", percent: 10, active: true };
const RAW_TEMPLATES = [
["Modern Minimalist","Pernikahan",true],["Luxury Gold","Pernikahan",true],["Classic Elegant","Pernikahan",true],["Islamic Elegant","Pernikahan",true],["Floral Garden","Pernikahan",true],["Botanical Green","Pernikahan",true],["Rustic Earth","Pernikahan",false],["Vintage Romance","Pernikahan",false],["Korean Minimal","Pernikahan",true],["Japanese Minimal","Pernikahan",true],["Editorial Magazine","Pernikahan",true],["Black Tie","Pernikahan",true],["Royal Palace","Pernikahan",false],["Traditional Indonesian","Pernikahan",false],["Sundanese Wedding","Pernikahan",false],["Javanese Wedding","Pernikahan",false],["Tropical Destination","Pernikahan",false],["Beach Wedding","Pernikahan",false],["Celestial Night","Pernikahan",true],["Dark Romance","Pernikahan",false],["Watercolor Floral","Pernikahan",false],["Soft Pastel","Pernikahan",false],["Contemporary Cultural","Pernikahan",false],["Cinematic Wedding","Pernikahan",true],["Engagement Luxe","Engagement",false],["Lamaran Adat","Lamaran",false],["Khitanan Ceria","Khitanan",false],["Aqiqah Lembut","Aqiqah",false],["Ulang Tahun Anak","Ulang tahun anak",false],["Ulang Tahun Dewasa","Ulang tahun dewasa",false],["Graduation Day","Graduation",false],["Anniversary Emas","Anniversary",false],["Baby Shower","Baby shower",false],["Gender Reveal","Gender reveal",false],["Corporate Event","Corporate event",false],["Seminar & Webinar","Seminar dan webinar",false],["Grand Opening","Grand opening",false],["Reuni Nostalgia","Reuni",false],["Acara Komunitas","Acara komunitas",false],["Acara Keluarga","Undangan acara keluarga",false]
];
function slugify(name){ return name.toLowerCase().replace(/[^a-z0-9 ]/g,"").trim().replace(/\s+/g,"-"); }
function catSlug(cat){ return cat.toLowerCase().replace(/[^a-z0-9 ]/g,"").trim().replace(/\s+/g,"-"); }
function describe(name, category){
  const n = name.toLowerCase();
  let style = "dengan karakter yang bersih dan mudah dibaca";
  if (n.includes("gold") || n.includes("luxury") || n.includes("royal") || n.includes("black tie")) style = "dengan nuansa mewah dan formal";
  else if (n.includes("floral") || n.includes("botanical") || n.includes("garden")) style = "dengan nuansa alam dan bunga yang lembut";
  else if (n.includes("minimal")) style = "dengan gaya minimal yang bersih dan modern";
  else if (n.includes("vintage") || n.includes("classic") || n.includes("romance")) style = "dengan nuansa klasik dan romantis";
  else if (n.includes("rustic") || n.includes("tropical") || n.includes("beach")) style = "dengan nuansa hangat dan natural";
  else if (n.includes("celestial") || n.includes("dark") || n.includes("cinematic")) style = "dengan nuansa dramatis dan elegan";
  return "Template " + category.toLowerCase() + " " + style + ". Pratinjau di situs ini adalah pratinjau gaya berbasis kategori, bukan foto desain asli template.";
}
const TEMPLATES = RAW_TEMPLATES.map((t, i) => {
  const s = slugify(t[0]);
  return {
    id: "tpl-" + (i + 1),
    slug: s,
    name: t[0],
    category: t[1],
    categorySlug: catSlug(t[1]),
    featured: t[2],
    description: describe(t[0], t[1]),
    thumbnail: "style:" + catSlug(t[1]),
    thumbnailKind: "style-placeholder",
    demoUrl: "/demo/" + s,
    detailUrl: "/collections/" + s,
    startingPrice: 49000,
    startingPriceNote: "Mulai dari harga paket Starter; template tidak punya harga sendiri.",
    availableFeatures: ["Pratinjau demo", "Pemesanan via WhatsApp", "Pilihan paket dan add-on"]
  };
});
function fmt(n){ return n === 0 ? "Rp0" : "Rp" + n.toLocaleString("id-ID"); }
function fmtPrice(n){ return n === 0 ? "Sesuai kebutuhan" : fmt(n); }
function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
function slugFromUrl(){
  const q = new URLSearchParams(location.search).get("slug") || new URLSearchParams(location.search).get("template");
  if (q) return q;
  const parts = location.pathname.split("/").filter(Boolean);
  if (parts.length >= 2 && (parts[0] === "collections" || parts[0] === "demo")) return parts[1];
  return "";
}
function getTemplate(slugVal){ return TEMPLATES.find(t => t.slug === slugVal); }
window.AURELIA = { ADMIN_WHATSAPP_NUMBER, CONTACT, PACKAGES, ADDONS, COUPON, TEMPLATES, fmt, fmtPrice, esc, slugify, getTemplate, slugFromUrl };
