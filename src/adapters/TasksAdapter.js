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

    updateTaskStatus(status, id) {
      return fetch(`${this.baseUrl}/${id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json", "Accept": "application/json"},
        body: JSON.stringify({
          status: status,
        })
      })
      .then(res => res.json())
    }

    updateTaskDate(date, id) {
      return fetch(`${this.baseUrl}/${id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json", "Accept": "application/json"},
        body: JSON.stringify({
          date: date,
        })
      })
      .then(res => res.json())
    }

    updateTaskName(name, id) {
      return fetch(`${this.baseUrl}/${id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json", "Accept": "application/json"},
        body: JSON.stringify({
          name: name,
        })
      })
      .then(res => res.json())
    }

    updateTaskSize(size, id) {
      return fetch(`${this.baseUrl}/${id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json", "Accept": "application/json"},
        body: JSON.stringify({
          size: size,
        })
      })
      .then(res => res.json())
    }

    deleteTask(id) {
      return fetch(`${this.baseUrl}/${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json", "Accept": "application/json"}
      })
      .then(res => res.json())
    }
}