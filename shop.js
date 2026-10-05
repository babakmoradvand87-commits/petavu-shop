(async function () {
  petavuShell(
    "بازار B2B",
    `<a href="${PETAVU_ENV.origins.website}">سایت صنعت</a>`,
    `<p class="muted">نسخهٔ ۱: کاتالوگ منتشرشده. سبد و سفارش در نسخهٔ بعد — نمایش داده نمی‌شود تا ساخته شود.</p><div class="grid" id="g"><p class="muted">در حال بارگذاری…</p></div>`
  );
  try {
    const { data, error } = await petavuData.products.published();
    if (error) throw error;
    qs("#g").innerHTML =
      (data || [])
        .map(
          (p) => `<article class="card"><h3>${p.name}</h3><p class="muted">${p.businesses?.name || ""}</p><p>${money(p.price_irr)}</p></article>`
        )
        .join("") || `<p class="muted">کالای منتشرشده‌ای نیست.</p>`;
  } catch {
    qs("#g").innerHTML = `<p class="err">کاتالوگ در دسترس نیست.</p>`;
  }
})();
