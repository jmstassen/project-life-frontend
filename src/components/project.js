class Project {
  constructor(projectJSON) {
    this.id = projectJSON.id
    this.title = projectJSON.attributes.title
    this.tasks = projectJSON.attributes.tasks.map(task => new Task(task))
  }

  render() {
    console.log(this.title)
    let projectMarkup =
      `
      <div class="project-card">
        <div class="project-header">
          <h2>${this.title}</h2>
        </div>
        <div id="task-container">
      `  
    const projectTaskMarkup = this.tasks.forEach(task => {
        let taskMarkup = task.render()
        projectMarkup += taskMarkup
    })
    const projectNewTaskFormMarkup =  
      `
      </div>
        <div id="form-container">
          <form class="create-task-form" data-id="${this.id}">
            <input id='input-name' type="text" name="name" value="" class="input-text"> 
            <input id='create-button' type="submit" name="submit" value="create task" class="submit">
          </form>
        </div>
      </div>      
      `
    projectMarkup += projectNewTaskFormMarkup
    return projectMarkup
  }
}