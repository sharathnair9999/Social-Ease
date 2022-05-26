
<div align="center">

   # [Kaam Se Kaam](https://kaam-se-kaam.netlify.app/)
KaamSeKaam is a Pomodoro Application to Add , Update, Delete Tasks of yours and set timers for each task in order to stay accountable to complete them. Check it out
</div>

#### Stack Used

- React
- Firebase : Authentication , Firestore Database
- [Nothing UI](https://nothing-ui-library.netlify.app/)- Component Library
- Javascript
- CSS

#### Built With -

- Context API + useReducer
- [React Router v6](https://reactrouter.com/docs/en/v6/getting-started/overview)
- [Firebase - Authentication , Database](https://firebase.google.com/)

#### Packages Used - 
 - [react-toastify](https://www.npmjs.com/package/react-toastify) - to show toast text on hover
 - [react-beautiful-dnd](https://www.npmjs.com/package/react-beautiful-dnd) - to drag and drop tasks from one container to another
 - [react-canvas-confetti](https://www.npmjs.com/package/react-canvas-confetti) - to show party poppers after completing a task
 - [react-circular-progressbar](https://www.npmjs.com/package/react-circular-progressbar)
 - [react-icons](https://react-icons.github.io/react-icons/) - for icons

#### How To Run in Local - 
Run these commands in your terminal
 ```
 git clone https://github.com/sharathnair9999/KaamSeKaam.git
 cd ./KaamSeKaam
 npm install
```

- Go To [Firebase](https://firebase.google.com/)
- Create A Project [refer here](https://www.youtube.com/watch?v=2yNyiW_41H8)
- Add `.env` file to the root directory
- Place all your app related keys from the created firebase project and place it in the `.env` as below 

```
REACT_APP_API_KEY=<your key>
REACT_APP_AUTH_DOMAIN=<your domain>
REACT_APP_PROJECT_ID=<your project id>
REACT_APP_STORAGE_BUCKET=<your storage bucket>
REACT_APP_MESSAGING_SENDER_ID=<your sender id>
REACT_APP_APP_ID= <your app id>
```
After that Run in your local with this command. 

`npm start`

And now this application runs in your local machine too. 

# Features

- Authentication: 
    - User Signup 
    - User Login (Email, Password || Login as Anonymous User)
    - Logout
    - Protected Routes
    - Public Routes

### Public Routes

- Landing Page
- Login
- Signup

### Private Routes

- All Tasks Listing Page
		- User Info on top
		- Pending Tasks
		- Completed Tasks
		- Drag and Drop Feature between Completed and Pending Tasks
		- Add New Task with Task Details, Task Duration, Long Break Time, Short Break Time
		- Edit Task
		- Delete Task
		- Update Task

- Single Task Page
	- Timer for task time countdown
	- Task Details and Guidelines how to complete the task
	- Short Break ( cannot take before completing 25% of the task )
	- Long Break (Cannot take before completing 50% of the task)
	- Start/Pause/Reset task timer
	- Party Poppers and claps after completing the task successfully. 
	- Delete Task from the Single task page
	- Move Completed Tasks to pending tasks
	- Timer is disabled for completed tasks

