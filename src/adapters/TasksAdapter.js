class TasksAdapter {
    constructor() {
      this.baseUrl = 
      'http://localhost:3000/api/v1/tasks'
    }
  
    createTask(name, project_id, status, date, size) {
        return fetch(this.baseUrl, {
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
    }

    updateTaskName(name, id) {
      return fetch(`${this.baseUrl}/id`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json", "Accept": "application/json"},
        body: JSON.stringify({
          name: name,
        })
      })
      .then(res => res.json())
    }
}