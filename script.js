document.addEventListener('DOMContentLoaded',()=>{
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if(savedTasks){
        savedTasks.forEach((task)=>{
            tasks.push(task);
            updateTaskList();
        updateStats();
        });
        
    }
});


var icon = document.getElementById('icon');
icon.onclick =()=>{
  console.log(icon);
  document.body.classList.toggle('white-theam');
  if(document.body.classList.contains('white-theam')){
    icon.src="./moon.png";
  }else{
    icon.src="./sun.png";
  }
  console.log(icon);
}
   
 
let tasks = [];

const saveTasks = ()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

const taskInput = document.getElementById('taskinput');

const addTask=()=>{
    const text = taskInput.value.trim();

    if(text){
        tasks.push({text:text, completed:false});
        taskInput.value='';
        updateTaskList();
        updateStats();
        saveTasks();
    }
};

const toggleTaskComplete = (index)=>{
    tasks[index].completed=!tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTasks();
};

const deleteTask = (index)=>{
    tasks.splice(index,1);
    updateTaskList();
    updateStats();
    saveTasks();
}

const updateStats = ()=>{
    const completedTasks = tasks.filter(task=>task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completedTasks/totalTasks)*100;
    const progressBar =document.getElementById('progress');
    progressBar.style.width = `${progress}%`;

    document.getElementById('numbers').innerText=`${completedTasks}/${totalTasks}`;

    if(tasks.length && completedTasks === totalTasks){
        blastConfetti();
    }
}

const editTask =(index)=>{
    taskInput.value=tasks[index].text;
    tasks.splice(index,1);
    updateTaskList();
    updateStats();
    saveTasks();
}

const updateTaskList = ()=>{
    const taskList = document.getElementById('task-list');
    taskList.innerHTML='';

    tasks.forEach((task,index)=>{
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class="taskItem">
        <div class="task ${task.completed ?'completed':''}">
        <input type="checkbox" class="checkbox" ${
            task.completed ? "checked":"" }/>
        <p>${task.text}</p>
        </div>
        <div class="icons">
        <img src="./edit.png" onClick="editTask(${index})"/>
        <img src="./bin.png" onClick="deleteTask(${index})"/>
        </div>
        </div>`;
        listItem.addEventListener('change',()=>toggleTaskComplete(index))
        taskList.append(listItem);
    });
};
document.getElementById('newTask').addEventListener('click',function(e){
    e.preventDefault();

    addTask();
});




const blastConfetti = ()=>{
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}
