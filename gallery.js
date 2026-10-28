// Galeri + paket + add-on dari data.js (satu sumber data).
function cardHtml(t) {
  const A = window.AURELIA;
  let saved = ""; try { saved = JSON.parse(localStorage.getItem("aurelia_order_v2") || "{}").template || ""; } catch (e) {}
  const selected = saved === t.slug;
  return `<article class="card${selected ? " selected" : ""}"><div class="template-thumb thumb-${t.categorySlug}" aria-hidden="true"><span class="tag">${A.esc(t.category)}</span><strong>${A.esc(t.name)}</strong><span>Pratinjau gaya</span></div><div class="tag">${t.featured ? "Unggulan • " : ""}${A.esc(t.category)}</div><h3>${A.esc(t.name)}</h3><p class="code">Kode: ${t.slug}${selected ? " • Terpilih" : ""}</p><p class="small">${A.esc(t.description)}</p><p class="small">Mulai ${A.fmtPrice(t.startingPrice)} — harga paket Starter.</p><div class="card-actions"><a class="btn secondary" href="${t.demoUrl}">Lihat Demo</a><a class="btn secondary" href="${t.detailUrl}">Detail Template</a><button class="btn" type="button" data-select="${t.slug}">${selected ? "Terpilih ✓" : "Pilih Desain Ini"}</button></div></article>`;
}
function bindCards(container) {
  container.querySelectorAll("[data-select]").forEach(b => b.addEventListener("click", () => {
    let o = {}; try { o = JSON.parse(localStorage.getItem("aurelia_order_v2") || "{}"); } catch (e) {}
    o.template = b.dataset.select; localStorage.setItem("aurelia_order_v2", JSON.stringify(o));
    if (window.renderGallery) renderGallery();
    if (window.renderFeatured) renderFeatured();
    location.href = "/order?template=" + b.dataset.select;
  }));
}
function renderFeatured() {
  const A = window.AURELIA, el = document.getElementById("featured"); if (!el) return;
  el.innerHTML = A.TEMPLATES.filter(t => t.featured).map(cardHtml).join(""); bindCards(el);
}
function renderGallery() {
  const A = window.AURELIA, grid = document.getElementById("templates"); if (!grid) return;
  const q = (document.getElementById("search")?.value || "").toLowerCase();
  const cat = document.getElementById("category-filter")?.value || "Semua tema";
  const featuredOnly = document.getElementById("featured-only")?.checked;
  const sort = document.getElementById("sort-filter")?.value || "featured";
  let list = A.TEMPLATES.filter(t => (!q || t.name.toLowerCase().includes(q) || t.slug.includes(q) || t.category.toLowerCase().includes(q)) && (cat === "Semua tema" || t.category === cat) && (!featuredOnly || t.featured));
  if (sort === "name") list = [...list].sort((a,b) => a.name.localeCompare(b.name));
  else if (sort === "category") list = [...list].sort((a,b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
  else list = [...list].sort((a,b) => (b.featured - a.featured) || a.name.localeCompare(b.name));
  const count = document.getElementById("result-count"); if (count) count.textContent = `Menampilkan ${list.length} dari ${A.TEMPLATES.length} template.`;
  grid.innerHTML = list.length ? list.map(cardHtml).join("") : `<p><strong>Tidak ada template yang cocok.</strong><br>Coba hapus kata kunci, ubah tema, atau tekan Reset Filter.</p>`;
  bindCards(grid);
  const banner = document.getElementById("selected-banner");
  if (banner) {
    let saved = ""; try { saved = JSON.parse(localStorage.getItem("aurelia_order_v2") || "{}").template || ""; } catch (e) {}
    const tpl = A.getTemplate(saved);
    if (tpl) { banner.hidden = false; banner.innerHTML = `Template terpilih: <strong>${A.esc(tpl.name)}</strong> (${tpl.slug}). <a href="/order">Lanjut ke form pemesanan</a>.`; }
    else banner.hidden = true;
  }
}
function renderPackages() {
  const A = window.AURELIA;
  const html = A.PACKAGES.map(p => `<article class="card"><h3>${A.esc(p.name)}</h3><div class="price">${A.fmtPrice(p.price)}</div><p>Detail fitur, batas revisi, masa aktif, dan waktu pengerjaan: dikonfigurasi admin.</p><div class="card-actions"><a class="btn" href="/order?package=${p.slug}">Pilih Paket Ini</a></div></article>`).join("");
  document.querySelectorAll("#packages, #package-list").forEach(el => el.innerHTML = html);
}
function renderAddons() {
  const A = window.AURELIA, el = document.getElementById("addons"); if (!el) return;
  el.innerHTML = A.ADDONS.map(a => `<article class="card"><h3>${A.esc(a.name)}</h3><div class="price">${A.fmt(a.price)}</div><p>${A.esc(a.description)}</p></article>`).join("");
}
window.renderFeatured = renderFeatured; window.renderGallery = renderGallery; window.renderPackages = renderPackages; window.renderAddons = renderAddons;
