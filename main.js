fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(value => {
        show_users(value);
    });

function show_users(users) {
    let users_div = document.createElement("div");
    users_div.classList.add("users_block");

    for (const user of users) {
        let div = document.createElement("div");
        div.classList.add("user_preview");
        let info = document.createElement("div");
        info.innerHTML = `${user.id}. ${user.name}`;
        info.classList.add("user_initials")
        let button = document.createElement("button");
        button.innerText = "details";
        button.classList.add("user_details");

        button.addEventListener("click", () => {
            location.href = `user_details/user-details.html?id=${user.id}`;
        })

        div.append(info, button);
        users_div.appendChild(div);
    }
    document.body.appendChild(users_div);
}