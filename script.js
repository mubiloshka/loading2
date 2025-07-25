let users = [];

function showLoader() {
    document.getElementById("loader").style.display = "block";
}

function hideLoader() {
    document.getElementById("loader").style.display = "none";
}

function fetchUsers() {
    showLoader();
    fetch("https://randomuser.me/api/?results=100")
        .then(response => response.json())
        .then(data => {
            users = data.results;
            renderUsers(users);
        })
        .catch(error => {
            alert("Xatolik yuz berdi");
            console.error(error);
        })
        .finally(() => {
            hideLoader();
        });
}

function renderUsers(userArray) {
    const userList = document.getElementById("userList");
    userList.innerHTML = "";

    userArray.forEach(user => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${user.picture.medium}" alt="User">
            <h3>${user.name.first} ${user.name.last}</h3>
            <p><b>Yosh:</b> ${user.dob.age}</p>
            <p><b>Telefon:</b> ${user.phone}</p>
            <p><b>Email:</b> ${user.email}</p>
            <p><b>Manzil:</b> ${user.location.city}, ${user.location.country}</p>
        `;
        userList.appendChild(card);
    });
}

document.getElementById("sortSelect").addEventListener("change", () => {
    const sortBy = document.getElementById("sortSelect").value;
    let sortedUsers = [...users];

    if (sortBy === "name") {
        sortedUsers.sort((a, b) => a.name.first.localeCompare(b.name.first));
    } else if (sortBy === "age") {
        sortedUsers.sort((a, b) => a.dob.age - b.dob.age);
    }

    renderUsers(sortedUsers);
});

document.getElementById("searchInput").addEventListener("input", () => {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const filteredUsers = users.filter(user =>
        user.name.first.toLowerCase().includes(searchTerm) ||
        user.name.last.toLowerCase().includes(searchTerm)
    );
    renderUsers(filteredUsers);
});

fetchUsers();
