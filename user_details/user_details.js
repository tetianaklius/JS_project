let userId = new URL(location.href).searchParams.get("id");
console.log(userId);

fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(res => res.json())
    .then(value => show_user_info(value));

function show_user_info(user) {
    let user_div = document.getElementById("user_info");

    let button = document.getElementById("show_user_posts");
    button.innerText = "posts of current user";

    let from_show_info = show_info(user);
    user_div.appendChild(from_show_info);

    function show_info(user) {
        let up_div = document.createElement("div");
        for (const key in user) {
            let div = document.createElement("div");

            if (Array.isArray(user[key])) {         // additional for arrays, arrays with arrays, arrays with objs
                let subheader = document.createElement("div");
                subheader.innerText = `${key}:`;
                up_div.appendChild(subheader);

                let ul = show_arr(user[key], show_info);
                div.appendChild(ul);

            } else if (typeof user[key] === "object") {
                let subheader = document.createElement("div");
                subheader.innerText = `${key}:`;
                up_div.appendChild(subheader);

                let from_rec = show_info(user[key]);
                div.appendChild(from_rec);

            } else {
                let last_div = document.createElement("div");
                last_div.innerText = `${key}: ${user[key]}`;
                div.appendChild(last_div);
            }
            up_div.appendChild(div);
        }
        return up_div;
    }

    button.addEventListener("click", () => {
        show_user_posts(user.id);
    });
    button.addEventListener("mouseover", () => {
        button.style.cursor = "pointer";
    });
}

function show_arr(arr, show_info) {
    let ul = document.createElement("ul");
    for (const item of arr) {
        if (Array.isArray(item)) {
            show_arr(arr);
        } else if (typeof item === "object") {
            let li = show_info(item);
            ul.appendChild(li);
            li.classList.add("obj");
        } else {
            for (const item of arr) {
                let li = document.createElement("li");
                li.innerText = `${item}`;
                ul.appendChild(li);
            }
            return ul;
        }
    }
    return ul;
}

function show_user_posts(userId) {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        .then(res => res.json())
        .then(posts => {
            let posts_block = document.getElementById("user_posts");
            for (const post of posts) {
                let div = document.createElement("div");
                div.classList.add("post_title");
                div.innerText = `${post.title}`;
                posts_block.appendChild(div);

                div.addEventListener("click", () => {
                    location.href = `../post_details/post-details.html?id=${post.id}`;
                });
                div.addEventListener("mouseover", () => {
                    div.style.fontWeight = "bolder";
                    div.style.cursor = "pointer";
                });
                div.addEventListener("mouseout", () => {
                    div.style.fontWeight = "normal";
                });
            }
        });
}


// user with more complex fields to check recursion (function show_user_info(user) instead fetch)

// let user = {
//     "id": 2,
//     "name": "Ervin Howell",
//     "username": "Antonette",
//     "email": "Shanna@melissa.tv",
//     "address": {
//         "street": "Victor Plains",
//         "suite": "Suite 879",
//         "city": "Wisokyburgh",
//         "zipcode": "90566-7771",
//         "geo": {
//             "lat": "-43.9509",
//             "lng": "-34.4618"
//         }
//     },
//     "books": [
//         "The Enchanted Desna", "Garden of Gethsemane",
//         [
//             "Tiger Trappers",
//             [
//                 "Sweet Darusia",
//                 [
//                     "A Man Running Over the Abyss",
//                     "The Yellow Prince"
//                 ]
//             ]
//         ],
//         ["Earth"]
//     ],
//     "greetings": {
//         "greeting1": ["Hi", "Hello"],
//         "greeting2": ["Good morning", "Morning!"],
//         "greeting3": ["Good afternoon", "Good evening"],
//     },
//     "some more info": {
//         "guests": [
//             {
//                 "name": "Petro",
//                 "age": 25,
//                 "city": "Lviv",
//                 "books":
//                     [
//                         {
//                             "title": "Garden of Gethsemane",
//                             "author": "Ivan Bahrianyi",
//                             "release": [2009, 2012, 2017, 2020, 2022, 2023]
//                         },
//                         {
//                             "title": "The Enchanted Desna",
//                             "author": "Oleksandr Dovzhenko"
//                         },
//                     ]
//             },
//             {
//                 "name": "Hanna",
//                 "age": 30,
//                 "city": "Kyiv",
//                 "friend": {
//                     "name": "Katia",
//                     "age": 28,
//                     "city": "Lviv"
//                 }
//             },
//             {
//                 "name": "Olia",
//                 "age": 32,
//                 "city": "Kharkiv",
//                 "friend": {
//                     "name": "Katia",
//                     "age": 28,
//                     "city": "Lviv",
//                     "books":
//                         ["Tiger Trappers", "Sweet Darusia"]
//                 }
//             }
//         ],
//         "guests_cities": ["Lviv", "Kyiv", "Kharkiv"],
//         "total_guests": "3"
//     },
//     "phone": "010-692-6593 x09125",
//     "website": "anastasia.net",
//     "company": {
//         "name": "Deckow-Crist",
//         "catchPhrase": "Proactive didactic contingency",
//         "bs": "synergize scalable supply-chains"
//     }
// };