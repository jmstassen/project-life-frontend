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
    this.taskContainer.addEventListener("input", this.handleTaskSizeChange.bind(this))
    this.taskContainer.addEventListener("keypress", this.handleTaskNameEnter.bind(this))
    this.taskContainer.addEventListener("focusout", this.handleTaskNameFocusOut.bind(this))
  }

  handleTaskLineClick(e) {
    let target = e.target
    console.log(target)
    if (target.classList.contains("do-now")) {
      console.log("do now clicked")
      if (target.classList.contains("visible")) {
        console.log("visible do now clicked")
        let newStatus = "active"
        const taskId = target.parentNode.parentNode.dataset.id
        this.adapter.updateTaskStatus(newStatus, taskId)
        let waitingSibling = target.parentNode.parentNode.querySelector(".waiting")
        let checkBoxSibling = target.parentNode.querySelector(".check-box")
        checkBoxSibling.src = "./img/sharp_check_box_outline_blank_black_24dp.png"
        waitingSibling.classList.add("hidden")
        waitingSibling.classList.remove("visible")
        checkBoxSibling.classList.add("empty")
        checkBoxSibling.classList.remove("done")
        target.classList.add("hidden")
        target.classList.remove("visible")
      } else {
        console.log("hidden do now clicked")
        let newStatus = "do now"
        const taskId = target.parentNode.parentNode.dataset.id
        this.adapter.updateTaskStatus(newStatus, taskId)
        let waitingSibling = target.parentNode.parentNode.querySelector(".waiting")
        let checkBoxSibling = target.parentNode.querySelector(".check-box")
        checkBoxSibling.src = "./img/sharp_check_box_outline_blank_black_24dp.png"
        waitingSibling.classList.add("hidden")
        waitingSibling.classList.remove("visible")
        checkBoxSibling.classList.add("empty")
        checkBoxSibling.classList.remove("done")
        target.classList.add("visible")
        target.classList.remove("hidden")
      }
    } else if (target.classList.contains("check-box")) {
      console.log("check box clicked")
      if (target.classList.contains("empty")) {
        console.log("empty check box clicked")
        let newStatus = "done"
        const taskId = target.parentNode.parentNode.dataset.id
        this.adapter.updateTaskStatus(newStatus, taskId)
        let waitingSibling = target.parentNode.parentNode.querySelector(".waiting")
        let doNowSibling = target.parentNode.parentNode.querySelector(".do-now")
        target.src="./img/sharp_check_box_black_24dp.png"
        target.classList.add("done")
        target.classList.remove("empty")
        waitingSibling.classList.add("hidden")
        waitingSibling.classList.remove("visible")
        doNowSibling.classList.add("hidden")
        doNowSibling.classList.remove("visible")
      } else {
        console.log("done check box clicked")
        let newStatus = "active"
        const taskId = target.parentNode.parentNode.dataset.id
        this.adapter.updateTaskStatus(newStatus, taskId)
        let waitingSibling = target.parentNode.parentNode.querySelector(".waiting")
        let doNowSibling = target.parentNode.parentNode.querySelector(".do-now")
        target.src = "./img/sharp_check_box_outline_blank_black_24dp.png"
        target.classList.add("empty")
        target.classList.remove("done")
        waitingSibling.classList.add("hidden")
        waitingSibling.classList.remove("visible")
        doNowSibling.classList.add("hidden")
        doNowSibling.classList.remove("visible")
      }
    } else if (target.classList.contains("waiting")) {
      console.log("waiting clicked")
      if (target.classList.contains("visible")) {
        console.log("visible waiting clicked")
        let newStatus = "active"
        const taskId = target.parentNode.parentNode.dataset.id
        this.adapter.updateTaskStatus(newStatus, taskId)
        let checkBoxSibling = target.parentNode.parentNode.querySelector(".check-box")
        console.log(checkBoxSibling)
        let doNowSibling = target.parentNode.parentNode.querySelector(".do-now")
        checkBoxSibling.src = "./img/sharp_check_box_outline_blank_black_24dp.png"
        checkBoxSibling.classList.add("empty")
        checkBoxSibling.classList.remove("done")
        doNowSibling.classList.add("hidden")
        doNowSibling.classList.remove("visible")
        target.classList.add("hidden")
        target.classList.remove("visible")
      } else {
        console.log("hidden waiting clicked")
        let newStatus = "waiting"
        const taskId = target.parentNode.parentNode.dataset.id
        this.adapter.updateTaskStatus(newStatus, taskId)
        let checkBoxSibling = target.parentNode.parentNode.querySelector(".check-box")
        console.log(checkBoxSibling)
        let doNowSibling = target.parentNode.parentNode.querySelector(".do-now")
        checkBoxSibling.src = "./img/sharp_check_box_outline_blank_black_24dp.png"
        checkBoxSibling.classList.add("empty")
        checkBoxSibling.classList.remove("done")
        doNowSibling.classList.add("hidden")
        doNowSibling.classList.remove("visible")
        target.classList.add("visible")
        target.classList.remove("hidden")
      }
    } else if (target.classList.contains("task-size")) {
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
      <select class="new-size" >
        <option value="0" ${zeroSelected}>0</option>
        <option value="1" ${oneSelected}>1</option>
        <option value="2" ${twoSelected}>2</option>
        <option value="3" ${threeSelected}>3</option>
        <option value="5" ${fiveSelected}>5</option>
        <option value="8" ${eightSelected}>8</option>
        <option value="13" ${thirteenSelected}>13</option>
      </select>
      `
    } else if (target.classList.contains("task-text")) {
      console.log("task-text clicked")
      console.log(this)
      target.contentEditable = "true"
      target.focus()
    } else if (target.classList.contains("tomorrow")) {
      const today = new Date().toISOString().slice(0,10)
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      let newDate = tomorrow.toISOString().slice(0,10)
      console.log("tomorrow clicked")
      const taskId = target.parentNode.parentNode.dataset.id
      console.log(taskId)
      this.adapter.updateTaskDate(newDate, taskId)
      target.parentNode.parentNode.remove()
    } else if (target.classList.contains("delete")) {
      console.log("delete clicked")
      var result = confirm("Are you sure you want to delete this task?");
      if (result==true) {
      console.log(this)
      const taskId = target.parentNode.parentNode.dataset.id
      this.adapter.deleteTask(taskId)}
      target.parentNode.parentNode.remove()
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
    if (e.target.classList.contains("task-text")) {
    console.log("task name focus out")
    console.log(this)
    e.target.contentEditable = "false"
    const newName = e.target.innerText
    const taskId = e.target.parentNode.parentNode.dataset.id
    console.log(taskId)
    this.adapter.updateTaskName(newName, taskId)}
  }

  handleTaskSizeChange(e) {
    console.log("size changed")
    console.log(this)
    let element = e.target.parentNode
    console.log(element)
    element.style.cssFloat = "none"
    const newSize = e.target[e.target.selectedIndex].value
    console.log(newSize)
    const taskId = e.target.parentNode.parentNode.parentNode.dataset.id
    this.adapter.updateTaskSize(newSize, taskId)
    // UPDATE DISPLAY HERE
    e.target.parentNode.innerHTML = `${newSize}`
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
    if (nameInput !== "") { 
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
            size: task.data.attributes.size,
            projectId: task.data.attributes.project_id
            }
          )
          let newTask = new Task(newTaskBody)
          let rendering = newTask.render()
          let projectTaskContainer = document.getElementById(`task-container-${task.data.attributes.project_id}`)
          projectTaskContainer.insertAdjacentHTML("beforeend", rendering)
          })
    document.querySelector(`#input-name-${this.id}`).value = ""
        }
  }

  render() {
    let projectMarkup =
      `
      <div class="project-card" data-id="${this.id}">
        <div class="project-header" style="margin:auto;">
          <span><h2 style="display:inline;" class="project-title">${this.title}</h2><img style="float: right" class="delete-project hidden" id="delete-${this.id}" src="img/sharp_delete_forever_black_24dp.png"></span>
        </div>
        <div id="task-container-${this.id}">
      `  
    this.tasks.forEach(task => {
      console.log(task)  
      if (new Date(task.date) <= new Date())
        {
        let taskMarkup = task.render()
        projectMarkup += taskMarkup
      }
    })
    const projectNewTaskFormMarkup =  
      `
      </div>
        <div class="form-container">
        <br>  
        <form id="create-task-form-${this.id}">
            <input id='input-name-${this.id}' type="text" name="name" class="input-text" autocomplete="off"> 
            <input id='create-button' type="submit" name="submit" value="add task" class="submit">
          </form>
        </div>
      </div>      
      `
    projectMarkup += projectNewTaskFormMarkup
    return projectMarkup
  }
}