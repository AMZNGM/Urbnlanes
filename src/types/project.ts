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
  logo?: string
  tagline?: string
  shortDesc?: string | string[]
  description?: string
  description2?: string
  brochure?: string
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
  featured?: boolean
  overview?: {
    value?: string
    startdate?: string
    enddate?: string
  }
  [key: string]: any
}
