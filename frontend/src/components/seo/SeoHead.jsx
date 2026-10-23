import { useEffect } from 'react'

function setMeta(name, content, attr = 'name') {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const SITE_URL = 'https://annairelocations.shoppingsto.com'

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function SeoHead({ title, description, image }) {
  useEffect(() => {
    // Canonical is the current route on the canonical domain (no query/hash, no trailing slash except root).
    const path = window.location.pathname.replace(/\/+$/, '')
    const url = `${SITE_URL}${path || '/'}`
    setCanonical(url)
    setMeta('og:url', url, 'property')
    if (title) document.title = `${title} | Annai Relocations`
    setMeta('description', description)
    setMeta('og:title', title, 'property')
    setMeta('og:description', description, 'property')
    if (image) setMeta('og:image', image, 'property')
  }, [title, description, image])

  return null
}
