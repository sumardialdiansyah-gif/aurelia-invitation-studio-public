// Form pemesanan multistep /order — satu sumber perhitungan dari data.js.
(function(){
  const A = window.AURELIA; if (!A) return;
  const $ = id => document.getElementById(id);
  const STORAGE_KEY = "aurelia_order_v2";
  let order = { template:"", package:"", addons:[], name:"", phone:"", couple:"", date:"", time:"", location:"", map:"", detail:"", note:"", coupon:"", couponApplied:"" };
  try { const s = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); if (s && typeof s === "object") order = { ...order, ...s, addons: Array.isArray(s.addons) ? s.addons : [] }; } catch (e) {}
  const params = new URLSearchParams(location.search);
  if (params.get("template") && A.getTemplate(params.get("template"))) order.template = params.get("template");
  if (params.get("package") && A.PACKAGES.find(p => p.slug === params.get("package"))) order.package = A.PACKAGES.find(p => p.slug === params.get("package")).name;
  function save(){ try { localStorage.setItem(STORAGE_KEY, JSON.stringify(order)); } catch (e) {} }
  function calc(){
    const pkg = A.PACKAGES.find(p => p.name === order.package);
    const pkgPrice = pkg ? pkg.price : 0;
    const chosen = A.ADDONS.filter(a => order.addons.includes(a.name));
    const addonTotal = chosen.reduce((s,a) => s + a.price, 0);
    const subtotal = pkgPrice + addonTotal;
    const discount = order.couponApplied === "AURELIA10" ? Math.round(pkgPrice * 0.10) : 0;
    return { pkgPrice, chosen, addonTotal, subtotal, discount, total: Math.max(0, subtotal - discount) };
  }
  function buildMessage(){
    const c = calc(), tpl = A.getTemplate(order.template);
    return [
      "Halo Aurelia Invitation Studio, saya ingin memesan undangan digital.", "",
      "DATA PEMESAN", "Nama: " + order.name, "Nomor WhatsApp: " + order.phone, "",
      "DETAIL UNDANGAN", "Template: " + (tpl ? tpl.name : "-"), "Kode template: " + (order.template || "-"),
      "Paket: " + (order.package ? order.package + " — " + A.fmtPrice(c.pkgPrice) : "-"),
      "Add-on: " + (c.chosen.length ? c.chosen.map(a => a.name + " " + A.fmt(a.price)).join(", ") : "-"), "",
      "DATA ACARA", "Nama pasangan: " + (order.couple || "-"), "Tanggal acara: " + (order.date || "-"), "Waktu: " + (order.time || "-"), "Lokasi: " + (order.location || "-"),
      order.map ? "Alamat / tautan peta: " + order.map : "", order.detail ? "Detail acara: " + order.detail : "", "",
      "RINCIAN BIAYA", "Subtotal: " + A.fmt(c.subtotal), "Diskon: " + A.fmt(c.discount) + (order.couponApplied ? " (kupon " + order.couponApplied + ")" : ""),
      "Total: " + A.fmt(c.total) + (order.package === "Custom" ? " + harga paket Custom (menunggu konfirmasi admin)" : ""), "",
      "Catatan tambahan: " + (order.note || "-"), "",
      "Mohon informasi mengenai proses pemesanan dan pembayaran selanjutnya. Terima kasih."
    ].filter(x => x !== "").join("\n");
  }
  function renderSummary(){
    const c = calc(), tpl = A.getTemplate(order.template);
    const rows = `<dt>Template</dt><dd>${tpl ? A.esc(tpl.name) + " (" + A.esc(order.template) + ")" : "—"}</dd><dt>Paket</dt><dd>${order.package ? A.esc(order.package) + " — " + A.fmtPrice(c.pkgPrice) : "—"}</dd><dt>Add-on</dt><dd>${c.chosen.length ? c.chosen.map(a => A.esc(a.name)).join(", ") : "—"}</dd><dt>Nama pemesan</dt><dd>${order.name ? A.esc(order.name) : "—"}</dd><dt>Nomor WhatsApp</dt><dd>${order.phone ? A.esc(order.phone) : "—"}</dd><dt>Nama pasangan</dt><dd>${order.couple ? A.esc(order.couple) : "—"}</dd><dt>Tanggal / waktu acara</dt><dd>${order.date || order.time ? A.esc((order.date || "-") + " " + (order.time || "")) : "—"}</dd><dt>Lokasi</dt><dd>${order.location ? A.esc(order.location) : "—"}</dd><dt>Subtotal</dt><dd>${A.fmt(c.subtotal)}</dd><dt>Diskon kupon</dt><dd>${c.discount ? "− " + A.fmt(c.discount) : "Rp0"}</dd>`;
    const s1 = $("order-summary"); if (s1) s1.innerHTML = rows;
    const s2 = $("final-summary"); if (s2) s2.innerHTML = rows;
    const t1 = $("order-total"); if (t1) t1.textContent = "Total akhir: " + A.fmt(c.total) + (order.package === "Custom" ? " + harga paket Custom (dikonfirmasi admin)" : "");
    const t2 = $("final-total"); if (t2) t2.textContent = "Total akhir: " + A.fmt(c.total) + (order.package === "Custom" ? " + harga paket Custom (dikonfirmasi admin)" : "");
    const cn = $("custom-note"); if (cn) cn.hidden = order.package !== "Custom";
  }
  // Isi kontrol dari data.js
  const tplSel = $("order-template"); tplSel.innerHTML = `<option value="">Pilih template…</option>` + A.TEMPLATES.map(t => `<option value="${t.slug}">${A.esc(t.name)} — ${t.slug}</option>`).join("");
  const pkgSel = $("order-package"); pkgSel.innerHTML = `<option value="">Pilih paket…</option>` + A.PACKAGES.map(p => `<option value="${A.esc(p.name)}">${A.esc(p.name)} — ${A.fmtPrice(p.price)}</option>`).join("");
  const addonChecks = $("order-addons"); addonChecks.innerHTML = A.ADDONS.map(a => `<label><input type="checkbox" value="${A.esc(a.name)}" data-price="${a.price}"> <span><strong>${A.esc(a.name)}</strong> — ${A.fmt(a.price)}<br><span class="small">${A.esc(a.description)}</span></span></label>`).join("");
  const pkgCards = $("package-cards");
  if (pkgCards) { pkgCards.innerHTML = A.PACKAGES.map(p => `<article class="card"><h3>${A.esc(p.name)}</h3><div class="price">${A.fmtPrice(p.price)}</div><div class="card-actions"><button class="btn" type="button" data-package="${A.esc(p.name)}">Pilih Paket Ini</button></div></article>`).join("");
    pkgCards.querySelectorAll("[data-package]").forEach(b => b.addEventListener("click", () => { order.package = b.dataset.package; sync(); save(); renderSummary(); showStep(3); })); }
  function sync(){
    tplSel.value = order.template; pkgSel.value = order.package;
    document.querySelectorAll("#order-addons input").forEach(i => { i.checked = order.addons.includes(i.value); });
    const set = (id, v) => { const el = $(id); if (el) el.value = v; };
    set("order-name", order.name); set("order-phone", order.phone); set("order-couple", order.couple); set("order-date", order.date); set("order-time", order.time); set("order-location", order.location); set("order-map", order.map); set("order-detail", order.detail); set("order-note", order.note); set("order-coupon", order.coupon);
    const cs = $("coupon-status"); if (cs) cs.textContent = order.couponApplied ? `Kupon ${order.couponApplied} diterapkan: diskon 10% dari harga paket.` : "";
  }
  function read(){
    order.template = tplSel.value || order.template; order.package = pkgSel.value || order.package;
    order.addons = [...document.querySelectorAll("#order-addons input:checked")].map(i => i.value);
    const get = id => ($(id)?.value || "").trim();
    order.name = get("order-name"); order.phone = get("order-phone"); order.couple = get("order-couple"); order.date = get("order-date"); order.time = get("order-time"); order.location = get("order-location"); order.map = get("order-map"); order.detail = get("order-detail"); order.note = get("order-note"); order.coupon = get("order-coupon");
    save();
  }
  let currentStep = 1; const TITLES = ["Pilih Desain","Pilih Paket","Pilih Add-on","Informasi Pemesan dan Acara","Tinjau Ringkasan","Lanjutkan ke WhatsApp"];
  function showStep(n){
    currentStep = Math.max(1, Math.min(6, n));
    document.querySelectorAll(".step").forEach(s => { s.hidden = Number(s.dataset.step) !== currentStep; });
    const ind = $("step-indicator"); if (ind) ind.textContent = `Langkah ${currentStep} dari 6 — ${TITLES[currentStep-1]}`;
    $("prev-btn").hidden = currentStep === 1; $("next-btn").hidden = currentStep === 6; renderSummary();
  }
  function validate(step){
    read(); const err = $("form-error"); err.hidden = true; err.textContent = "";
    $("err-name").textContent = ""; $("err-phone").textContent = ""; $("err-date").textContent = "";
    if (step === 1 && !order.template) { err.textContent = "Pilih template dulu."; err.hidden = false; return false; }
    if (step === 2 && !order.package) { err.textContent = "Pilih paket dulu."; err.hidden = false; return false; }
    if (step === 4) {
      let ok = true;
      if (!order.name) { $("err-name").textContent = "Nama pemesan wajib diisi."; ok = false; }
      const digits = order.phone.replace(/\D/g, "");
      if (!order.phone || digits.length < 9 || digits.length > 15 || !(digits.startsWith("0") || digits.startsWith("62"))) { $("err-phone").textContent = "Isi nomor WhatsApp yang valid, contoh 0812xxxx atau 62812xxxx."; ok = false; }
      if (order.date && isNaN(Date.parse(order.date))) { $("err-date").textContent = "Tanggal acara tidak valid."; ok = false; }
      if (!ok) { err.textContent = "Periksa kolom yang ditandai di atas."; err.hidden = false; return false; }
    }
    return true;
  }
  $("next-btn").addEventListener("click", () => { if (validate(currentStep)) showStep(currentStep + 1); });
  $("prev-btn").addEventListener("click", () => { read(); showStep(currentStep - 1); });
  ["order-template","order-package","order-coupon","order-name","order-phone","order-couple","order-date","order-time","order-location","order-map","order-detail","order-note"].forEach(id => $(id)?.addEventListener("input", () => { read(); renderSummary(); }));
  $("order-addons").addEventListener("change", () => { read(); renderSummary(); });
  $("apply-coupon").addEventListener("click", () => {
    read(); const code = order.coupon.toUpperCase(), cs = $("coupon-status");
    if (code === "AURELIA10") { order.couponApplied = "AURELIA10"; cs.textContent = "Kupon AURELIA10 berhasil diterapkan: diskon 10% dari harga paket."; }
    else { order.couponApplied = ""; cs.textContent = code ? "Kupon tidak dikenali. Hanya kupon AURELIA10 yang tersedia di data saat ini." : "Isi kode kupon dulu, contoh AURELIA10."; }
    save(); renderSummary();
  });
  $("copy-summary").addEventListener("click", async () => {
    const text = buildMessage(), st = $("copy-status");
    try { await navigator.clipboard.writeText(text); st.textContent = "Ringkasan berhasil disalin."; }
    catch (e) { const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove(); st.textContent = "Ringkasan disalin (metode cadangan)."; }
  });
  $("order-form").addEventListener("submit", e => {
    e.preventDefault(); read();
    if (!validate(1) || !validate(2) || !validate(4)) { showStep(!order.template ? 1 : (!order.package ? 2 : 4)); return; }
    window.open("https://wa.me/" + A.ADMIN_WHATSAPP_NUMBER + "?text=" + encodeURIComponent(buildMessage()), "_blank");
  });
  sync(); renderSummary(); showStep(1);
})();
