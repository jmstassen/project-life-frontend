class Project {
  constructor(projectJSON) {
    this.id = projectJSON.id
    this.title = projectJSON.attributes.title
    this.tasks = projectJSON.attributes.tasks.map(task => new Task(task))
    this.adapter = new TasksAdapter()
  }

  initBindingsAndEventListeners() {
    this.taskForm = document.getElementById(`create-task-form-${this.id}`)
    this.taskContainer = document.getElementById(`task-container-${this.id}`)
    
    this.taskForm.addEventListener("submit", (e) => this.createTask(e))
    this.taskContainer.addEventListener("mouseenter", this.handleTaskLineMouseEnter.bind(this), true);
    this.taskContainer.addEventListener("mouseleave", this.handleTaskLineMouseLeave.bind(this), true);
    this.taskContainer.addEventListener("click", this.handleTaskLineClick.bind(this), true);
    this.taskContainer.addEventListener("change", this.handleTaskSizeChange.bind(this))
    this.taskContainer.addEventListener("keypress", this.handleTaskNameEnter.bind(this))
    this.taskContainer.addEventListener("focusout", this.handleTaskNameFocusOut.bind(this))
  }

  handleTaskLineClick(e) {
    let target = e.target
    if (target.classList.contains("do-now")) {
      console.log("do-now clicked")
      let task_id_array = target.id.split("-")
      let task_id = task_id_array[task_id_array.length - 1]
      console.log(task_id)
      console.log(this)
      // UPDATE STATUS HERE
    } else if (target.classList.contains("check-box")) {
      console.log("check-box clicked")
      console.log(this)
      // UPDATE STATUS HERE
    } else if (target.classList.contains("task-size")) {
      e.stopPropagation()
      console.log(this)
      target.style.cssFloat = "right"
      let oldSize = target.innerHTML
      let zeroSelected = ""
      let oneSelected = ""
      let twoSelected = ""
      let threeSelected = ""
      let fiveSelected = ""
      let eightSelected = ""
      let thirteenSelected = ""
      if (oldSize === "0") {
        zeroSelected = "selected"
      } else if (oldSize === "1") {
        oneSelected = "selected"
      } else if (oldSize === "2") {
        twoSelected = "selected"
      } else if (oldSize === "3") {
        threeSelected = "selected"
      } else if (oldSize === "5") {
        fiveSelected = "selected"
      } else if (oldSize === "8") {
        eightSelected = "selected"
      } else if (oldSize === "13") {
        thirteenSelected = "selected"
      }
      console.log("task-size clicked")
      target.innerHTML = 
      `
      <select id="new-size" >
        <option value="0" ${zeroSelected}>0</option>
        <option value="1" ${oneSelected}>1</option>
        <option value="2" ${twoSelected}>2</option>
        <option value="3" ${threeSelected}>3</option>
        <option value="5" ${fiveSelected}>5</option>
        <option value="8" ${eightSelected}>8</option>
        <option value="13" ${thirteenSelected}>13</option>
      </select>
      `
      // target.addEventListener('change', function (e) {
      //   console.log("task size change")
      //   console.log(this)  
      //   // UPDATE TASK SIZE HERE
      //   }
      // )
    } else if (target.classList.contains("task-text")) {
      console.log("task-text clicked")
      console.log(this)
      target.contentEditable = "true"
      target.focus()
      // target.addEventListener('keypress', function (e) {
      //   if (e.key === 'Enter') {
      //     console.log("task name enter")
      //     target.contentEditable = "false"
      //   }
      // })
      // target.addEventListener('blur', function (e) {
      //     console.log("task name focus out")
      //     console.log(this)
      //     target.contentEditable = "false"
      //     const newName = target.innerText
      //     // this.adapter 
      // })
    } else if (target.classList.contains("waiting")) {
      console.log("waiting clicked")
      console.log(this)
      // UPDATE STATUS HERE
    } else if (target.classList.contains("tomorrow")) {
      console.log("tomorrow clicked")
      console.log(this)
      // UPDATE DATE HERE
    } else if (target.classList.contains("delete")) {
      console.log("delete clicked")
      console.log(this)
      // DELETE TASK HERE
    }
  };

  handleTaskNameEnter(e) {
    if (e.key === 'Enter') {
      console.log("task name enter")
      console.log(this)
      e.target.contentEditable = "false"
    }
  }

  handleTaskNameFocusOut(e) {
    console.log("task name focus out")
    console.log(this)
    e.target.contentEditable = "false"
  }

  handleTaskSizeChange(e) {
    console.log("size changed")
    console.log(this)
  }

  handleTaskLineMouseEnter(e) {
    if (e.target.className === "task-line") {
      let doNow = e.target.querySelector(".do-now");
      doNow.classList.replace("hidden", "mouseover-visible");
      let waiting = e.target.querySelector(".waiting");
      waiting.classList.replace("hidden", "mouseover-visible");
      let tomorrow = e.target.querySelector(".tomorrow");
      tomorrow.classList.replace("hidden", "mouseover-visible");
      let deleteBtn = e.target.querySelector(".delete");
      deleteBtn.classList.replace("hidden", "mouseover-visible");
    }
  }

  handleTaskLineMouseLeave(e) {
    if(e.target.className === "task-line") {
      let doNow = e.target.querySelector(".do-now");
      doNow.classList.replace("mouseover-visible", "hidden");
      let waiting = e.target.querySelector(".waiting");
      waiting.classList.replace("mouseover-visible", "hidden");
      let tomorrow = e.target.querySelector(".tomorrow");
      tomorrow.classList.replace("mouseover-visible", "hidden");
      let deleteBtn = e.target.querySelector(".delete");
      deleteBtn.classList.replace("mouseover-visible", "hidden");
    }
  }

  createTask(e) {
    e.preventDefault()
    const nameInput = document.querySelector(`#input-name-${this.id}`).value
    const date = new Date().toISOString().slice(0, 10)
    const status = "active"
    const projectId = `${this.id}`
    const size = "0"
    this.adapter.createTask(nameInput, projectId, status, date, size)
      .then(task => {
        let newTaskBody = (
          {
            id: task.data.id,
            name: task.data.attributes.name,
            status: task.data.attributes.status,
            size: task.data.attributes.size
          }
        )
        let newTask = new Task(newTaskBody)
        let rendering = newTask.render()
        let projectTaskContainer = document.getElementById(`task-container-${task.data.attributes.project_id}`)
        projectTaskContainer.insertAdjacentHTML("beforeend", rendering)
          })
    document.querySelector(`#input-name-${this.id}`).value = ""
  }

  render() {
    let projectMarkup =
      `
      <div class="project-card">
        <div class="project-header">
          <h2>${this.title}</h2>
        </div>
        <div id="task-container-${this.id}">
      `  
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