class Projects {
  constructor() {
      this.projects = []
      this.adapter = new ProjectsAdapter()
      // this.bindEventListeners()
      this.fetchAndLoadProjects()
  }

  fetchAndLoadProjects() {
      this.adapter
        .getProjects()
        .then(projects => {
          projects.data.forEach(project => this.projects.push(project))
      })
      .then(() => {
          this.render()
      })
  }

  render() {
    const projectsContainer = document.getElementById('projects-container')
    projectsContainer.innerHTML = 'my projects here'
  }


}