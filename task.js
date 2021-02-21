const pendingList = document.getElementById("js-pending"),
  finishedList = document.getElementById("js-finished"),
  taskform = document.getElementById("todoForm"),
  taskinput = taskform.querySelector("input");
const PENDING = "PENDING",
  FINISHED = "FINISHED";

let pendingTasks, finishedTasks;

function getTaskObject(text){
  return {
    id:String(Date.now()),
    text:text
  };
}
function savePendingTask(task){
  pendingTasks.push(task);
}
function removeFromPending(taskId){
  pendingTasks = pendingTasks.filter(function(task){
    return task.id !== taskId;
  });
}
function removeFromFinished(taskId){
  finishedTasks = finishedTasks.filter(function(task){
    return task.id !== taskId;
  });
}
function addToFinished(task){
  finishedTasks.push(task);
};
function addToPending(task){
  pendingTasks.push(task);
};
function deleteTask(e){
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  removeFromFinished(li.id);
  removeFromPending(li.id);
  saveState();
}
function findInPending(taskId){
  return pendingTasks.find(function(task){
    return task.id === taskId;
  });
}
function findInFinished(taskId){
  return finishedTasks.find(function(task){
    return task.id === taskId;
  });
}
function removeFromPending(taskId){
  pendingTasks = pendingTasks.filter(function(task){
    return task.id !== taskId;
  });
}
function removeFromFinished(taskId){
  finishedTasks = finishedTasks.filter(function(task){
    return task.id !== taskId;
  });
}
function handleFinishClick(e){
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  const task = findInPending(li.id);
  removeFromPending(li.id);
  addToFinished(task);
  paintFinishedTask(task);
  saveState();
}
function buildGenericLi(task){
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  span.innerText = task.text;
  delBtn.innerText="❌";
  delBtn.addEventListener("click", deleteTask);
  li.append(span, delBtn);
  li.id = task.id;
  return li;
}
function paintPendingTask(task){
  const genericLi = buildGenericLi(task);
  const completeBtn = document.createElement("button");
  completeBtn.innerText = "✅";
  completeBtn.addEventListener("click", handleFinishClick);
  genericLi.append(completeBtn);
  pendingList.append(genericLi);
}
function paintFinishedTask(task){
  const genericLi = buildGenericLi(task);
  const backBtn = document.createElement("button");
  backBtn.innerText = "⏪";
  backBtn.addEventListener("click", handleBackClick);
  genericLi.append(backBtn);
  finishedList.append(genericLi);
}
function handleBackClick(e){
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  const task = findInFinished(li.id);
  removeFromFinished(li.id);
  addToPending(task);
  paintPendingTask(task);
  saveState();
}
function saveState(){
  localStorage.setItem(PENDING, JSON.stringify(pendingTasks));
  localStorage.setItem(FINISHED, JSON.stringify(finishedTasks));
}
function loadState(){
  pendingTasks = JSON.parse(localStorage.getItem(PENDING)) || [];
  finishedTasks = JSON.parse(localStorage.getItem(FINISHED)) || [];
}
function restoreState(){
  pendingTasks.forEach(function(task){
    paintPendingTask(task);
  });
  finishedTasks.forEach(function(task){
    paintFinishedTask(task);
  })
}
function handleSubmit(e){
  e.preventDefault();
  const taskObj = getTaskObject(taskinput.value);
  taskinput.value="";
  paintPendingTask(taskObj);
  savePendingTask(taskObj);
  saveState();
}
function init(){
  taskform.addEventListener("submit", handleSubmit);
  loadState();
  restoreState();
}
init();



















