
This is a task manager app that has different project cards where you can list different tasks. Add or delete projects or tasks, or edit the content of either.
Tasks can have a status of active, do now, waiting, or done, and there is also an ability to snooze a task so it reappears tomorrow.

There are two repos that go together:
Backend (https://github.com/jmstassen/project-life-backend)
Frontend (this one)

How to install:
git clone the backend repo to your local folder
git clone the frontend repo to the same local folder (so your local folder will contain 2 folders, 1 for front end, 1 for backend)

in backend folder:
 1. $ rails db:create
 2. $ rails db:migrate
 2. $ rails s

in frontend folder:
 $ open index.html
