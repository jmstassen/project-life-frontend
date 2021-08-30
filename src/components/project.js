class Project {
  constructor(projectJSON) {
    this.id = projectJSON.id
    this.title = projectJSON.attributes.title
    this.tasks = projectJSON.attributes.tasks.map(task => new Task(task))
  }

  initBindingsAndEventListeners() {
    this.taskContainer = document.getElementById(`task-container-${this.id}`)
    this.taskLines = document.querySelectorAll(".task-line")
    console.log(this.taskLines)
    this.taskLines.forEach(function(element) {
      element.addEventListener("mouseenter", function() {
          let doNow = this.querySelector(".do-now");
          doNow.classList.remove("hidden");
          doNow.classList.add("visible");
          let waiting = this.querySelector(".waiting");
          waiting.classList.remove("hidden");
          waiting.classList.add("visible");
          let tomorrow = this.querySelector(".tomorrow");
          tomorrow.classList.remove("hidden");
          tomorrow.classList.add("visible");
          let deleteBtn = this.querySelector(".delete");
          deleteBtn.classList.remove("hidden");
          deleteBtn.classList.add("visible");
        })
      element.addEventListener("mouseleave", function() {
        let doNow2 = this.querySelector(".do-now");
        doNow2.classList.add("hidden");
        doNow2.classList.remove("visible");
        let waiting2 = this.querySelector(".waiting");
        waiting2.classList.add("hidden");
        waiting2.classList.remove("visible");
        let tomorrow2 = this.querySelector(".tomorrow");
        tomorrow2.classList.add("hidden");
        tomorrow2.classList.remove("visible");
        let deleteBtn2 = this.querySelector(".delete");
        deleteBtn2.classList.add("hidden");
        deleteBtn2.classList.remove("visible");
      })
    })
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
        <div id="task-line-${task.data.id}" class="task-line">  
          <div class="left-column">  
            <img class="do-now hidden" id="do-now-${task.data.id}" src="img/sharp_arrow_forward_black_24dp.png">
            <img id="check-box-${task.data.id}" src="img/sharp_check_box_outline_blank_black_24dp.png">
            <span class="task-size">${task.data.attributes.size}</span>
          </div>
          <div class="task-text-column">  
            <span class="task-text"> ${task.data.attributes.name}</span>
          </div>  
          <div class="right-column">
            <img class="waiting hidden" id="waiting-${task.data.id}" src="img/sharp_pending_black_24dp.png">
            <img class="tomorrow hidden" id="tomorrow-${task.data.id}" src="img/sharp_snooze_black_24dp.png">
            <img class="delete hidden" id="delete-${task.data.id}" src="img/sharp_delete_forever_black_24dp.png">
          </div>
        </div>
        `
        let projectTaskContainer = document.getElementById(`task-container-${task.data.attributes.project_id}`)
        projectTaskContainer.insertAdjacentHTML("beforeend", taskMarkup)
        let taskLine = document.getElementById(`task-line-${this.id}`)
        taskLine.addEventListener("mouseenter", function() {
            let doNow = this.querySelector(".do-now");
            doNow.classList.remove("hidden");
            doNow.classList.add("visible");
            let waiting = this.querySelector(".waiting");
            waiting.classList.remove("hidden");
            waiting.classList.add("visible");
            let tomorrow = this.querySelector(".tomorrow");
            tomorrow.classList.remove("hidden");
            tomorrow.classList.add("visible");
            let deleteBtn = this.querySelector(".delete");
            deleteBtn.classList.remove("hidden");
            deleteBtn.classList.add("visible");
          })
          taskLine.addEventListener("mouseleave", function() {
            let doNow2 = this.querySelector(".do-now");
            doNow2.classList.add("hidden");
            doNow2.classList.remove("visible");
            let waiting2 = this.querySelector(".waiting");
            waiting2.classList.add("hidden");
            waiting2.classList.remove("visible");
            let tomorrow2 = this.querySelector(".tomorrow");
            tomorrow2.classList.add("hidden");
            tomorrow2.classList.remove("visible");
            let deleteBtn2 = this.querySelector(".delete");
            deleteBtn2.classList.add("hidden");
            deleteBtn2.classList.remove("visible");
          })
      
      })
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