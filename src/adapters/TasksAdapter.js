class TasksAdapter {
    constructor() {
      this.baseUrl = 
      'http://localhost:3000/api/v1/tasks'
    }
  
    postFetch(name, project_id, status, date, size) {
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
        .then(response => response.json())
        .then(task => {
            console.log(task)
            const newTask = new Task(task)
            console.log(newTask)
        })
    }
}