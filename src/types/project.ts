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
  description?: string | string[]
  brochure?: string
  status?: string
  category: string[]
  completion?: string
  overview?: {
    value?: string
    startdate?: string
    enddate?: string
    workingTime?: string
    buildingArea?: string
  }
  location?: {
    city: string
    country: string
    map: string
    neighborhood?: string
  }
  amenities?: Amenity[]
  partners?: Partner[]
  featured?: boolean
  gallery?: string[]
  videoGallery?: string[]
  constructionGallery?: string[]
  [key: string]: any
}
