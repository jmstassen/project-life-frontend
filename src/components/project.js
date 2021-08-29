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
    this.adapter.createTask(nameInput, projectId, status, date, size)
      .then(task => {
        console.log(task)
        let taskMarkup = `
        <div data-id=${task.data.id} class="task-line">  
          <div class="left-column">  
            <span class="material-icons">arrow_forward</span>
            <span class="material-icons">check_box_outline_blank</span>
            <span class="task-size">${task.data.attributes.size}</span>
          </div>
          <div class="task-text-column">  
            <span class="task-text"> ${task.data.attributes.name}</span>
          </div>  
          <div class="right-column">
            <span class="material-icons">more_horiz</span>
            <span class="material-icons">redo</span>
            <span class="material-icons">delete_forever</span>
          </div>
        </div>
        `
        let projectTaskContainer = document.getElementById(`task-container-${task.data.attributes.project_id}`)
        projectTaskContainer.insertAdjacentHTML("beforeend", taskMarkup)})
    document.querySelector(`#input-name-${this.id}`).value = ""
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