let postId = new URL(location.href).searchParams.get("id");

Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(res => res.json()),
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(res => res.json())
])
    .then(value => {
        show_post(value[0]);
        show_comments(value[1]);
    });


function show_post(post) {
    let post_div = document.getElementById("post_info");
    for (const key in post) {
        let key_div = document.createElement("div");
        key_div.innerText = `${key}: ${post[key]}`;

        post_div.appendChild(key_div);
    }
}

function show_comments(comments) {
    let comments_div = document.getElementById("comments");
    for (const comment of comments) {
        let comment_div = document.createElement("div");
        comment_div.classList.add("comment");

        for (const key in comment) {
            let key_div = document.createElement("div");
            if (key === "body") {
                key_div.innerHTML = `<br>&#10075;&#10075;<span> ${comment[key]} </span>&#10076;&#10076;`;
            } else if (key === "postId") {
                continue;
            } else {
                key_div.innerText = `${key}: ${comment[key]}`;
            }
            comment_div.appendChild(key_div);
        }
        comments_div.appendChild(comment_div);
    }
}