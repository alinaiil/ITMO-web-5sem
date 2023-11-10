const cast_form = document.getElementsByClassName('cast_table_form')[0];
cast_form.addEventListener('submit', generateCastTable);
document.getElementById('save_cast_settings').addEventListener('click', function () {
    localStorage.setItem('from_date_cast', document.getElementById('from_date_cast').value);
    localStorage.setItem('how_many_days', document.getElementById('how_many_days').value);
    localStorage.setItem('how_many_roles', document.getElementById('how_many_roles').value);
    document.getElementsByClassName('test')[0].textContent = document.getElementById('from_date_cast').value;
});
document.getElementById('load_cast_settings').addEventListener('click', function() {
    document.getElementById('from_date_cast').value = localStorage.getItem('from_date_cast') || '2023-11-11';
    document.getElementById('how_many_days').value = localStorage.getItem('how_many_days') || '1';
    document.getElementById('how_many_roles').value = localStorage.getItem('how_many_roles') || '1';
})

function generateCastTable(event) {
    event.preventDefault()
    let firstDate = new Date(document.getElementById('from_date_cast').value);
    let days = parseInt(document.getElementById('how_many_days').value);
    let roles = parseInt(document.getElementById('how_many_roles').value);
    document.getElementsByClassName('generated_title')[0].style.display = 'block';
    let generated_cast_table = document.createElement('table');
    generated_cast_table.className = "generated_cast_table";
    let head_row = generated_cast_table.insertRow();
    head_row.className = "cast_head_row";
    let role_header = document.createElement("th");
    role_header.innerText = "Роль";
    role_header.className = "cast_role_header";
    head_row.appendChild(role_header);
    for (let i = 0; i < days; i++) {
        let currentDate = new Date(firstDate);
        currentDate.setDate(firstDate.getDate() + i);
        let formattedDate = currentDate.toLocaleDateString('ru-RU');
        let date_header = document.createElement("th");
        date_header.innerText = formattedDate;
        head_row.appendChild(date_header);
    }
    for (let i = 0; i < roles; i++) {
        let row = generated_cast_table.insertRow();
        let currentRole = document.createElement("input");
        currentRole.setAttribute("type", "text");
        currentRole.className = "cast_role_name";
        let role_cell = row.insertCell(0);
        role_cell.appendChild(currentRole);
        role_cell.className = "cast_role_name_cell";
        for (let j = 0; j < days; j++) {
            let artist_cell = row.insertCell(j + 1);
            let artist_role = document.createElement("input");
            artist_role.setAttribute("type", "text");
            artist_role.className = "cast_artist_name";
            artist_cell.appendChild(artist_role);
            artist_cell.className = "cast_artist_name_cell";
        }
    }
    document.getElementsByClassName('generated_cast')[0].appendChild(generated_cast_table);
}