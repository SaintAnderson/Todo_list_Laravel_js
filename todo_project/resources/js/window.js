let formCreate = $('#create');
let modalCreate = $('#name_of_table');
let todos = $('#todos');

async function todoReload() {
    let data = await $.get('/list');
    todos.empty();
    data.forEach(e => {
        todos.append(`
            <div class="d-flex justify-content-center">
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col" class="text-center">${e.name}</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        `);
    });
}

todoReload();

setInterval(() => {
    todoReload();
}, 1000);


formCreate.on('submit', async function(e) {
    e.preventDefault()
    try {
        await $.post('/list', formCreate.serialize());
        formCreate.trigger('reset');
    } catch (e) {}
    modalCreate.modal('toggle');
    todoReload();
})
