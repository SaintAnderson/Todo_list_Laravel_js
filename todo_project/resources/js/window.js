let formCreate = $('#create');
let modalCreate = $('#name_of_table');
let todos = $('#todos');


async function todoReload() {
    let data = await $.get('/list');
    todos.empty();
    for (const e of data) {
        let tasks = await $.get('/task/' + e.id);
        let tr = ``;
        tasks.forEach(e => {
            tr += `
               <tr>
                    <td class="d-flex justify-content-between">
                        <div>${e.description}</div>
                        <div>
                            <button type="button" class="btn btn-danger" id="delete${e.id}" data-id="${e.id}">
                            Удалить
                            </button>
                        </div>
                    </td>
                </tr>

            `;
        });


        todos.append(`
            <div class="d-flex justify-content-center">
                <table class="table">
                    <thead class="thead-dark" >
                        <tr>
                            <th scope="col"  class="text-center rounded" colspan="2">${e.name}</th>
                        </tr>
                        <tr>
                            <td>
                                <form id="todo${e.id}">
                                 <input name="_token" value="${csrf}" type="hidden"/>
                                 <input name="todo_id" value="${e.id}" type="hidden"/>
                                  <div class="row">
                                    <div class="col">
                                        <input type="text" class="form-control" name="description" placeholder="Новый пункт списка">
                                    </div>
                                    <div>
                                        <button type="submit" class="btn btn-primary mb-2">Добавить в список</button>
                                    </div>
                                  </div>
                                </form>
                            </td>
                        </tr>
                        ${tr}
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        `);
        let form = $(`#todo${e.id}`);
        form.on('submit', createTask)

        tasks.forEach(e => {
            let btn = $("#delete" + e.id);
            btn.on('click', deleteTask)
        })
    }
}

async function createTask(e) {
    e.preventDefault()
    try {
        await $.post('/task', $(e.target).serialize());
        e.trigger('reset');
    } catch (e) {
    }
    todoReload();
}
todoReload();

async function deleteTask(e) {
    console.log(e);
    await $.post('/task/' + e.target.dataset.id, {
        _token: csrf,
        _method: 'DELETE'
    });
    todoReload();
}

formCreate.on('submit', async function(e) {
    e.preventDefault()
    try {
        await $.post('/list', formCreate.serialize());
        formCreate.trigger('reset');
    } catch (e) {}
    modalCreate.modal('toggle');
    todoReload();
})
