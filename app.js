// Data situs publik AURELIA — dipertahankan dari versi sebelumnya dan dari seed Supabase.
// URL, nomor WhatsApp, harga, dan data template tidak diubah oleh redesign ini.
const ADMIN_WHATSAPP_NUMBER = "6281290603522";
const CONTACT_EMAIL = "sumardialdiansyah@gmail.com";
const templates = [
["Modern Minimalist","Pernikahan",true],["Luxury Gold","Pernikahan",true],["Classic Elegant","Pernikahan",true],["Islamic Elegant","Pernikahan",true],["Floral Garden","Pernikahan",true],["Botanical Green","Pernikahan",true],["Rustic Earth","Pernikahan",false],["Vintage Romance","Pernikahan",false],["Korean Minimal","Pernikahan",true],["Japanese Minimal","Pernikahan",true],["Editorial Magazine","Pernikahan",true],["Black Tie","Pernikahan",true],["Royal Palace","Pernikahan",false],["Traditional Indonesian","Pernikahan",false],["Sundanese Wedding","Pernikahan",false],["Javanese Wedding","Pernikahan",false],["Tropical Destination","Pernikahan",false],["Beach Wedding","Pernikahan",false],["Celestial Night","Pernikahan",true],["Dark Romance","Pernikahan",false],["Watercolor Floral","Pernikahan",false],["Soft Pastel","Pernikahan",false],["Contemporary Cultural","Pernikahan",false],["Cinematic Wedding","Pernikahan",true],["Engagement Luxe","Engagement",false],["Lamaran Adat","Lamaran",false],["Khitanan Ceria","Khitanan",false],["Aqiqah Lembut","Aqiqah",false],["Ulang Tahun Anak","Ulang tahun anak",false],["Ulang Tahun Dewasa","Ulang tahun dewasa",false],["Graduation Day","Graduation",false],["Anniversary Emas","Anniversary",false],["Baby Shower","Baby shower",false],["Gender Reveal","Gender reveal",false],["Corporate Event","Corporate event",false],["Seminar & Webinar","Seminar dan webinar",false],["Grand Opening","Grand opening",false],["Reuni Nostalgia","Reuni",false],["Acara Komunitas","Acara komunitas",false],["Acara Keluarga","Undangan acara keluarga",false]
];
const packages = [
["Starter",49000],["Signature",99000],["Royal",179000],["Custom",0]
];
const addons = [
["Custom Domain",75000,"Domain khusus untuk tautan undangan, bukan subdomain bawaan."],
["Tambahan Galeri",25000,"Kapasitas galeri foto tambahan di dalam undangan."],
["Animasi Premium",35000,"Pilihan animasi pembuka dan elemen yang lebih kaya."],
["Desain Khusus",150000,"Penyesuaian desain di luar template standar, sesuai permintaan yang disepakati dengan admin."],
["Bantuan Pengisian Data",30000,"Bantuan admin mengisi data undangan dari data yang kamu kirim."],
["Penyesuaian Konten",20000,"Perubahan teks atau konten undangan setelah template dipilih."],
["RSVP & Laporan Tamu",29000,"Rekap konfirmasi kehadiran tamu."],
["Ekspor Daftar Tamu",15000,"Daftar tamu dalam format yang bisa digunakan admin."],
["Perpanjangan Masa Aktif",19000,"Memperpanjang masa aktif undangan yang sudah berjalan."]
];
const fmt = n => n === 0 ? "Sesuai kebutuhan" : "Rp" + n.toLocaleString("id-ID");
const slug = name => name.toLowerCase().replace(/[^a-z0-9 ]/g,"").trim().replace(/\s+/g,"-");
const templateBySlug = s => templates.find(t => slug(t[0]) === s);
const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
window.AURELIA_DATA = { templates, packages, addons, slug, fmt, ADMIN_WHATSAPP_NUMBER };

// Hero + kontak WhatsApp
const waLink = document.getElementById("hero-wa");
if (waLink) waLink.href = "https://wa.me/" + ADMIN_WHATSAPP_NUMBER + "?text=" + encodeURIComponent("Halo AURELIA INVITATION STUDIO, saya ingin konsultasi tentang undangan digital.");
const contactWa = document.getElementById("contact-wa");
if (contactWa) contactWa.href = "https://wa.me/" + ADMIN_WHATSAPP_NUMBER;

// Kategori filter
const catSel = document.getElementById("category-filter");
if (catSel) {
  const cats = ["Semua kategori", ...new Set(templates.map(t => t[1]))];
  catSel.innerHTML = cats.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join("");
}
function renderTemplates() {
  const grid = document.getElementById("templates");
  if (!grid) return;
  const q = (document.getElementById("search")?.value || "").toLowerCase();
  const cat = document.getElementById("category-filter")?.value || "Semua kategori";
  const featuredOnly = document.getElementById("featured-only")?.checked;
  const list = templates.filter(t => {
    const code = slug(t[0]);
    return (!q || t[0].toLowerCase().includes(q) || code.includes(q) || t[1].toLowerCase().includes(q))
      && (cat === "Semua kategori" || t[1] === cat)
      && (!featuredOnly || t[2]);
  });
  const count = document.getElementById("result-count");
  if (count) count.textContent = `Menampilkan ${list.length} dari ${templates.length} template.`;
  grid.innerHTML = list.map(t => {
    const code = slug(t[0]);
    return `<article class="card"><div class="template-thumb" aria-hidden="true"><span class="tag">${esc(t[1])}</span><strong>${esc(t[0])}</strong><span>Pratinjau gaya</span></div><div class="tag">${t[2] ? "Unggulan • " : ""}${esc(t[1])}</div><h3>${esc(t[0])}</h3><p class="code">Kode: ${code}</p><div class="card-actions"><a class="btn secondary" href="demo.html?template=${code}">Lihat Demo</a><button class="btn" type="button" data-demo="${code}">Pratinjau Cepat</button><button class="btn secondary" type="button" data-select="${code}">Pilih Template Ini</button></div></article>`;
  }).join("") || "<p>Tidak ada template yang cocok dengan pencarian atau filter.</p>";
  grid.querySelectorAll("[data-demo]").forEach(b => b.addEventListener("click", () => openDemo(b.dataset.demo)));
  grid.querySelectorAll("[data-select]").forEach(b => b.addEventListener("click", () => selectTemplate(b.dataset.select)));
}
["search","category-filter"].forEach(id => document.getElementById(id)?.addEventListener("input", renderTemplates));
document.getElementById("featured-only")?.addEventListener("change", renderTemplates);
renderTemplates();

// Paket + add-on
const pkgGrid = document.getElementById("packages");
if (pkgGrid) pkgGrid.innerHTML = packages.map(p => `<article class="card"><h3>${esc(p[0])}</h3><div class="price">${fmt(p[1])}</div><p>Detail fitur, batas revisi, dan masa aktif: dikonfigurasi admin.</p><div class="card-actions"><button class="btn" type="button" data-package="${esc(p[0])}">Pilih Paket Ini</button></div></article>`).join("");
pkgGrid?.querySelectorAll("[data-package]").forEach(b => b.addEventListener("click", () => {
  const sel = document.getElementById("order-package"); if (sel) sel.value = b.dataset.package;
  updateSummary(); document.getElementById("pesan")?.scrollIntoView({behavior:"smooth"});
}));
const addonGrid = document.getElementById("addons");
if (addonGrid) addonGrid.innerHTML = addons.map(a => `<article class="card"><h3>${esc(a[0])}</h3><div class="price">${fmt(a[1])}</div><p>${esc(a[2])}</p></article>`).join("");

// Form pemesanan
const tplSel = document.getElementById("order-template");
if (tplSel) tplSel.innerHTML = `<option value="">Pilih template…</option>` + templates.map(t => `<option value="${slug(t[0])}">${esc(t[0])} — ${slug(t[0])}</option>`).join("");
const pkgSel = document.getElementById("order-package");
if (pkgSel) pkgSel.innerHTML = `<option value="">Pilih paket…</option>` + packages.map(p => `<option value="${esc(p[0])}">${esc(p[0])} — ${fmt(p[1])}</option>`).join("");
const addonChecks = document.getElementById("order-addons");
if (addonChecks) addonChecks.innerHTML = addons.map(a => `<label><input type="checkbox" value="${esc(a[0])}" data-price="${a[1]}"> <span><strong>${esc(a[0])}</strong> — ${fmt(a[1])}<br><span class="small">${esc(a[2])}</span></span></label>`).join("");
function calc() {
  const pkgName = pkgSel?.value || "";
  const pkg = packages.find(p => p[0] === pkgName);
  const pkgPrice = pkg ? pkg[1] : 0;
  const chosenAddons = [...document.querySelectorAll("#order-addons input:checked")].map(i => ({name:i.value, price:Number(i.dataset.price)}));
  const addonTotal = chosenAddons.reduce((s,a) => s + a.price, 0);
  const subtotal = pkgPrice + addonTotal;
  const coupon = (document.getElementById("order-coupon")?.value || "").trim().toUpperCase();
  const discount = coupon === "AURELIA10" ? Math.round(pkgPrice * 0.10) : 0;
  const total = subtotal - discount;
  return { pkgName, pkgPrice, chosenAddons, addonTotal, subtotal, coupon, discount, total };
}
function updateSummary() {
  const s = calc();
  const dl = document.getElementById("order-summary"); if (!dl) return;
  const tpl = tplSel?.value ? templateBySlug(tplSel.value) : null;
  dl.innerHTML = `<dt>Template</dt><dd>${tpl ? esc(tpl[0]) + " (" + tplSel.value + ")" : "—"}</dd><dt>Paket</dt><dd>${s.pkgName ? esc(s.pkgName) + " — " + fmt(s.pkgPrice) : "—"}</dd><dt>Add-on</dt><dd>${s.chosenAddons.length ? s.chosenAddons.map(a => esc(a.name)).join(", ") : "—"}</dd><dt>Subtotal</dt><dd>${fmt(s.subtotal)}</dd><dt>Diskon kupon</dt><dd>${s.discount ? "− " + fmt(s.discount) : "Rp0"}</dd>`;
  document.getElementById("order-total").textContent = "Total akhir: " + fmt(s.total) + (s.pkgName === "Custom" ? " + harga paket Custom (dikonfirmasi admin)" : "");
  document.getElementById("custom-note").hidden = s.pkgName !== "Custom";
}
["order-template","order-package","order-coupon"].forEach(id => document.getElementById(id)?.addEventListener("input", updateSummary));
document.getElementById("order-addons")?.addEventListener("change", updateSummary);
updateSummary();
function selectTemplate(code) {
  if (tplSel) tplSel.value = code;
  updateSummary(); document.getElementById("pesan")?.scrollIntoView({behavior:"smooth"});
  document.getElementById("order-name")?.focus();
}
// Preselect dari demo.html
const params = new URLSearchParams(location.search);
if (params.get("template") && tplSel && templateBySlug(params.get("template"))) { tplSel.value = params.get("template"); updateSummary(); }
document.getElementById("order-form")?.addEventListener("submit", e => {
  e.preventDefault();
  const err = document.getElementById("form-error");
  const name = document.getElementById("order-name").value.trim();
  const contact = document.getElementById("order-contact").value.trim();
  const s = calc();
  let msg = "";
  if (!name) msg = "Isi nama pelanggan dulu.";
  else if (!contact) msg = "Isi kontak (WhatsApp / email) dulu.";
  else if (!tplSel.value) msg = "Pilih template dulu.";
  else if (!s.pkgName) msg = "Pilih paket dulu.";
  if (msg) { err.textContent = msg; err.hidden = false; return; }
  err.hidden = true;
  const tpl = templateBySlug(tplSel.value);
  const note = document.getElementById("order-note").value.trim();
  const lines = [
    "Halo AURELIA INVITATION STUDIO, saya ingin memesan undangan digital.",
    "Nama: " + name,
    "Kontak: " + contact,
    "Template: " + tpl[0] + " (" + tplSel.value + ")",
    "Paket: " + s.pkgName + " — " + fmt(s.pkgPrice),
    "Add-on: " + (s.chosenAddons.length ? s.chosenAddons.map(a => a.name + " " + fmt(a.price)).join(", ") : "-"),
    "Kupon: " + (s.coupon || "-"),
    "Subtotal: " + fmt(s.subtotal),
    "Diskon: " + fmt(s.discount),
    "Total akhir: " + fmt(s.total) + (s.pkgName === "Custom" ? " + harga paket Custom (menunggu konfirmasi admin)" : ""),
    note ? "Catatan: " + note : "",
    "Catatan: Pesanan ini belum dibayar dan belum dikonfirmasi sampai admin memverifikasi transfer manual."
  ].filter(Boolean);
  window.open("https://wa.me/" + ADMIN_WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n")), "_blank");
});

// Demo modal
let currentDemo = "";
function openDemo(code) {
  const t = templateBySlug(code); if (!t) return;
  currentDemo = code;
  document.getElementById("demo-content").innerHTML = `<h3 id="demo-title">Demo: ${esc(t[0])}</h3><p class="code">Kode: ${code} • Kategori: ${esc(t[1])}${t[2] ? " • Unggulan" : ""}</p><div class="demo-phone" aria-label="Pratinjau mobile"><p class="mock-eyebrow">Pratinjau Mobile</p><p class="mock-names">${esc(t[0])}</p><p>Contoh tampilan undangan untuk kategori ${esc(t[1])}. Nama pasangan, tanggal, dan isi acara diisi sesuai pesananmu, bukan data pelanggan asli.</p><span class="mock-btn">Buka Undangan</span></div><p><a href="demo.html?template=${code}">Buka halaman demo penuh</a></p>`;
  const m = document.getElementById("demo-modal"); m.hidden = false; document.getElementById("demo-close").focus();
}
function closeDemo() { document.getElementById("demo-modal").hidden = true; }
document.getElementById("demo-close")?.addEventListener("click", closeDemo);
document.getElementById("demo-modal")?.addEventListener("click", e => { if (e.target.id === "demo-modal") closeDemo(); });
document.getElementById("demo-select")?.addEventListener("click", () => { closeDemo(); selectTemplate(currentDemo); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeDemo(); });
