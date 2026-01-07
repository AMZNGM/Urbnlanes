import db from '@/database/urbnlanes-db.json'

// export function getCompanyInfo() {
//   return db.metadata.company
// }

// export function getAllProjects() {
//   return db.projects
// }

export function getProjectById(id) {
  return db.projects.find((project) => project.id === id)
}

// export function getFeaturedProjects() {
//   return db.projects.filter((project) => project.featured)
// }

// export function getProjectsByStatus(status) {
//   return db.projects.filter((project) => project.status === status)
// }

// export function getProjectsByType(type) {
//   return db.projects.filter((project) => project.type === type)
// }

// export function getAllProperties() {
//   return db.properties
// }

// export function getPropertyById(id) {
//   return db.properties.find((property) => property.id === id)
// }

// export function getPropertiesByProjectId(projectId) {
//   return db.properties.filter((property) => property.projectId === projectId)
// }

// export function getAvailableProperties() {
//   return db.properties.filter((property) => property.status === 'available')
// }

// export function getPropertiesByType(type) {
//   return db.properties.filter((property) => property.type === type)
// }

// export function getAllTeamMembers() {
//   return db.team
// }

// export function getTeamMemberById(id) {
//   return db.team.find((member) => member.id === id)
// }

// export function getAllNews() {
//   return db.news.sort((a, b) => new Date(b.date) - new Date(a.date))
// }

// export function getNewsById(id) {
//   return db.news.find((news) => news.id === id)
// }

// export function getFeaturedNews() {
//   return db.news.filter((news) => news.featured)
// }

// export function getNewsByCategory(category) {
//   return db.news.filter((news) => news.category === category)
// }

// export function getContactInfo() {
//   return db.contact
// }

// export function getSocialMedia() {
//   return db.contact.socialMedia
// }

// export function getSettings() {
//   return db.settings
// }

export function getWhoweare() {
  return db.whoweare
}

// Search
// export function searchProjects(query) {
//   const searchTerm = query.toLowerCase()
//   return db.projects.filter(
//     (project) =>
//       project.name.toLowerCase().includes(searchTerm) ||
//       project.description.toLowerCase().includes(searchTerm) ||
//       project.location.city.toLowerCase().includes(searchTerm) ||
//       project.type.toLowerCase().includes(searchTerm)
//   )
// }

// export function searchProperties(query) {
//   const searchTerm = query.toLowerCase()
//   return db.properties.filter(
//     (property) =>
//       property.unitNumber.toLowerCase().includes(searchTerm) ||
//       property.type.toLowerCase().includes(searchTerm) ||
//       property.features.some((feature) => feature.toLowerCase().includes(searchTerm))
//   )
// }

// export function filterPropertiesByPrice(minPrice, maxPrice) {
//   return db.properties.filter((property) => property.price >= minPrice && property.price <= maxPrice)
// }

// export function filterPropertiesByArea(minArea, maxArea) {
//   return db.properties.filter((property) => property.area >= minArea && property.area <= maxArea)
// }

// export function getProjectStatistics() {
//   const projects = db.projects
//   return {
//     total: projects.length,
//     completed: projects.filter((p) => p.status === 'completed').length,
//     underConstruction: projects.filter((p) => p.status === 'under-construction').length,
//     planning: projects.filter((p) => p.status === 'planning').length,
//     featured: projects.filter((p) => p.featured).length,
//   }
// }

// export function getPropertyStatistics() {
//   const properties = db.properties
//   return {
//     total: properties.length,
//     available: properties.filter((p) => p.status === 'available').length,
//     sold: properties.filter((p) => p.status === 'sold').length,
//     averagePrice: properties.reduce((sum, p) => sum + p.price, 0) / properties.length,
//   }
// }

// export default db
