export interface Amenity {
  id: string
  name: string
  icon: string
  description: string
}

export interface Partner {
  name: string
  logo: string
  role: string
}

export interface Project {
  id: string
  name: string
  description?: string
  tagline?: string
  status?: string
  category?: string
  completion?: string
  location?: {
    city: string
    country: string
    map: string
    neighborhood?: string
  }
  amenities?: Amenity[]
  partners?: Partner[]
  gallery?: string[]
  [key: string]: any
}
