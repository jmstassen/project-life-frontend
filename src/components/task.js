class Task {
  constructor(taskJSON) {
    this.id = taskJSON.id
    this.name = taskJSON.name
    this.status = taskJSON.status
    this.size = taskJSON.size
    this.date = taskJSON.date
    this.adapter = new TasksAdapter()
  }

  render() {
    if (this.status === "waiting") {
      this.waitingClass = "waiting visible"
      this.doNowClass = "do-now hidden"
      this.checkBoxClass = "check-box-empty"
      this.checkBoxSrc = "img/sharp_check_box_outline_blank_black_24dp.png";
    } else if (this.status === "do now") {
      this.waitingClass = "waiting hidden"
      this.doNowClass = "do-now visible"
      this.checkBoxClass = "check-box-empty"
      this.checkBoxSrc = "img/sharp_check_box_outline_blank_black_24dp.png";
    } else if (this.status === "done") {
      this.waitingClass = "waiting hidden"
      this.doNowClass = "do-now hidden"
      this.checkBoxClass = "check-box-done"
      this.checkBoxSrc = "img/sharp_check_box_black_24dp.png";
    } else {
      this.waitingClass = "waiting hidden"
      this.doNowClass = "do-now hidden"
      this.checkBoxClass = "check-box-empty"
      this.checkBoxSrc = "img/sharp_check_box_outline_blank_black_24dp.png";
    }
    
    let taskMarkup = 
      `
      <div data-id=${this.id} class="task-line">  
        <div class="left-column">  
          <img class="${this.doNowClass}" id="do-now-${this.id}" src="img/sharp_arrow_forward_black_24dp.png">
          <img class="${this.checkBoxClass}" src="${this.checkBoxSrc}">
          <span class="task-size">${this.size}</span>
        </div>
        <div class="task-text-column">  
          <span class="task-text"> ${this.name}</span>
        </div>  
        <div class="right-column">
          <img class="${this.waitingClass}" id="waiting-${this.id}" src="img/sharp_pending_black_24dp.png">
          <img class="tomorrow hidden" id="tomorrow-${this.id}" src="img/sharp_snooze_black_24dp.png">
          <img class="delete hidden" id="delete-${this.id}" src="img/sharp_delete_forever_black_24dp.png">
        </div>
      </div>
      `
    return taskMarkup
    }

}