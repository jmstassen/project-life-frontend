const endPoint = "http://localhost:3000/api/v1/tasks"

document.addEventListener('DOMContentLoaded', () => {
  fetch(endPoint)
  .then(response => response.json())
  .then(tasks => {
    console.log(tasks);
  })
})
