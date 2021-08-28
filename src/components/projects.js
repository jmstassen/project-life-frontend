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
          projects.data.forEach(project => this.projects.push(new Project(project)))
      })
      .then(() => {
          this.render()
      })
  }

  render() {
    const projectsContainer = document.getElementById('projects-container')
    console.log(this.projects)
    this.projects.forEach(project => {
        const projectMarkup = project.render()
        projectsContainer.innerHTML += projectMarkup
    })


    // const projectHeaderMarkup = 
    //   `
    //   <div class="project-card">
    //     <div class="project-header">
    //       <h2>Project title</h2>
    //     </div>
    //     <div id="task-container">
    //   `  
    // const projectTaskMarkup = ""
      
      

    // const projectNewTaskFormMarkup =  
    //   `</div>
    //     <div id="form-container">
    //       <form id="create-task-form">
    //         <input id='input-name' type="text" name="name" value="" class="input-text"> 
    //         <input id='create-button' type="submit" name="submit" value="create task" class="submit">
    //       </form>
    //     </div>
    //   </div>      
    //   `
    // projectsContainer.innerHTML += projectHeaderMarkup
    // projectsContainer.innerHTML += projectNewTaskFormMarkup
  }


}