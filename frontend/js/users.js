let token = localStorage.token;

//USERS
//create
let createButton = document.getElementById('createButton');
let cancelButton = document.getElementById('cancelButton');
let addButton = document.getElementById('addButton');
let createUserSection = document.getElementById('createUser');
let usersSection = document.getElementById('usersSection');
//update
let updateUserSection = document.getElementById('updateUserSection');
let cancelButtonUp = document.getElementById('cancelButtonUp');
let createButtonUp = document.getElementById('createButtonUp');

//delete
let deleteUsersSection = document.getElementById('deleteUsersSection');
let cancelButtonDeleteUser = document.getElementById('cancelButtonDeleteUser');
let deleteButtonDeleteUser = document.getElementById('deleteButtonDeleteUser')

//Table Add User
let table = document.querySelector('#usersTable tbody')
let name = document.getElementById('nameUser');
let lastname = document.getElementById('lastnameUser');

let email = document.getElementById('emailUser');
let username = document.getElementById('usernameUser');
let pass = document.getElementById('passUser');
let repass = document.getElementById('repassUser');
let isAdmin = document.getElementById('isAdmin');

//Table Update User
let nameUp = document.getElementById('nameUserUp');
let lastnameUp = document.getElementById('lastnameUserUp');
let emailUp = document.getElementById('emailUserUp');
let usernameUp = document.getElementById('usernameUserUp');






//4. get users
function getUsers() {
    fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then(respuesta => respuesta.json())
        .then(res => {

            
            console.log('este')
            console.log(res)
            let user = res[0];
            if (res) {
                tableBody.innerHTML = ""
                for (let i = searchI; i < searchF; i++) {

                    const row = document.createElement('tr');
                    row.setAttribute('class', 'arrowContact');
                    row.setAttribute('class', 'arrow');
                    row.setAttribute('id', `arrow${i}`);
                    row.innerHTML += `
                <td>  <input type="checkbox" onclick="contar(this, ${i})" name="check"> </td>
                <td>${user[i].name}</td>
                <td>${user[i].lastname}</td>
                <td>${user[i].email}</td>
                <td>${user[i].username}</td>
                <td id="actions">
                    <i class="fas fa-ellipsis-h iconPoints"></i>
                    <i class="fas fa-trash" id=${user[i].user_id} onclick = "showDeleteUser(this)" ></i>
                    <i class="fas fa-pencil-alt" id=${user[i].user_id} onclick = "showUpdateUser(this)"></i>
                </td>
            `;
                    table.appendChild(row);

                    //Pagination
            rowsPage.innerHTML = ""
            for (let i = 1; i <= user.length; i++) {
                console.log(user.length)
                const optionPag = document.createElement('option');
                optionPag.innerText = `${i}`
                rowsPage.appendChild(optionPag)
            }
            rowsPage.value = searchF - searchI
            rowsTotal.innerText = `${user.length}`
                    rowI.innerText = `${searchI}`
                    rowF.innerText = `${searchF}`
                    
                }
            } else {
                res.json().then((data) => {
                    console.log('Users not found');
                    alert('Users not found');
                });
            }

        })/* .catch(res=>{res.json().then(data=>alert(data.msg))}); */
}
getUsers();

//2. Post User

createButton.addEventListener('click', () => {
    console.log('llamado al API');
    fetch('http://localhost:3000/user', {
        method: 'POST',
        body: `{"name":"${name.value}", "lastname":"${lastname.value}","email":"${email.value}","username":"${username.value}","pass":"${pass.value}","repass":"${repass.value}"}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }

    }).then((res) => {
        console.log(res);
        if (res.status == 200) {
            res.json().then((data) => {
                console.log(data);
                alert('Created');
            });
            location.reload()
        }
        else if (res.status == 400) {
            console.log(res);
            res.json().then((data) => {
                console.log(data);
                alert('Missing Arguments');
            });
        } else if (res.status == 403) {
            res.json().then((data) => {
                console.log(data);
                alert('Forbidden: No Permission To Access');
            });
        }
        else if (res.status == 405) {
            res.json().then((data) => {
                console.log(data);
                alert('Username Exist');
            });
        }
        else if (res.status == 406) {
            res.json().then((data) => {
                console.log(data);
                alert('Verify: Password and Corfirmation Password');
            });
        }
    })

});

addButton.addEventListener('click', () => {
    createUserSection.classList.toggle('hidden');
    usersSection.classList.toggle('hidden');
});
createButton.addEventListener('click', () => {
    createUserSection.classList.toggle('hidden');
    usersSection.classList.toggle('hidden');
});
cancelButton.addEventListener('click', () => {
    createUserSection.classList.toggle('hidden');
    usersSection.classList.toggle('hidden');
});



// 5. Put user

function showUpdateUser(i) {
    console.log(i)
    let id = i.id
    console.log(id)
    updateUserSection.classList.toggle('hidden');
    usersSection.classList.toggle('hidden');
    showInfoUserUp(id);
    createButtonUp.addEventListener('click', () => {
        console.log(id)
        updateUsers(id)
    });
}

function showInfoUserUp(id) {
    fetch(`http://localhost:3000/user/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then(respuesta => respuesta.json())
        .then(res => {
            console.log(res)

            if (res) {

                nameUp.value = `${res.name}`
                lastnameUp.value = `${res.lastname}`
                emailUp.value = `${res.email}`;
                usernameUp.value = `${res.username}`;
                
                
                
            } else {
                res.json().then((data) => {
                    console.log('user not found');
                    alert('user not found');
                });
            }

        })

}

function updateUsers(id) {
    console.log(id)

    fetch(`http://localhost:3000/user/${id}`, {

        method: 'PUT',
        body: `{"name":"${nameUp.value}", "lastname":"${lastnameUp.value}", "email":"${emailUp.value}", "username":"${usernameUp.value}"}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then((res) => {
        console.log(res)
        if (res.status == 200) {
            res.json().then((data) => {
                console.log(data);
                alert('Updated');
            });
            location.reload()
        }
        else if (res.status == 400) {
            res.json().then((data) => {
                console.log(data);
                alert('Missing Arguments');
            });
        }
        else if (res.status == 404) {
            res.json().then((data) => {
                console.log(data);
                alert('User Not Found');
            });
        }
    })

    updateUserSection.classList.add('hidden');
    usersSection.classList.remove('hidden');



}

cancelButtonUp.addEventListener('click', () => {
    updateUserSection.classList.add('hidden');
    usersSection.classList.remove('hidden');
});

//6. Delete User

cancelButtonDeleteUser.addEventListener('click', () => {
    deleteUsersSection.classList.toggle('hidden');
    usersSection.classList.remove('hidden');
});

function showDeleteUser(i) {
    console.log(i)
    let id = i.id
    console.log(id)
    deleteUsersSection.classList.toggle('hidden')

    deleteButtonDeleteUser.addEventListener('click', () => {
        console.log(id)
        deleteUser(id)
    });
}


function deleteUser(id) {
    console.log(id)
    fetch(`http://localhost:3000/user/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    })

    deleteUsersSection.classList.add('hidden');
    usersSection.classList.remove('hidden');

    location.reload()

}

//Sort Table

function sortTable(n, type) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("usersTable");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if ((type == "str" && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) || (type == "int" && parseFloat(x.innerHTML) > parseFloat(y.innerHTML))) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if ((type == "str" && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) || (type == "int" && parseFloat(x.innerHTML) < parseFloat(y.innerHTML))) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

//Pagination
function searchFetch (searchI, searchF){
    getUsers(searchI, searchF)
}