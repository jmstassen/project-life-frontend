class Projects {
  constructor() {
      this.projects = []
      this.adapter = new ProjectsAdapter()
      // this.bindEventListeners()
      this.fetchAndLoadProjects()
  }

  fetchAndLoadProjects() {
      this.adapter.getProjects().then(projects => {
          console.log(projects)
      })
  }
}