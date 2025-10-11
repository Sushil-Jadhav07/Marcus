// Lightweight SEO utilities without external deps

export function setFavicon(href) {
  try {
    if (!href) return;
    let link = document.querySelector("link[rel='icon']");
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'icon');
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);

    // Apple touch icon (best effort)
    let apple = document.querySelector("link[rel='apple-touch-icon']");
    if (!apple) {
      apple = document.createElement('link');
      apple.setAttribute('rel', 'apple-touch-icon');
      document.head.appendChild(apple);
    }
    apple.setAttribute('href', href);
  } catch (_) {}
}

function upsertMetaByName(name, content) {
  if (!name) return;
  let el = document.querySelector(`meta[name='${name}']`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  if (typeof content === 'string') el.setAttribute('content', content);
}

function upsertMetaByProp(property, content) {
  if (!property) return;
  let el = document.querySelector(`meta[property='${property}']`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  if (typeof content === 'string') el.setAttribute('content', content);
}

export function setPageSeo({ title, description, image, url }) {
  try {
    if (title) document.title = title;
    if (description) upsertMetaByName('description', description);

    // Open Graph
    if (title) upsertMetaByProp('og:title', title);
    if (description) upsertMetaByProp('og:description', description);
    if (image) upsertMetaByProp('og:image', image);
    if (url) upsertMetaByProp('og:url', url);
    upsertMetaByProp('og:type', 'website');

    // Twitter
    if (title) upsertMetaByName('twitter:title', title);
    if (description) upsertMetaByName('twitter:description', description);
    if (image) upsertMetaByName('twitter:image', image);
    upsertMetaByName('twitter:card', 'summary_large_image');
  } catch (_) {}
}


