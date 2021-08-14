const endPoint = "http://localhost:3000/api/v1/tasks"

document.addEventListener('DOMContentLoaded', () => {
  getTasks()
})

function getTasks() {
  fetch(endPoint)
  .then(response => response.json())
  .then(tasks => {
    tasks.data.forEach(task => {
      const taskMarkup = `
        <div data-id=${task.id}>
          <span>${task.attributes.size}</span> | <span>${task.attributes.name}</span>
          <span>(in ${task.attributes.project.title})</span>
        </div>`;
      document.querySelector('#task-container').innerHTML += taskMarkup
    })
  })
}