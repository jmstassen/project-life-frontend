class Project {
  constructor(projectJSON) {
    this.id = projectJSON.id
    this.title = projectJSON.attributes.title
    this.tasks = projectJSON.attributes.tasks.map(task => new Task(task))
  }

  initBindingsAndEventListeners() {
    this.taskContainer = document.getElementById(`task-container-${this.id}`)
    this.taskForm = document.getElementById(`create-task-form-${this.id}`)
    console.log(this.taskForm)
    this.taskForm.addEventListener("submit", (e) => this.createTask(e))
  }

  createTask(e) {
    e.preventDefault()
    console.log('task is being created')
    const nameInput = document.querySelector(`#input-name-${this.id}`).value
    const date = new Date().toISOString().slice(0, 10)
    const status = "active"
    const projectId = `${this.id}`
    const size = "0"
    this.adapter = new TasksAdapter()
    this.adapter.postFetch(nameInput, projectId, status, date, size)
  }

  render() {
    console.log(this.title)
    let projectMarkup =
      `
      <div class="project-card">
        <div class="project-header">
          <h2>${this.title}</h2>
        </div>
        <div id="task-container-${this.id}">
      `  
    // const projectTaskMarkup = 
    this.tasks.forEach(task => {
        let taskMarkup = task.render()
        projectMarkup += taskMarkup
    })
    const projectNewTaskFormMarkup =  
      `
      </div>
        <div id="form-container">
          <form id="create-task-form-${this.id}">
            <input id='input-name-${this.id}' type="text" name="name" value="" class="input-text"> 
            <input id='create-button' type="submit" name="submit" value="create task" class="submit">
          </form>
        </div>
      </div>      
      `
    projectMarkup += projectNewTaskFormMarkup
    return projectMarkup
  }
}