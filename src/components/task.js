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
      <div id="task-line-${this.id}" class="task-line">  
        <div class="left-column">  
          <img class="do-now hidden" id="do-now-${this.id}" src="img/sharp_arrow_forward_black_24dp.png">
          <img src="img/sharp_check_box_outline_blank_black_24dp.png">
          <span class="task-size">${this.size}</span>
        </div>
        <div class="task-text-column">  
          <span class="task-text"> ${this.name}</span>
        </div>  
        <div class="right-column">
          <img class="waiting hidden" id="waiting-${this.id}" src="img/sharp_pending_black_24dp.png">
          <img class="tomorrow hidden" id="tomorrow-${this.id}" src="img/sharp_snooze_black_24dp.png">
          <img class="delete hidden" id="delete-${this.id}" src="img/sharp_delete_forever_black_24dp.png">
        </div>
      </div>
      `
    return taskMarkup
    }

}