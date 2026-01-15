import db from '@/database/urbnlanes-db.json'

export function getAllProjects() {
  return db.projects
}

export function getProjectById(id) {
  return db.projects.find((project) => project.id === id)
}
