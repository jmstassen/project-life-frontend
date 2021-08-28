const app = new App()



// const endPoint = "http://localhost:3000/api/v1/tasks"

// document.addEventListener('DOMContentLoaded', () => {
//   getTasks()
//   const createTaskForm = document.querySelector("#create-task-form")
//   createTaskForm.addEventListener("submit", (e) => createFormHandler(e))
// })

// function getTasks() {
//   fetch(endPoint)
//   .then(response => response.json())
//   .then(tasks => {
//     tasks.data.forEach(task => {
//       const taskMarkup = `
//         <div data-id=${task.id} class="task-line">  
//           <div class="left-column">  
//             <span class="material-icons">arrow_forward</span>
//             <span class="material-icons">check_box_outline_blank</span>
//             <span class="task-size">${task.attributes.size}</span>
//           </div>
//           <div class="task-text-column">  
//             <span class="task-text"> ${task.attributes.name}</span>
//           </div>  
//           <div class="right-column">
//             <span class="material-icons">more_horiz</span>
//             <span class="material-icons">redo</span>
//             <span class="material-icons">delete_forever</span>
//           </div>
//         </div>`;
//       document.querySelector('#task-container').innerHTML += taskMarkup;
//     })
//   })
// }

// function createFormHandler(e) {
//   e.preventDefault()
//   const nameInput = document.querySelector('#input-name').value
//   const date = new Date().toISOString().slice(0, 10)
//   const status = "active"
//   const projectId = 1
//   const size = "0"
//   postFetch(nameInput, projectId, status, date, size)
// }

// function postFetch(name, project_id, status, date, size) {
//   fetch(endPoint, {
//     method: "POST",
//     headers: {"Content-Type": "application/json", "Accept": "application/json"},
//     body: JSON.stringify({
//       name: name,
//       project_id: project_id,
//       status: status,
//       date: date,
//       size: size
//     })
//   })
//   .then(response => response.json())
//   .then(task => {
//     const taskData = task.data
//     const taskMarkup = `
//       <div data-id=${taskData.id}>
//         <span class="material-icons">arrow_forward</span><span class="material-icons">check_box_outline_blank</span>
//         <span style="font-family:Cutive Mono;font-size: 30px;">${taskData.attributes.size} </span> <span class="task-text"> ${taskData.attributes.name}</span>
//         <span class="material-icons">more_horiz</span>
//         <span class="material-icons">redo</span>
//         <span class="material-icons">delete_forever</span>
//     </div>`;
//     document.querySelector('#task-container').innerHTML += taskMarkup;
//   })
// }