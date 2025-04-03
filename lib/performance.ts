/**
 * Utility functions for performance optimization
 */

/**
 * Debounces a function to limit how often it can be called
 * @param func The function to debounce
 * @param wait The time to wait in milliseconds
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>): void => {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttles a function to limit how often it can be called
 * @param func The function to throttle
 * @param limit The time limit in milliseconds
 */
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle = false
  let lastFunc: NodeJS.Timeout
  let lastRan: number

  return (...args: Parameters<T>): void => {
    if (!inThrottle) {
      func(...args)
      lastRan = Date.now()
      inThrottle = true

      setTimeout(() => {
        inThrottle = false
      }, limit)
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(
        () => {
          if (Date.now() - lastRan >= limit) {
            func(...args)
            lastRan = Date.now()
          }
        },
        limit - (Date.now() - lastRan),
      )
    }
  }
}

/**
 * Creates a memoized version of a function that only recalculates when inputs change
 * @param func The function to memoize
 */
export function memoize<T extends (...args: any[]) => any>(func: T): T {
  const cache = new Map()

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key)
    }

    const result = func(...args)
    cache.set(key, result)
    return result
  }) as T
}

/**
 * Lazy loads a component or module
 * @param factory A function that returns a promise that resolves to a module
 */
export function lazyLoad<T>(factory: () => Promise<{ default: T }>): () => Promise<{ default: T }> {
  return () => {
    return factory().catch((error) => {
      console.error("Error lazy loading component:", error)
      throw error
    })
  }
}

