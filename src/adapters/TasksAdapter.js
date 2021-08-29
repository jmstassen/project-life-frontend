class TasksAdapter {
    constructor() {
      this.baseUrl = 
      'http://localhost:3000/api/v1/tasks'
    }
  
    createTask(name, project_id, status, date, size) {
        fetch(this.baseUrl, {
          method: "POST",
          headers: {"Content-Type": "application/json", "Accept": "application/json"},
          body: JSON.stringify({
            name: name,
            project_id: project_id,
            status: status,
            date: date,
            size: size
          })
        })
        .then(res => res.json())
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
          projectTaskContainer.insertAdjacentHTML("beforeend", taskMarkup)
        })
    }
}