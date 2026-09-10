(() => {
  const images = {
    salonHero: "https://images.pexels.com/photos/7750098/pexels-photo-7750098.jpeg?auto=compress&cs=tinysrgb&w=1400",
    salonAbout: "https://images.pexels.com/photos/7750116/pexels-photo-7750116.jpeg?auto=compress&cs=tinysrgb&w=1200",
    salonDetail: "https://images.pexels.com/photos/7750099/pexels-photo-7750099.jpeg?auto=compress&cs=tinysrgb&w=1200",
    salonModern: "https://images.pexels.com/photos/7750108/pexels-photo-7750108.jpeg?auto=compress&cs=tinysrgb&w=1200",
    haircut1: "https://images.pexels.com/photos/3992875/pexels-photo-3992875.jpeg?auto=compress&cs=tinysrgb&w=1000",
    haircut2: "https://images.pexels.com/photos/3992876/pexels-photo-3992876.jpeg?auto=compress&cs=tinysrgb&w=1000",
    haircut3: "https://images.pexels.com/photos/4625626/pexels-photo-4625626.jpeg?auto=compress&cs=tinysrgb&w=1000",
    haircut4: "https://images.pexels.com/photos/7781848/pexels-photo-7781848.jpeg?auto=compress&cs=tinysrgb&w=1000",
    color1: "https://images.pexels.com/photos/3993326/pexels-photo-3993326.jpeg?auto=compress&cs=tinysrgb&w=1000",
    styling: "https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=1000",
  };

  const css = `
    .lume-extra-about,.lume-extra-gallery{padding:64px 0}
    @media(min-width:768px){.lume-extra-about,.lume-extra-gallery{padding:96px 0}}
    .lume-extra-about{background:var(--ivory)}
    .lume-extra-gallery{background:var(--ivory2)}
    .lume-extra-about-grid{display:grid;grid-template-columns:1fr;gap:36px;align-items:center}
    @media(min-width:900px){.lume-extra-about-grid{grid-template-columns:1fr 1fr;gap:56px}}
    .lume-extra-about-photo{overflow:hidden;border-radius:3px;aspect-ratio:4/5;background:var(--stone)}
    .lume-extra-about-photo img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s ease}
    .lume-extra-about-photo:hover img{transform:scale(1.03)}
    .lume-extra-copy p{color:var(--charcoalSoft);line-height:1.8;margin:18px 0 0}
    .lume-extra-features{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:28px}
    .lume-extra-feature{border-top:1px solid var(--border);padding-top:13px}
    .lume-extra-feature strong{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:500}
    .lume-extra-feature span{display:block;color:var(--charcoalSoft);font-size:12px;line-height:1.55;margin-top:4px}
    .lume-extra-gallery-head{display:flex;justify-content:space-between;align-items:end;gap:20px;flex-wrap:wrap}
    .lume-extra-gallery-head p{max-width:560px;color:var(--charcoalSoft);line-height:1.7;margin:10px 0 0}
    .lume-extra-gallery-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:30px}
    @media(min-width:700px){.lume-extra-gallery-grid{grid-template-columns:repeat(4,1fr);gap:14px}}
    .lume-extra-gallery-item{position:relative;overflow:hidden;border-radius:3px;min-height:220px;background:var(--stone);cursor:zoom-in}
    .lume-extra-gallery-item.feature{grid-column:span 2;grid-row:span 2;min-height:460px}
    .lume-extra-gallery-item img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s ease}
    .lume-extra-gallery-item:hover img{transform:scale(1.04)}
    .lume-extra-gallery-caption{position:absolute;left:0;right:0;bottom:0;padding:32px 16px 14px;background:linear-gradient(to top,rgba(35,31,28,.78),transparent);color:#fff;font-size:12px;letter-spacing:.02em;opacity:0;transition:opacity .25s ease}
    .lume-extra-gallery-item:hover .lume-extra-gallery-caption{opacity:1}
    @media(max-width:699px){.lume-extra-gallery-item.feature{min-height:330px}.lume-extra-gallery-item{min-height:180px}.lume-extra-gallery-caption{opacity:1}}
    .lume-extra-hero-image{position:relative;overflow:hidden;border-radius:3px;margin-top:28px;aspect-ratio:16/7;background:var(--stone)}
    .lume-extra-hero-image img{width:100%;height:100%;object-fit:cover;display:block;filter:sepia(.12) saturate(1.08);}
  `;

  function injectStyles() {
    if (document.getElementById("lume-extra-styles")) return;
    const style = document.createElement("style");
    style.id = "lume-extra-styles";
    style.textContent = css;
    document.head.appendChild(style);
  }

  function makeAbout() {
    if (document.getElementById("about")) return null;
    const section = document.createElement("section");
    section.id = "about";
    section.className = "lume-extra-about";
    section.innerHTML = `
      <div class="container">
        <div class="lume-extra-about-grid">
          <div class="lume-extra-about-photo">
            <img src="${images.salonAbout}" alt="Elegant luxury salon interior with warm lighting, leather seating and refined styling stations" loading="lazy">
          </div>
          <div class="lume-extra-copy">
            <div class="eyebrow">Our story</div>
            <h2 style="font-size:48px;margin-top:12px">About LUMÉ</h2>
            <p>LUMÉ Studio was created around a simple idea: beauty should feel personal.</p>
            <p>We believe great hair is not simply styled — it is considered. Every appointment begins with understanding your features, your lifestyle, and the way you want to feel when you leave our studio.</p>
            <p>Our artists combine modern technique with thoughtful consultation, creating refined cuts, dimensional color, and effortless styling tailored to each guest.</p>
            <div class="lume-extra-features">
              <div class="lume-extra-feature"><strong>Personalised</strong><span>Consultations designed around you.</span></div>
              <div class="lume-extra-feature"><strong>Expert</strong><span>Modern technique with professional precision.</span></div>
              <div class="lume-extra-feature"><strong>Considered</strong><span>Premium products and thoughtful details.</span></div>
              <div class="lume-extra-feature"><strong>Effortless</strong><span>Beautiful results designed for real life.</span></div>
            </div>
          </div>
        </div>
      </div>`;
    return section;
  }

  function makeGallery() {
    if (document.getElementById("art-of-hair")) return null;
    const items = [
      [images.salonDetail, "Luxury salon styling station", true],
      [images.haircut1, "Precision haircut", false],
      [images.haircut2, "Modern salon styling", false],
      [images.haircut3, "Contemporary men's haircut", false],
      [images.haircut4, "Tailored men's style", false],
      [images.color1, "Dimensional hair color", false],
      [images.styling, "Soft waves and styling", false],
      [images.salonModern, "Modern salon interior", false],
    ];
    const section = document.createElement("section");
    section.id = "art-of-hair";
    section.className = "lume-extra-gallery";
    section.innerHTML = `
      <div class="container">
        <div class="lume-extra-gallery-head">
          <div><div class="eyebrow">The art of hair</div><h2 style="font-size:48px;margin-top:12px">The Art of Hair</h2><p>Precision cuts, effortless styling, and considered color — crafted around you.</p></div>
        </div>
        <div class="lume-extra-gallery-grid">
          ${items.map(([src, caption, feature]) => `
            <div class="lume-extra-gallery-item${feature ? " feature" : ""}" data-lume-lightbox="${src}">
              <img src="${src}" alt="${caption}" loading="lazy">
              <div class="lume-extra-gallery-caption">${caption}</div>
            </div>`).join("")}
        </div>
      </div>`;
    return section;
  }

  function wireGallery() {
    document.querySelectorAll("[data-lume-lightbox]").forEach((item) => {
      if (item.dataset.wired === "1") return;
      item.dataset.wired = "1";
      item.addEventListener("click", () => {
        const existing = document.getElementById("lume-extra-lightbox");
        if (existing) existing.remove();
        const overlay = document.createElement("div");
        overlay.id = "lume-extra-lightbox";
        overlay.style.cssText = "position:fixed;inset:0;z-index:9999;background:rgba(35,31,28,.86);display:flex;align-items:center;justify-content:center;padding:20px;cursor:zoom-out";
        const img = document.createElement("img");
        img.src = item.dataset.lumeLightbox;
        img.alt = item.querySelector("img")?.alt || "Salon gallery image";
        img.style.cssText = "max-width:min(1100px,95vw);max-height:90vh;object-fit:contain;box-shadow:0 30px 70px rgba(0,0,0,.4)";
        overlay.appendChild(img);
        overlay.addEventListener("click", () => overlay.remove());
        document.body.appendChild(overlay);
      });
    });
  }

  function enhance() {
    const root = document.getElementById("root");
    if (!root || !root.children.length) return;
    injectStyles();
    const services = document.getElementById("services");
    const home = document.getElementById("home");
    if (services) {
      const about = makeAbout();
      if (about) services.parentNode.insertBefore(about, services);
      const gallery = makeGallery();
      if (gallery) services.parentNode.insertBefore(gallery, services);
    } else if (home) {
      const about = makeAbout();
      if (about) home.parentNode.insertBefore(about, home.nextSibling);
      const gallery = makeGallery();
      if (gallery) home.parentNode.insertBefore(gallery, about ? about.nextSibling : home.nextSibling);
    }
    wireGallery();
  }

  const observer = new MutationObserver(() => enhance());
  observer.observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", enhance);
  else enhance();
})();
