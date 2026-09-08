const API_URL = "/api/posts";

const form = document.getElementById("postForm");

const postId = document.getElementById("postId");
const title = document.getElementById("title");
const content = document.getElementById("content");
const author = document.getElementById("author");
const scheduledAt = document.getElementById("scheduledAt");
const status = document.getElementById("status");

const tableBody =
    document.getElementById("postTableBody");

const message =
    document.getElementById("message");


// GET ALL POSTS
async function loadPosts() {

    try {

        const response = await fetch(API_URL);

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        displayPosts(result.data);

    } catch (error) {

        showMessage(
            error.message,
            true
        );
    }
}


// DISPLAY POSTS
function displayPosts(posts) {

    tableBody.innerHTML = "";

    if (posts.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="6">
                    No posts found
                </td>
            </tr>
        `;

        return;
    }

    posts.forEach(post => {

        const row =
            document.createElement("tr");

        row.innerHTML = `

            <td>${post.id}</td>

            <td>${post.title}</td>

            <td>${post.author}</td>

            <td>${formatDate(post.scheduledAt)}</td>

            <td>${post.status}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editPost(${post.id})">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deletePost(${post.id})">
                    Delete
                </button>

            </td>
        `;

        tableBody.appendChild(row);

    });
}


// CREATE / UPDATE
form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const data = {

        title: title.value,

        content: content.value,

        author: author.value,

        scheduledAt: scheduledAt.value,

        status: status.value

    };


    try {

        let response;

        if (postId.value) {

            response = await fetch(
                `${API_URL}/${postId.value}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify(data)
                }
            );

        } else {

            response = await fetch(
                API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify(data)
                }
            );
        }


        const result =
            await response.json();


        if (!response.ok) {

            if (result.data) {

                const errors =
                    Object.values(result.data)
                        .join(", ");

                throw new Error(errors);

            }

            throw new Error(result.message);
        }


        showMessage(
            result.message,
            false
        );

        clearForm();

        loadPosts();


    } catch (error) {

        showMessage(
            error.message,
            true
        );
    }

});


// EDIT POST
async function editPost(id) {

    try {

        const response =
            await fetch(`${API_URL}/${id}`);

        const result =
            await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        const post = result.data;

        postId.value = post.id;

        title.value = post.title;

        content.value = post.content;

        author.value = post.author;

        scheduledAt.value =
            post.scheduledAt.substring(0, 16);

        status.value = post.status;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (error) {

        showMessage(
            error.message,
            true
        );
    }
}


// DELETE POST
async function deletePost(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this post?"
        );

    if (!confirmed) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/${id}`,
                {
                    method: "DELETE"
                }
            );


        const result =
            await response.json();


        if (!response.ok) {
            throw new Error(result.message);
        }


        showMessage(
            result.message,
            false
        );

        loadPosts();


    } catch (error) {

        showMessage(
            error.message,
            true
        );
    }
}


// CLEAR FORM
function clearForm() {

    postId.value = "";

    title.value = "";

    content.value = "";

    author.value = "";

    scheduledAt.value = "";

    status.value = "SCHEDULED";
}


// CLEAR BUTTON
document
    .getElementById("clearBtn")
    .addEventListener(
        "click",
        clearForm
    );


// REFRESH BUTTON
document
    .getElementById("refreshBtn")
    .addEventListener(
        "click",
        loadPosts
    );


// FORMAT DATE
function formatDate(date) {

    return date
        .replace("T", " ");
}


// SHOW MESSAGE
function showMessage(text, error) {

    message.textContent = text;

    message.style.display = "block";

    message.style.color =
        error ? "#dc2626" : "#15803d";

    setTimeout(() => {

        message.style.display = "none";

    }, 4000);
}


// INITIAL LOAD
loadPosts();