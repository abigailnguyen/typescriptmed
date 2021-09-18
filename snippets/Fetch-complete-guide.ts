
async function main() {
    const res = await fetch('http://localhost:3000/api/echo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: 'Hello Echo',
        })
    });
    const json = await res.json();
    console.log(json);
}
main();


const baseUrl = 'http://localhost:3000/api/todos'
type Todo = {
    id: string, 
    name: string,
};

async function addTodo(name: string): Promise<{ id: string } {
    const res = await fetch(baseUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name})
    });
    return res.json();
}

async function getTodo(id: string): Promise<Todo | null> {
    const res = await fetch(`${baseUrl}/${id}`);
    if (res.ok) {
        return res.json();
    }
    return null;
}

async function getTodos(): Promise<{ todos: Todo[] }> {
    const res = await fetch(baseUrl);
    return res.json();
}

async function updateTodo(todo: Todo): Promise<void> {
    await fetch(`${baseUrl}/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({name: todo.name})
    });
}

async function removeTodo(id: string): Promise<{ success: boolean }>{
    const res = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE"
    });
    return { success: res.ok }
}

async function main() {
    const { id } = await addTodo('Added with fetch');
    console.log(await getTodo(id));
    updateTodo({ id, name: 'Updated with fetch'});
    console.log(await getTodo(id));
    await removeTodo(id);
    console.log(await getTodo(id)); // return null 404 not found
}
main();

asynch function main() {
    try {
        await fetch(`http://localhost:1337`);
        console.log('success');
    } catch(e) {
        console.log('error', e);
    }
}
main();