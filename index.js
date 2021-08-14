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
        <span class="material-icons md-48">arrow_forward</span>  
        <span style="font-family:Cutive Mono;font-size: xxx-large;">${task.attributes.size} </span> <span style="font-family:Cutive Mono;font-size: xx-large;"> ${task.attributes.name}</span>
          <span>(in ${task.attributes.project.title})</span><span class="material-icons md-48">more_horiz</span>
          <span class="material-icons md-48">redo</span>
          <span class="material-icons md-48">more_horiz</span>
        </div>`;
      document.querySelector('#task-container').innerHTML += taskMarkup
    })
  })
}