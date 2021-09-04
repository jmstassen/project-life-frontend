class ProjectsAdapter {
  constructor() {
    this.baseUrl = 
    'http://localhost:3000/api/v1/projects'
  }

  updateProjectTitle(title, id) {
    return fetch(`${this.baseUrl}/${id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json", "Accept": "application/json"},
      body: JSON.stringify({
        title: title,
      })
    })
    .then(res => res.json())
  }

  createProject(title) {
    return fetch(this.baseUrl, {
      method: "POST",
      headers: {"Content-Type": "application/json", "Accept": "application/json"},
      body: JSON.stringify({
        title: title
      })
    })
    .then(res => res.json())
}

deleteProject(id) {
  return fetch(`${this.baseUrl}/${id}`, {
    method: "DELETE",
    headers: {"Content-Type": "application/json", "Accept": "application/json"}
  })
  .then(res => res.json())
}

  getProjects() {
    return fetch(this.baseUrl).then(res => res.json())
  }
}
