// Data publik versi pertama AURELIA — sama dengan seed Supabase yang sudah terverifikasi.
// Nomor WhatsApp admin sengaja kosong: isi ADMIN_WHATSAPP_NUMBER sebelum dipakai untuk pembeli asli.
const ADMIN_WHATSAPP_NUMBER = ""; // contoh format: 6281234567890, tanpa +, spasi, atau strip
const templates = [
["Modern Minimalist","Pernikahan",true],["Luxury Gold","Pernikahan",true],["Classic Elegant","Pernikahan",true],["Islamic Elegant","Pernikahan",true],["Floral Garden","Pernikahan",true],["Botanical Green","Pernikahan",true],["Rustic Earth","Pernikahan",false],["Vintage Romance","Pernikahan",false],["Korean Minimal","Pernikahan",true],["Japanese Minimal","Pernikahan",true],["Editorial Magazine","Pernikahan",true],["Black Tie","Pernikahan",true],["Royal Palace","Pernikahan",false],["Traditional Indonesian","Pernikahan",false],["Sundanese Wedding","Pernikahan",false],["Javanese Wedding","Pernikahan",false],["Tropical Destination","Pernikahan",false],["Beach Wedding","Pernikahan",false],["Celestial Night","Pernikahan",true],["Dark Romance","Pernikahan",false],["Watercolor Floral","Pernikahan",false],["Soft Pastel","Pernikahan",false],["Contemporary Cultural","Pernikahan",false],["Cinematic Wedding","Pernikahan",true],["Engagement Luxe","Engagement",false],["Lamaran Adat","Lamaran",false],["Khitanan Ceria","Khitanan",false],["Aqiqah Lembut","Aqiqah",false],["Ulang Tahun Anak","Ulang tahun anak",false],["Ulang Tahun Dewasa","Ulang tahun dewasa",false],["Graduation Day","Graduation",false],["Anniversary Emas","Anniversary",false],["Baby Shower","Baby shower",false],["Gender Reveal","Gender reveal",false],["Corporate Event","Corporate event",false],["Seminar & Webinar","Seminar dan webinar",false],["Grand Opening","Grand opening",false],["Reuni Nostalgia","Reuni",false],["Acara Komunitas","Acara komunitas",false],["Acara Keluarga","Undangan acara keluarga",false]
];
const packages = [
["Starter",49000],["Signature",99000],["Royal",179000],["Custom",0]
];
const addons = [
["Custom Domain",75000],["Tambahan Galeri",25000],["Animasi Premium",35000],["Desain Khusus",150000],["Bantuan Pengisian Data",30000],["Penyesuaian Konten",20000],["RSVP & Laporan Tamu",29000],["Ekspor Daftar Tamu",15000],["Perpanjangan Masa Aktif",19000]
];
const fmt = n => n === 0 ? "Sesuai kebutuhan" : "Rp" + n.toLocaleString("id-ID");
function renderTemplates(filter=""){
  const el = document.getElementById("templates");
  const q = filter.toLowerCase();
  el.innerHTML = templates.filter(t => t[0].toLowerCase().includes(q) || t[1].toLowerCase().includes(q)).map(t => `<article class="card"><div class="tag">${t[1]}${t[2] ? " • Unggulan" : ""}</div><h3>${t[0]}</h3><p>Layout katalog publik, detail desain lengkap menyusul di fase editor.</p></article>`).join("") || "<p>Tidak ada template yang cocok.</p>";
}
document.getElementById("templates") && renderTemplates();
document.getElementById("search")?.addEventListener("input", e => renderTemplates(e.target.value));
document.getElementById("packages").innerHTML = packages.map(p => `<article class="card"><h3>${p[0]}</h3><div class="price">${fmt(p[1])}</div></article>`).join("");
document.getElementById("addons").innerHTML = addons.map(a => `<article class="card"><h3>${a[0]}</h3><div class="price">${fmt(a[1])}</div></article>`).join("");
const sel = document.getElementById("order-package");
sel.innerHTML = packages.map(p => `<option value="${p[1]}">${p[0]} — ${fmt(p[1])}</option>`).join("");
function updateTotal(){
  const base = Number(sel.value || 0);
  const coupon = document.getElementById("order-coupon").value.trim().toUpperCase();
  const discount = coupon === "AURELIA10" ? Math.round(base * 0.10) : 0;
  document.getElementById("order-total").textContent = base === 0 ? "Paket Custom: total dihitung admin sesuai kebutuhan." : `Total awal ${fmt(base)}${discount ? ` − diskon ${fmt(discount)} = ${fmt(base - discount)}` : ""}.`;
}
sel.addEventListener("change", updateTotal);
document.getElementById("order-coupon").addEventListener("input", updateTotal);
updateTotal();
document.getElementById("order-btn").addEventListener("click", () => {
  if (!ADMIN_WHATSAPP_NUMBER) { alert("Nomor WhatsApp admin belum dikonfigurasi. Isi ADMIN_WHATSAPP_NUMBER di app.js sebelum dipakai untuk pembeli asli."); return; }
  const pkg = sel.options[sel.selectedIndex].text;
  const coupon = document.getElementById("order-coupon").value.trim();
  const msg = `Halo AURELIA INVITATION STUDIO, saya ingin memesan undangan digital.\nPaket: ${pkg}\nKupon: ${coupon || "-"}\nMohon info langkah selanjutnya.`;
  window.open(`https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
});
