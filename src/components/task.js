class Task {
  constructor(taskJSON) {
    this.id = taskJSON.id
    this.name = taskJSON.name
    this.status = taskJSON.status
    this.size = taskJSON.size
    this.adapter = new TasksAdapter()
  }

  render() {
    let taskMarkup = 
      `
      <div data-id=${this.id} class="task-line">  
        <div class="left-column">  
          <span class="material-icons">arrow_forward</span>
          <span class="material-icons">check_box_outline_blank</span>
          <span class="task-size">${this.size}</span>
        </div>
        <div class="task-text-column">  
          <span class="task-text"> ${this.name}</span>
        </div>  
        <div class="right-column">
          <span class="material-icons">more_horiz</span>
          <span class="material-icons">redo</span>
          <span class="material-icons">delete_forever</span>
        </div>
      </div>
      `
    return taskMarkup
    }

}