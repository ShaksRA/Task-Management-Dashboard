/**
 * localStorage utilities with JSON serialisation and error handling.
 */

export function getItem(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch (err) {
    console.warn(`[storage] Failed to read "${key}":`, err)
    return fallback
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (err) {
    console.warn(`[storage] Failed to write "${key}":`, err)
    return false
  }
}

export function removeItem(key) {
  try {
    localStorage.removeItem(key)
    return true
  } catch (err) {
    console.warn(`[storage] Failed to remove "${key}":`, err)
    return false
  }
}
