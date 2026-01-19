export function parseCookies(str = '') {
  const cookies = {}
  const s = str || (typeof document !== 'undefined' ? document.cookie : '')
  if (!s) return cookies

  s.split(';').forEach((pair) => {
    const [rawName, ...rawVal] = pair.split('=')
    if (!rawName) return
    const name = decodeURIComponent(rawName.trim())
    const val = rawVal.join('=').trim()
    try {
      cookies[name] = decodeURIComponent(val)
    } catch (e) {
      cookies[name] = val
    }
  })
  return cookies
}

export function setCookie(name, value, options = {}) {
  if (typeof document === 'undefined') return
  const { expiresDays, maxAge, path = '/', domain, secure, sameSite = 'Lax' } = options
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

  if (typeof maxAge === 'number') cookie += `; Max-Age=${Math.floor(maxAge)}`
  if (typeof expiresDays === 'number') {
    const d = new Date()
    d.setTime(d.getTime() + expiresDays * 24 * 60 * 60 * 1000)
    cookie += `; Expires=${d.toUTCString()}`
  }
  if (domain) cookie += `; Domain=${domain}`
  if (path) cookie += `; Path=${path}`
  if (secure === true || (secure !== false && location && location.protocol === 'https:')) cookie += `; Secure`
  if (sameSite) cookie += `; SameSite=${sameSite}`

  document.cookie = cookie
}

export function getCookie(name) {
  const cookies = parseCookies()
  return cookies[name]
}

export function deleteCookie(name, options = {}) {
  setCookie(name, '', { ...options, expiresDays: -1 })
}

export function setJSONCookie(name, obj, options = {}) {
  try {
    setCookie(name, JSON.stringify(obj), options)
  } catch (e) {
    setCookie(name, String(obj), options)
  }
}

export function getJSONCookie(name) {
  const v = getCookie(name)
  if (!v) return null
  try {
    return JSON.parse(v)
  } catch (e) {
    return null
  }
}
