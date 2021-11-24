var toDoItems = []  

function ToDo (description) {
  this.description = description;
  this.complete = false;
}

ToDo.prototype.completeToDo = function(){
  this.complete = true;
}

function buildToDo(todo, index) {  
  var toDoShell = document.createElement('div') 
  toDoShell.classList.add('toDoShell') 
  
  var check = document.createElement('i') 
  check.id = index 
  check.classList.add('fas', 'fa-check') 
  check.addEventListener('click', completeToDo) 

  var toDoText = document.createElement('span') 
  toDoText.innerHTML = todo.description 

  var removeToDo = document.createElement('i') 
  removeToDo.id = index 
  removeToDo.classList.add('fas', 'fa-trash-alt', 'remove') 
  removeToDo.addEventListener('click', deleteToDo) 

  toDoShell.appendChild(check) 
  toDoShell.appendChild(toDoText) 
  toDoShell.appendChild(removeToDo) 

  if (todo.complete) { 
    toDoText.classList.add('completeText') 
    check.classList.add('completeCheck') 
    check.classList.replace('fa-check', 'fa-check-double') 
  }
  return toDoShell
}

function buildToDos(toDos) { 
  var arrayObToDo = toDos.map(buildToDo) 
  return arrayObToDo 
}

function displayToDos() { 
  var toDoContainer = document.querySelector('#toDoContainer') 
  toDoContainer.innerHTML = ""
  var resultado = buildToDos(toDoItems) 
  for (let i = 0; i < resultado.length; i++) {
    toDoContainer.appendChild(resultado[i]) 
  }
}

function addToDo() {
  var valorInput = document.querySelector('#toDoInput').value
  if (valorInput){
    document.querySelector('#noToDos').style.display = 'none';
    var newTodo = new ToDo(valorInput) 
    toDoItems.push(newTodo) 
  }
  document.querySelector('#toDoInput').value = '' 
  displayToDos() 
}

  var boton = document.querySelector('#addButton')
  boton.addEventListener('click', addToDo) 
  
  window.addEventListener('keypress', function(e){
    if (e.which == 13 || e.keyCode == 13) {
      addToDo()
    }
  }) 

function completeToDo(event) {
  const index = event.target.id;  
  toDoItems[index].complete ? toDoItems[index].complete = false : toDoItems[index].completeToDo() 

  displayToDos() 
}

function deleteToDo(event) {
  const index = event.target.id;  
  toDoItems.splice(index, 1) 
  if (toDoItems.length === 0){
    document.querySelector('#noToDos').style.display = 'flex';
  }
  displayToDos() 
}

function mueveReloj(){
  momentoActual = new Date()
  hora = momentoActual.getHours()
  minuto = momentoActual.getMinutes()
  segundo = momentoActual.getSeconds()

  str_segundo = new String (segundo)
  if (str_segundo.length == 1) segundo = "0" + segundo

  str_minuto = new String (minuto)
  if (str_minuto.length == 1) minuto = "0" + minuto

  str_hora = new String (hora)
  if (str_hora > 12) hora = "0" + (hora - 12)
  
  horaImprimible = hora + " : " + minuto + " : " + segundo

  document.querySelector('#reloj').innerHTML = horaImprimible

  setTimeout("mueveReloj()",1000)
}

displayToDos()