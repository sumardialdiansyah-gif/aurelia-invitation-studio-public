// Data situs publik AURELIA — dipertahankan dari versi sebelumnya dan dari seed Supabase.
// URL, nomor WhatsApp, harga, dan data template tidak diubah oleh redesign ini.
// Tidak ada secret key di file ini. Analytics belum terhubung (lihat AURELIA_ANALYTICS_ID di bawah).
const ADMIN_WHATSAPP_NUMBER = "6281290603522";
const AURELIA_ANALYTICS_ID = ""; // Kosong = analytics tidak aktif. Isi dengan ID provider analytics jika pemilik mengaktifkannya nanti; fungsi track() tidak mengirim nama, nomor telepon, atau detail acara.
function track(eventName, safeData) {
  if (!AURELIA_ANALYTICS_ID) return;
  // Tempat integrasi analytics yang dapat dikonfigurasi. Sengaja tidak mengirim data pribadi.
  if (typeof console !== "undefined") console.log("[analytics]", eventName, safeData || {});
}
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
const fmt = n => n === 0 ? "Rp0" : "Rp" + n.toLocaleString("id-ID");
const fmtPrice = n => n === 0 ? "Sesuai kebutuhan" : fmt(n);
const slug = name => name.toLowerCase().replace(/[^a-z0-9 ]/g,"").trim().replace(/\s+/g,"-");
const templateBySlug = s => templates.find(t => slug(t[0]) === s);
const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
window.AURELIA_DATA = { templates, packages, addons, slug, fmt, ADMIN_WHATSAPP_NUMBER };
const $ = id => document.getElementById(id);

// Header / kontak
const waConsult = "https://wa.me/" + ADMIN_WHATSAPP_NUMBER + "?text=" + encodeURIComponent("Halo AURELIA INVITATION STUDIO, saya ingin konsultasi tentang undangan digital.");
["hero-wa","nav-wa"].forEach(id => { const el = $(id); if (el) el.href = waConsult; });
const contactWa = $("contact-wa"); if (contactWa) contactWa.href = "https://wa.me/" + ADMIN_WHATSAPP_NUMBER;
const yearEl = $("copyright-year"); if (yearEl) yearEl.textContent = new Date().getFullYear();
const menuBtn = $("menu-btn"), mainNav = $("main-nav");
menuBtn?.addEventListener("click", () => { const open = mainNav.classList.toggle("open"); menuBtn.setAttribute("aria-expanded", String(open)); });

// State pemesanan (tersimpan di perangkat, bukan di database)
const STORAGE_KEY = "aurelia_order_v2";
let order = { template:"", package:"", addons:[], name:"", phone:"", couple:"", date:"", time:"", location:"", map:"", detail:"", note:"", coupon:"", couponApplied:"" };
try {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  if (saved && typeof saved === "object") order = { ...order, ...saved, addons: Array.isArray(saved.addons) ? saved.addons : [] };
} catch (e) {}
function saveOrder() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(order)); } catch (e) {} }
function calc() {
  const pkg = packages.find(p => p[0] === order.package);
  const pkgPrice = pkg ? pkg[1] : 0;
  const chosenAddons = addons.filter(a => order.addons.includes(a[0]));
  const addonTotal = chosenAddons.reduce((s,a) => s + a[1], 0);
  const subtotal = pkgPrice + addonTotal;
  const discount = order.couponApplied === "AURELIA10" ? Math.round(pkgPrice * 0.10) : 0;
  const total = Math.max(0, subtotal - discount);
  return { pkgPrice, chosenAddons, addonTotal, subtotal, discount, total };
}
function buildMessage() {
  const c = calc();
  const tpl = templateBySlug(order.template);
  const lines = [
    "Halo Aurelia Invitation Studio, saya ingin memesan undangan digital.",
    "",
    "DATA PEMESAN",
    "Nama: " + order.name,
    "Nomor WhatsApp: " + order.phone,
    "",
    "DETAIL UNDANGAN",
    "Template: " + (tpl ? tpl[0] : "-"),
    "Kode template: " + (order.template || "-"),
    "Paket: " + (order.package ? order.package + " — " + fmtPrice(c.pkgPrice) : "-"),
    "Add-on: " + (c.chosenAddons.length ? c.chosenAddons.map(a => a[0] + " " + fmt(a[1])).join(", ") : "-"),
    "",
    "DATA ACARA",
    "Nama pasangan: " + (order.couple || "-"),
    "Tanggal acara: " + (order.date || "-"),
    "Waktu: " + (order.time || "-"),
    "Lokasi: " + (order.location || "-"),
    order.map ? "Alamat / tautan peta: " + order.map : "",
    order.detail ? "Detail acara: " + order.detail : "",
    "",
    "RINCIAN BIAYA",
    "Subtotal: " + fmt(c.subtotal),
    "Diskon: " + fmt(c.discount) + (order.couponApplied ? " (kupon " + order.couponApplied + ")" : ""),
    "Total: " + fmt(c.total) + (order.package === "Custom" ? " + harga paket Custom (menunggu konfirmasi admin)" : ""),
    "",
    "Catatan tambahan: " + (order.note || "-"),
    "",
    "Mohon informasi mengenai proses pemesanan dan pembayaran selanjutnya. Terima kasih."
  ].filter(x => x !== "");
  return lines.join("\n");
}
function renderSummary() {
  const c = calc();
  const tpl = templateBySlug(order.template);
  const rows = `<dt>Template</dt><dd>${tpl ? esc(tpl[0]) + " (" + esc(order.template) + ")" : "—"}</dd><dt>Paket</dt><dd>${order.package ? esc(order.package) + " — " + fmtPrice(c.pkgPrice) : "—"}</dd><dt>Add-on</dt><dd>${c.chosenAddons.length ? c.chosenAddons.map(a => esc(a[0])).join(", ") : "—"}</dd><dt>Nama pemesan</dt><dd>${order.name ? esc(order.name) : "—"}</dd><dt>Nomor WhatsApp</dt><dd>${order.phone ? esc(order.phone) : "—"}</dd><dt>Nama pasangan</dt><dd>${order.couple ? esc(order.couple) : "—"}</dd><dt>Tanggal / waktu acara</dt><dd>${order.date || order.time ? esc((order.date || "-") + " " + (order.time || "")) : "—"}</dd><dt>Lokasi</dt><dd>${order.location ? esc(order.location) : "—"}</dd><dt>Subtotal</dt><dd>${fmt(c.subtotal)}</dd><dt>Diskon kupon</dt><dd>${c.discount ? "− " + fmt(c.discount) : "Rp0"}</dd>`;
  const s1 = $("order-summary"); if (s1) s1.innerHTML = rows;
  const s2 = $("final-summary"); if (s2) s2.innerHTML = rows;
  const t1 = $("order-total"); if (t1) t1.textContent = "Total akhir: " + fmt(c.total) + (order.package === "Custom" ? " + harga paket Custom (dikonfirmasi admin)" : "");
  const t2 = $("final-total"); if (t2) t2.textContent = "Total akhir: " + fmt(c.total) + (order.package === "Custom" ? " + harga paket Custom (dikonfirmasi admin)" : "");
  const cn = $("custom-note"); if (cn) cn.hidden = order.package !== "Custom";
}

// Katalog
const catSel = $("category-filter");
if (catSel) catSel.innerHTML = `<option value="Semua tema">Semua tema</option>` + [...new Set(templates.map(t => t[1]))].map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join("");
function cardHtml(t) {
  const code = slug(t[0]);
  const selected = order.template === code;
  return `<article class="card${selected ? " selected" : ""}"><div class="template-thumb" aria-hidden="true"><span class="tag">${esc(t[1])}</span><strong>${esc(t[0])}</strong><span>Pratinjau gaya</span></div><div class="tag">${t[2] ? "Unggulan • " : ""}${esc(t[1])}</div><h3>${esc(t[0])}</h3><p class="code">Kode: ${code}${selected ? " • Terpilih" : ""}</p><div class="card-actions"><a class="btn secondary" href="demo.html?template=${code}">Lihat Demo</a><button class="btn" type="button" data-demo="${code}">Pratinjau Cepat</button><button class="btn secondary" type="button" data-select="${code}">${selected ? "Terpilih ✓" : "Pilih Desain Ini"}</button></div></article>`;
}
function bindCards(container) {
  container.querySelectorAll("[data-demo]").forEach(b => b.addEventListener("click", () => { track("view_demo", { template: b.dataset.demo }); openDemo(b.dataset.demo); }));
  container.querySelectorAll("[data-select]").forEach(b => b.addEventListener("click", () => selectTemplate(b.dataset.select, true)));
}
function renderTemplates() {
  const grid = $("templates"); if (!grid) return;
  const q = ($("search")?.value || "").toLowerCase();
  const cat = catSel?.value || "Semua tema";
  const featuredOnly = $("featured-only")?.checked;
  const sort = $("sort-filter")?.value || "featured";
  let list = templates.filter(t => {
    const code = slug(t[0]);
    return (!q || t[0].toLowerCase().includes(q) || code.includes(q) || t[1].toLowerCase().includes(q))
      && (cat === "Semua tema" || t[1] === cat)
      && (!featuredOnly || t[2]);
  });
  if (sort === "name") list = [...list].sort((a,b) => a[0].localeCompare(b[0]));
  else if (sort === "category") list = [...list].sort((a,b) => a[1].localeCompare(b[1]) || a[0].localeCompare(b[0]));
  else list = [...list].sort((a,b) => (b[2] - a[2]) || a[0].localeCompare(b[0]));
  const count = $("result-count"); if (count) count.textContent = `Menampilkan ${list.length} dari ${templates.length} template.`;
  grid.innerHTML = list.length ? list.map(cardHtml).join("") : `<p><strong>Tidak ada template yang cocok.</strong><br>Coba hapus kata kunci, ubah tema, atau tekan Reset Filter.</p>`;
  bindCards(grid);
  const banner = $("selected-banner");
  if (banner) {
    const tpl = templateBySlug(order.template);
    if (tpl) { banner.hidden = false; banner.innerHTML = `Template terpilih: <strong>${esc(tpl[0])}</strong> (${esc(order.template)}). <a href="#pesan">Lanjut ke form pemesanan</a>.`; }
    else banner.hidden = true;
  }
}
["search","category-filter","sort-filter"].forEach(id => $(id)?.addEventListener("input", renderTemplates));
$("featured-only")?.addEventListener("change", renderTemplates);
$("reset-filters")?.addEventListener("click", () => {
  if ($("search")) $("search").value = ""; if (catSel) catSel.value = "Semua tema"; if ($("sort-filter")) $("sort-filter").value = "featured"; if ($("featured-only")) $("featured-only").checked = false; renderTemplates();
});
const featuredGrid = $("featured");
if (featuredGrid) { featuredGrid.innerHTML = templates.filter(t => t[2]).map(cardHtml).join(""); bindCards(featuredGrid); }
renderTemplates();

// Paket + add-on
const pkgGrid = $("packages");
if (pkgGrid) pkgGrid.innerHTML = packages.map(p => `<article class="card"><h3>${esc(p[0])}</h3><div class="price">${fmtPrice(p[1])}</div><p>Detail fitur, batas revisi, masa aktif, dan waktu pengerjaan: dikonfigurasi admin.</p><div class="card-actions"><button class="btn" type="button" data-package="${esc(p[0])}">Pilih Paket Ini</button></div></article>`).join("");
function bindPackageButtons(container) {
  container.querySelectorAll("[data-package]").forEach(b => b.addEventListener("click", () => {
    order.package = b.dataset.package; syncForm(); saveOrder(); renderSummary(); track("select_package", { package: order.package });
    showStep(3); $("pesan")?.scrollIntoView({behavior:"smooth"});
  }));
}
bindPackageButtons(pkgGrid || document);
const pkgCards = $("package-cards");
if (pkgCards) { pkgCards.innerHTML = pkgGrid.innerHTML; bindPackageButtons(pkgCards); }
const addonGrid = $("addons");
if (addonGrid) addonGrid.innerHTML = addons.map(a => `<article class="card"><h3>${esc(a[0])}</h3><div class="price">${fmt(a[1])}</div><p>${esc(a[2])}</p></article>`).join("");

// Form multistep
const tplSel = $("order-template");
if (tplSel) tplSel.innerHTML = `<option value="">Pilih template…</option>` + templates.map(t => `<option value="${slug(t[0])}">${esc(t[0])} — ${slug(t[0])}</option>`).join("");
const pkgSel = $("order-package");
if (pkgSel) pkgSel.innerHTML = `<option value="">Pilih paket…</option>` + packages.map(p => `<option value="${esc(p[0])}">${esc(p[0])} — ${fmtPrice(p[1])}</option>`).join("");
const addonChecks = $("order-addons");
if (addonChecks) addonChecks.innerHTML = addons.map(a => `<label><input type="checkbox" value="${esc(a[0])}" data-price="${a[1]}"> <span><strong>${esc(a[0])}</strong> — ${fmt(a[1])}<br><span class="small">${esc(a[2])}</span></span></label>`).join("");
let currentStep = 1;
const STEP_TITLES = ["Pilih Desain","Pilih Paket","Pilih Add-on","Informasi Pemesan dan Acara","Tinjau Ringkasan","Lanjutkan ke WhatsApp"];
function showStep(n) {
  currentStep = Math.max(1, Math.min(6, n));
  document.querySelectorAll(".step").forEach(s => { s.hidden = Number(s.dataset.step) !== currentStep; });
  const ind = $("step-indicator"); if (ind) ind.textContent = `Langkah ${currentStep} dari 6 — ${STEP_TITLES[currentStep-1]}`;
  const prev = $("prev-btn"), next = $("next-btn");
  if (prev) prev.hidden = currentStep === 1;
  if (next) next.hidden = currentStep === 6;
  renderSummary();
}
function syncForm() {
  if (tplSel) tplSel.value = order.template;
  if (pkgSel) pkgSel.value = order.package;
  document.querySelectorAll("#order-addons input").forEach(i => { i.checked = order.addons.includes(i.value); });
  const set = (id, v) => { const el = $(id); if (el) el.value = v; };
  set("order-name", order.name); set("order-phone", order.phone); set("order-couple", order.couple); set("order-date", order.date); set("order-time", order.time); set("order-location", order.location); set("order-map", order.map); set("order-detail", order.detail); set("order-note", order.note); set("order-coupon", order.coupon);
  const cs = $("coupon-status");
  if (cs) cs.textContent = order.couponApplied ? `Kupon ${order.couponApplied} diterapkan: diskon 10% dari harga paket.` : (order.coupon ? "Kupon belum diterapkan. Tekan Terapkan Kupon." : "");
}
function readFormIntoOrder() {
  order.template = tplSel?.value || order.template;
  order.package = pkgSel?.value || order.package;
  order.addons = [...document.querySelectorAll("#order-addons input:checked")].map(i => i.value);
  const get = id => ($(id)?.value || "").trim();
  order.name = get("order-name"); order.phone = get("order-phone"); order.couple = get("order-couple"); order.date = get("order-date"); order.time = get("order-time"); order.location = get("order-location"); order.map = get("order-map"); order.detail = get("order-detail"); order.note = get("order-note"); order.coupon = get("order-coupon");
  saveOrder();
}
function validatePhone(v) {
  const digits = v.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15 && (digits.startsWith("0") || digits.startsWith("62"));
}
function validateStep(step) {
  readFormIntoOrder();
  const err = $("form-error"); err.hidden = true; err.textContent = "";
  $("err-name").textContent = ""; $("err-phone").textContent = ""; $("err-date").textContent = "";
  if (step === 1 && !order.template) { err.textContent = "Pilih template dulu."; err.hidden = false; return false; }
  if (step === 2 && !order.package) { err.textContent = "Pilih paket dulu."; err.hidden = false; return false; }
  if (step === 4) {
    let ok = true;
    if (!order.name) { $("err-name").textContent = "Nama pemesan wajib diisi."; ok = false; }
    if (!order.phone || !validatePhone(order.phone)) { $("err-phone").textContent = "Isi nomor WhatsApp yang valid, contoh 0812xxxx atau 62812xxxx."; ok = false; }
    if (order.date && isNaN(Date.parse(order.date))) { $("err-date").textContent = "Tanggal acara tidak valid."; ok = false; }
    if (!ok) { err.textContent = "Periksa kolom yang ditandai di atas."; err.hidden = false; return false; }
  }
  return true;
}
$("next-btn")?.addEventListener("click", () => { if (validateStep(currentStep)) { track("order_step", { step: currentStep + 1 }); showStep(currentStep + 1); } });
$("prev-btn")?.addEventListener("click", () => { readFormIntoOrder(); showStep(currentStep - 1); });
["order-template","order-package","order-coupon"].forEach(id => $(id)?.addEventListener("input", () => { readFormIntoOrder(); renderSummary(); }));
["order-name","order-phone","order-couple","order-date","order-time","order-location","order-map","order-detail","order-note"].forEach(id => $(id)?.addEventListener("input", () => { readFormIntoOrder(); renderSummary(); }));
$("order-addons")?.addEventListener("change", () => { readFormIntoOrder(); renderSummary(); });
$("apply-coupon")?.addEventListener("click", () => {
  readFormIntoOrder();
  const code = order.coupon.toUpperCase();
  const cs = $("coupon-status");
  if (code === "AURELIA10") { order.couponApplied = "AURELIA10"; cs.textContent = "Kupon AURELIA10 berhasil diterapkan: diskon 10% dari harga paket."; track("apply_coupon", { result: "success" }); }
  else { order.couponApplied = ""; cs.textContent = code ? "Kupon tidak dikenali. Hanya kupon AURELIA10 yang tersedia di data saat ini." : "Isi kode kupon dulu, contoh AURELIA10."; track("apply_coupon", { result: "fail" }); }
  saveOrder(); renderSummary();
});
$("copy-summary")?.addEventListener("click", async () => {
  const text = buildMessage();
  const st = $("copy-status");
  try { await navigator.clipboard.writeText(text); st.textContent = "Ringkasan berhasil disalin."; }
  catch (e) {
    const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove(); st.textContent = "Ringkasan disalin (metode cadangan).";
  }
});
function selectTemplate(code, goToOrder) {
  order.template = code; saveOrder(); syncForm(); renderSummary(); renderTemplates();
  if (featuredGrid) { featuredGrid.innerHTML = templates.filter(t => t[2]).map(cardHtml).join(""); bindCards(featuredGrid); }
  track("select_template", { template: code });
  if (goToOrder) { showStep(2); $("pesan")?.scrollIntoView({behavior:"smooth"}); }
}
// Preselect dari query atau dari penyimpanan
const params = new URLSearchParams(location.search);
if (params.get("template") && templateBySlug(params.get("template"))) order.template = params.get("template");
syncForm(); renderSummary(); showStep(1);
$("order-form")?.addEventListener("submit", e => {
  e.preventDefault();
  readFormIntoOrder();
  if (!validateStep(1) || !validateStep(2) || !validateStep(4)) { showStep(!order.template ? 1 : (!order.package ? 2 : 4)); return; }
  track("whatsapp_click", { template: order.template, package: order.package });
  window.open("https://wa.me/" + ADMIN_WHATSAPP_NUMBER + "?text=" + encodeURIComponent(buildMessage()), "_blank");
});

// Demo modal
let currentDemo = "";
function openDemo(code) {
  const t = templateBySlug(code); if (!t) return;
  currentDemo = code;
  $("demo-content").innerHTML = `<h3 id="demo-title">Demo: ${esc(t[0])}</h3><p class="code">Kode: ${code} • Kategori: ${esc(t[1])}${t[2] ? " • Unggulan" : ""}</p><div class="demo-phone" aria-label="Pratinjau mobile"><p class="mock-eyebrow">Pratinjau Mobile</p><p class="mock-names">${esc(t[0])}</p><p>Contoh tampilan undangan untuk kategori ${esc(t[1])}. Nama pasangan, tanggal, dan isi acara diisi sesuai pesananmu, bukan data pelanggan asli.</p><span class="mock-btn">Buka Undangan</span></div><p><a href="demo.html?template=${code}">Buka halaman demo penuh</a></p>`;
  const m = $("demo-modal"); m.hidden = false; document.body.style.overflow = "hidden"; $("demo-close").focus();
}
function closeDemo() { $("demo-modal").hidden = true; document.body.style.overflow = ""; }
$("demo-close")?.addEventListener("click", closeDemo);
$("demo-modal")?.addEventListener("click", e => { if (e.target.id === "demo-modal") closeDemo(); });
$("demo-select")?.addEventListener("click", () => { closeDemo(); selectTemplate(currentDemo, true); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeDemo(); });
