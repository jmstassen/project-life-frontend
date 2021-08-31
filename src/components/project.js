class Project {
  constructor(projectJSON) {
    this.id = projectJSON.id
    this.title = projectJSON.attributes.title
    this.tasks = projectJSON.attributes.tasks.map(task => new Task(task))
  }

  initBindingsAndEventListeners() {
    this.taskForm = document.getElementById(`create-task-form-${this.id}`)
    this.taskForm.addEventListener("submit", (e) => this.createTask(e))
    
    this.taskContainer = document.getElementById(`task-container-${this.id}`)
    this.taskContainer.addEventListener("mouseenter", function(e) {
      console.log(e)
      if (e.target.className === "task-line") {
        console.log(this)
        let doNow = e.target.querySelector(".do-now");
        doNow.classList.replace("hidden", "mouseover-visible");
        let waiting = e.target.querySelector(".waiting");
        waiting.classList.replace("hidden", "mouseover-visible");
        let tomorrow = e.target.querySelector(".tomorrow");
        tomorrow.classList.replace("hidden", "mouseover-visible");
        let deleteBtn = e.target.querySelector(".delete");
        deleteBtn.classList.replace("hidden", "mouseover-visible");
      }
    }, true);

    this.taskContainer.addEventListener("mouseleave", function(e) {
      console.log("mouseout")
      if(e.target.className === "task-line") {
        console.log(this)
        let doNow = e.target.querySelector(".do-now");
        doNow.classList.replace("mouseover-visible", "hidden");
        let waiting = e.target.querySelector(".waiting");
        waiting.classList.replace("mouseover-visible", "hidden");
        let tomorrow = e.target.querySelector(".tomorrow");
        tomorrow.classList.replace("mouseover-visible", "hidden");
        let deleteBtn = e.target.querySelector(".delete");
        deleteBtn.classList.replace("mouseover-visible", "hidden");
      }
    }, true);

    this.taskContainer.addEventListener("click", function(e) {
      let target = e.target
      
      console.log(target)
      if (target.classList.contains("do-now")) {
        console.log("do-now clicked")
      } else if (target.classList.contains("check-box")) {
        console.log("check-box clicked")
      } else if (target.classList.contains("task-size")) {
        console.log("task-size clicked")
      } else if (target.classList.contains("task-text")) {
        console.log("task-text clicked")
      } else if (target.classList.contains("waiting")) {
        console.log("waiting clicked")
      } else if (target.classList.contains("tomorrow")) {
        console.log("tomorrow clicked")
      } else if (target.classList.contains("delete")) {
        console.log("delete clicked")
      }
    }, true);
  }
  // initBindingsAndEventListeners() {
  //   this.taskContainer = document.getElementById(`task-container-${this.id}`)
  //   this.taskLines = document.querySelectorAll(".task-line")
  //   console.log(this.taskLines)
  //   this.taskLines.forEach(function(element) {
  //     element.addEventListener("mouseenter", function() {
  //         let doNow = this.querySelector(".do-now");
  //         doNow.classList.remove("hidden");
  //         doNow.classList.add("visible");
  //         let waiting = this.querySelector(".waiting");
  //         waiting.classList.remove("hidden");
  //         waiting.classList.add("visible");
  //         let tomorrow = this.querySelector(".tomorrow");
  //         tomorrow.classList.remove("hidden");
  //         tomorrow.classList.add("visible");
  //         let deleteBtn = this.querySelector(".delete");
  //         deleteBtn.classList.remove("hidden");
  //         deleteBtn.classList.add("visible");
  //       })
  //     element.addEventListener("mouseleave", function() {
  //       let doNow2 = this.querySelector(".do-now");
  //       doNow2.classList.add("hidden");
  //       doNow2.classList.remove("visible");
  //       let waiting2 = this.querySelector(".waiting");
  //       waiting2.classList.add("hidden");
  //       waiting2.classList.remove("visible");
  //       let tomorrow2 = this.querySelector(".tomorrow");
  //       tomorrow2.classList.add("hidden");
  //       tomorrow2.classList.remove("visible");
  //       let deleteBtn2 = this.querySelector(".delete");
  //       deleteBtn2.classList.add("hidden");
  //       deleteBtn2.classList.remove("visible");
  //     })
  //   })
  //   this.taskForm = document.getElementById(`create-task-form-${this.id}`)
  //   console.log(this.taskForm)
  //   this.taskForm.addEventListener("submit", (e) => this.createTask(e))
  // }

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
        let newTaskBody = JSON.parse(JSON.stringify(
          {
            id: task.data.id,
            name: task.data.attributes.name,
            status: task.data.attributes.status,
            size: task.data.attributes.size
          }
        ))
        console.log(newTaskBody)
        let newTask = new Task(newTaskBody)
        console.log(newTask)
        let rendering = newTask.render()
        let projectTaskContainer = document.getElementById(`task-container-${task.data.attributes.project_id}`)
        projectTaskContainer.insertAdjacentHTML("beforeend", rendering)
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