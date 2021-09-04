class Projects {
  constructor() {
      this.projects = []
      this.adapter = new ProjectsAdapter()
      this.initBindingsAndEventListeners()
      this.fetchAndLoadProjects()
  }

  initBindingsAndEventListeners() {
      this.projectsContainer = document.getElementById('projects-container')

      this.projectsContainer.addEventListener("mouseenter", this.handleProjectTitleMouseEnter.bind(this), true);
      this.projectsContainer.addEventListener("mouseleave", this.handleProjectTitleMouseLeave.bind(this), true);
      this.projectsContainer.addEventListener("click", this.handleProjectTitleClick.bind(this), true);
      this.projectsContainer.addEventListener("keypress", this.handleProjectTitleEnter.bind(this))
      this.projectsContainer.addEventListener("focusout", this.handleProjectTitleFocusOut.bind(this))
  }

  handleProjectTitleMouseEnter(e) {
    if (e.target.className === "project-header") {
      let deleteBtn = e.target.parentNode.querySelector(".delete-project");
      deleteBtn.classList.replace("hidden", "mouseover-visible");
    }
  }

  handleProjectTitleMouseLeave(e) {
    if(e.target.className === "project-header") {
      let deleteBtn = e.target.parentNode.querySelector(".delete-project");
      deleteBtn.classList.replace("mouseover-visible", "hidden");
    }
  }

  handleProjectTitleEnter(e) {
    if (e.key === 'Enter') {
      if (e.target.className === "project-title") {
      e.target.contentEditable = "false"
      } else if (e.target.className === "new-project-title") {
        e.target.contentEditable = "false"
      }
    }
  }

  handleProjectTitleFocusOut(e) {
    if (e.target.classList.contains("project-title")) {
    console.log("project title focus out")
    console.log(this)
    e.target.contentEditable = "false"
    const newTitle = e.target.innerText
    const projectId = e.target.parentNode.parentNode.parentNode.dataset.id
    console.log(projectId)
    this.adapter.updateProjectTitle(newTitle, projectId)
    } else if (e.target.classList.contains("new-project-title")) {
      if (e.target.innerText != "") { 
        e.target.contentEditable = "false"
        const newTitle = e.target.innerText
        this.adapter.createProject(newTitle)
        .then (project => {
          console.log(project)
          console.log(project.data.id)
          console.log(project.data.attributes.title)
          let newProjectBody = (
            {
            id: project.data.id,
            attributes: {
              title: project.data.attributes.title,
              tasks: []
            }
            }
          )
          let newProject = new Project(newProjectBody)
          console.log(newProject)
          let rendering = newProject.render()
          console.log(rendering)
          let newProjectCard = document.querySelector(".new-project")
          // console.log(newProjectCard)
          newProjectCard.insertAdjacentHTML("beforebegin", rendering)
          e.target.innerText = "add project"
          newProject.initBindingsAndEventListeners()
        })
      } else {
        e.target.contentEditable = "false"
        e.target.innerText = "add project"
      }
    }
  }

  handleProjectTitleClick(e) {
    let target = e.target
    if (target.classList.contains("project-title")) {
      console.log("project title clicked")
      console.log(this)
      target.contentEditable = "true"
      target.focus()
    } else if (target.classList.contains("new-project-title")) {
      console.log("new project clicked")
      console.log(this)
      target.contentEditable = "true"
      target.innerText = ""
      target.focus()
    } else if (target.classList.contains("delete-project")) {
      console.log("delete project clicked")
      var result = confirm("Are you sure you want to delete this project?");
      if (result==true) {
      const projId = target.parentNode.parentNode.parentNode.dataset.id
      this.adapter.deleteProject(projId)}
      target.parentNode.parentNode.parentNode.remove()
    }
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
    let newProjectCard = `
    <div class="project-card new-project" style="height: 40px">
      <div>
        <h2 style="display:inline;" class="new-project-title">add project</h2>
      </div>
    </div>
    `
    this.projectsContainer.insertAdjacentHTML("beforeend", newProjectCard)
  }


}