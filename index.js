const endPoint = "http://localhost:3000/api/v1/tasks"

document.addEventListener('DOMContentLoaded', () => {
  getTasks()

  const createTaskForm = document.querySelector("#create-task-form")

  createTaskForm.addEventListener("submit", (e) => createFormHandler(e))
})

function getTasks() {
  fetch(endPoint)
  .then(response => response.json())
  .then(tasks => {
    tasks.data.forEach(task => {
      const taskMarkup = `
        <div data-id=${task.id}>
        <span class="material-icons md-48">arrow_forward</span><span class="material-icons md-48">check_box_outline_blank</span><span class="material-icons md-48">check_box</span>  
        <span style="font-family:Cutive Mono;font-size: 40px;">${task.attributes.size} </span> <span style="font-family:Cutive Mono;font-size: 40px;"> ${task.attributes.name}</span>
          <span style="font-size: 40px;">(in ${task.attributes.project.title})</span><span class="material-icons md-48">more_horiz</span>
          <span class="material-icons md-48">redo</span>
          <span class="material-icons md-48">arrow_upward</span>
          <span class="material-icons md-48">arrow_downward</span>
        </div>`;
      document.querySelector('#task-container').innerHTML += taskMarkup
    })
  })
}

function createFormHandler(e) {
  e.preventDefault()
  const nameInput = document.querySelector('#input-name').value
  postFetch(nameInput)
}

function postFetch(name) {
  fetch(endPoint, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: name,
      project_id: 1,
      status: "active",
      date: new Date().toISOString().slice(0, 10)
    })
  })
  .then(response => response.json())
  .then(task => {
    console.log(task);
  })

}