class Projects {
  constructor() {
      this.projects = []
      this.adapter = new ProjectsAdapter()
      this.initBindingsAndEventListeners()
      this.fetchAndLoadProjects()
  }

  initBindingsAndEventListeners() {
      this.projectsContainer = document.getElementById('projects-container')
  }

  fetchAndLoadProjects() {
      this.adapter
        .getProjects()
        .then(projects => {
          projects.data.forEach(project => this.projects.push(new Project(project)))
      })
      .then(() => {
          this.render()
      })
  }

  render() {
    this.projects.forEach(project => {
      let projectMarkup = project.render()
      this.projectsContainer.insertAdjacentHTML("beforeend", projectMarkup)
      project.initBindingsAndEventListeners()
    })

  }


}