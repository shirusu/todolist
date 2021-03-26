//CRUD - CREATE READ UPDATE DELETE


//Poluchaem vse elementy iz html
let todoName = document.querySelector('.task-name')
let addBtn = document.querySelector('.add-todo')
let todoBlock = document.querySelector('.todos')
let clearAll = document.querySelector('.clear-all')

//Dobavlyaem delo pri klike na knopku dobavit'
addBtn.addEventListener('click', () => addTodo())

//Obrabotka sobytiya pri klike na knopku Ochistit' vse
clearAll.addEventListener('click', () => clear())

//Dobavlayem delo pri klike na enter
todoName.addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
       addTodo()
    }
})

//Poluchaem vse dannyie iz localStorage, elsi ih tam net, to daem noviy massiv
function getTodos(){
    return JSON.parse(localStorage.getItem('todos')) || ['Example item']
}

//Zapuskaem pri klike na knopku dobavit
function addTodo(){
    //berem danniye iz inputa
let newTodo = todoName.value
    //proveryem na pustotu
    if(newTodo.length > 0){
        //poluchaem danniye iz localStorage i sozdaem massiv, v kotorom vse iz etogo hranilishya i cherez
        //zapyatuyu znacheniye iz input
        let todos = getTodos()
        todos = [...todos, newTodo]
        //zapisyvaem obnovlenniy massiv v localStorage
        localStorage.setItem('todos', JSON.stringify(todos))
        //Pererisovyvaem spisok
        view()
        //chistim input
        todoName.value = ''
    }
}
//otrisovka spiska na stranitsu
function view(){
    let tasks = getTodos()
    let list = ''
    //Perebiraem massiv so vsemi delami i skladyvaem <li> v peremennuyu list v vide stroki
    tasks.forEach(item => list = list + `<li class="list-group-item d-flex justify-content-between">${item}<button class="del-btn btn btn-danger">Del</button></li>`)
    //vstavlyaem spisok na stranitsu
    todoBlock.innerHTML = '<ul class="list-group">' + list + '</ul>'
    //Berem vse knopki udaleniya i naveshivaem na kajduyu sobitiye klika
    document.querySelectorAll('.del-btn').forEach((button, idx) => {
        button.addEventListener('click', () => {
            //vyrezaem po indexu udalenniy element
            tasks.splice(idx,1)
            //posle udaleniya zapisyvaem massiv bex etogo elementa v hranilishe
            localStorage.setItem('todos', JSON.stringify(tasks))
            //pererisovka
            view()
        })
    })
}
//ochitit' ves' spisok
function clear(){
    //udalyaem stroku iz localStorage po nazvaniyu klyucha todos
    localStorage.removeItem('todos')
    //pererisovka
    view()
}
view()



//etot primer budet rabotat'
// {
//     let a = 10
//     console.log(a)
// }
// let a = 20
// console.log(a)

