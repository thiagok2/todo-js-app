# todoapp-js

Abrir https://thiagooliveira10.github.io/todoapp-js/


## Passos do projeto
    
    # Passo 1 - Estrutura
        Criar pastas e cópiar código do main.css e estrutura básica do do HTML
    # Passo 2 - app.js
        1.  let todoList = [];
        2.  function addTodo(text)
        3.  form.addEventListener('submit'...
        4.  function renderTodo(todo)
        5.  marcar checked
            list.addEventListener('click'...
            toggleDone
        6. deletar
            list.addEventListener('click'...
            function deleteTodo(key)
        7. localStorage
            localStorage.setItem
            window.addEventListener('load'...
            localStorage.getItem(

--------------------------------------------------------------------------------------------
        8. Acesso API REST
            window.addEventListener('load', async () => 
                const response = await fetch(API_URL);
                todoList = await response.json();
        

        9. Add POST
            const settings = {
                method: 'POST',
                body: JSON.stringify(todo),
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                }
            }
            const response = await fetch(API_URL, settings);
        
        10. DELETE
            const settings = {
                method: 'DELETE'
            }
            const response = await fetch(API_URL+todo.id, settings);

        11. PUT

            const settings = {
            method: 'PUT',
            body: JSON.stringify(todoList[index]),
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            }
        }
        const response = await fetch(API_URL+todoList[index].id, settings);

        12. Extrair load e setInterval
            loadTodoList();
            setInterval(function(){loadTodoList();}, 5000);



