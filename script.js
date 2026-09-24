function buildPhotoGrid(containerId, items, dlLabel) {
  const el = document.getElementById(containerId);
  items.forEach(p => {
    const fig = document.createElement("figure");
    fig.innerHTML = `
      <img src="${p.file}" alt="${(p.label||'').replace(/<[^>]+>/g,'')}" loading="lazy" data-full="${p.file}">
      <figcaption>
        <span>${p.label || ''}</span>
        <a class="download" href="${p.file}" download>${dlLabel}</a>
      </figcaption>`;
    el.appendChild(fig);
  });
  el.addEventListener('click', e => {
    if (e.target.tagName === 'IMG') openImageLightbox(e.target.dataset.full, e.target.alt);
  });
}

function buildPdfGrid(containerId, items, dlLabel) {
  const el = document.getElementById(containerId);
  items.forEach(p => {
    const card = document.createElement('div');
    card.className = 'pdf-card';
    card.innerHTML = `
      <div class="pdf-thumb" data-full="${p.file}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
          <path d="M6 2h9l5 5v15H6z"/><path d="M15 2v5h5"/>
        </svg>
      </div>
      <div class="pdf-info">
        <span>${p.label}</span>
        <a class="download" href="${p.file}" download>${dlLabel}</a>
      </div>`;
    el.appendChild(card);
  });
  el.addEventListener('click', e => {
    const thumb = e.target.closest('.pdf-thumb');
    if (thumb) openPdfLightbox(thumb.dataset.full);
  });
}

function openImageLightbox(src, alt) {
  const lb = document.getElementById('lightbox');
  lb.querySelector('.lightbox-body').innerHTML = `<img src="${src}" alt="${alt}">`;
  lb.classList.add('open');
}
function openPdfLightbox(src) {
  const lb = document.getElementById('lightbox');
  lb.querySelector('.lightbox-body').innerHTML = `<iframe src="${src}"></iframe>`;
  lb.classList.add('open');
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.querySelector('.lightbox-body').innerHTML = '';
}
document.addEventListener('DOMContentLoaded', () => {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
});
