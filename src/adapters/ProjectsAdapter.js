class ProjectsAdapter {
  constructor() {
    this.baseUrl = 
    'http://localhost:3000/api/v1/projects'
  }

  getProjects() {
    return fetch(this.baseUrl).then(res => res.json())
  }
}
