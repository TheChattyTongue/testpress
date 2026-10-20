import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function media(path: string) {
  const base = import.meta.env.BASE_URL
  return `${base}media/${path.replace(/^\//, '')}`
}
