// Logika bersama multi-page: navigasi, tautan WhatsApp, tahun copyright, animasi entrance ringan.
(function(){
  const A = window.AURELIA; if (!A) return;
  const wa = "https://wa.me/" + A.ADMIN_WHATSAPP_NUMBER + "?text=" + encodeURIComponent("Halo AURELIA INVITATION STUDIO, saya ingin konsultasi tentang undangan digital.");
  document.querySelectorAll(".wa-link").forEach(el => { el.href = wa; });
  const cw = document.querySelectorAll(".contact-wa"); cw.forEach(el => { el.href = "https://wa.me/" + A.ADMIN_WHATSAPP_NUMBER; el.textContent = A.ADMIN_WHATSAPP_NUMBER; });
  const y = document.querySelectorAll(".copyright-year"); y.forEach(el => { el.textContent = new Date().getFullYear(); });
  const btn = document.getElementById("menu-btn"), nav = document.getElementById("main-nav");
  btn?.addEventListener("click", () => { const open = nav.classList.toggle("open"); btn.setAttribute("aria-expanded", String(open)); });
  document.body.classList.add("page-in");
  // Reveal ringan saat elemen masuk viewport (hanya transform/opacity, tidak mengunci scroll)
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("revealed"); io.unobserve(e.target); } }), { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("revealed"));
  }
})();
