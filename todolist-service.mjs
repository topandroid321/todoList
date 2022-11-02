export class TodoListService{
    todoList = ["Menyuci motor","Menabung"];


    // get data json
    getJsonTodoList(){
        return JSON.stringify({
            code: 200,
            status: "OK",
            data: this.todoList.map((value,index) =>{
                return {
                    id: index,
                    todo: value
                }
            })
        });
    }
    
    getTodoList(request, response){
        response.write(this.getJsonTodoList());
        response.end();
    }

    // membuat atau menambah data

    createTodo(request,response){
        request.addListener("data",(data)=>{
            const body = JSON.parse(data.toString());
            this.todoList.push(body.todo);

            response.write(this.getJsonTodoList());
            response.end();
        })
    }

    // mengubah atau edit data
    updateTodoList(request, response){
        request.addListener("data",(data)=>{
            const body = JSON.parse(data.toString());
            if (this.todoList[body.id]) {
                this.todoList[body.id] = body.todo;
            }
            response.write(this.getJsonTodoList());
            response.end();
        })
    }
}

