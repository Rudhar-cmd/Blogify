const params = new URLSearchParams(window.location.search);
const postId = params.get("id");
console.log(postId);
let currentUserId = "";
async function getCurrentUser() {

    try {

        const response = await axios.get(
            "http://127.0.0.1:3001/user/current-user",
            {
                withCredentials: true
            }
        );

        currentUserId = response.data.user._id;

    } catch (error) {

        console.log(error.response?.data || error.message);

    }

}
async function getPost() {
    try {

        const response = await axios.get(
            `http://127.0.0.1:3001/post/${postId}`
        );

        const post = response.data.post;

        document.getElementById("postImage").src = post.image;
        document.getElementById("postCategory").textContent = post.category.name;
        document.getElementById("postTitle").textContent = post.title;
        document.getElementById("postAuthor").textContent = post.author.username;
        document.getElementById("postDate").textContent =
            new Date(post.createdAt).toLocaleDateString();

        document.getElementById("postContent").innerHTML = `
            <p>${post.content}</p>
        `;

    } catch (error) {
        console.log(error.response?.data || error.message);
    }
}

document.getElementById("shareBtn").addEventListener("click", async () => {

    if (navigator.share) {
        await navigator.share({
            title: document.getElementById("postTitle").textContent,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied!");
    }

});
document.getElementById("likeBtn").addEventListener("click", async () => {
    try {
        const response = await axios.post(
            `http://127.0.0.1:3001/likes/toggle/${postId}`,
            {},
            {
                withCredentials: true
            }
        );

        console.log(response.data);

        loadLikeCount();
    } catch (error) {
        console.log(error.response?.data || error.message);
    }
});
document.getElementById("commentBtn").addEventListener("click", async () => {

    const content = document.getElementById("commentInput").value.trim();

    if (!content) {
        alert("Please write a comment.");
        return;
    }

    try {

        await axios.post(
            `http://127.0.0.1:3001/comments/${postId}`,
            {
                content
            },
            {
                withCredentials: true
            }
        );

        document.getElementById("commentInput").value = "";

        loadComments();

    } catch (error) {

        console.log(error.response?.data || error.message);

    }

});
async function loadComments() {

    try {

        const response = await axios.get(
            `http://127.0.0.1:3001/comments/${postId}`
        );

        const container = document.getElementById("commentContainer");

        container.innerHTML = "";

        response.data.comments.forEach(comment => {

            container.innerHTML += `
<div class="comment-card">

    <div class="comment-header">

        <div class="comment-user">

            <div class="comment-avatar">
                ${comment.user.username.charAt(0).toUpperCase()}
            </div>

            <div class="comment-details">

                <h4>${comment.user.username}</h4>

                <span>${new Date(comment.createdAt).toLocaleDateString()}</span>

            </div>

        </div>

        ${comment.user._id === currentUserId ? `
            <div class="comment-actions">

                <button class="menu-btn">

                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor">

                        <circle cx="12" cy="5" r="2"/>
                        <circle cx="12" cy="12" r="2"/>
                        <circle cx="12" cy="19" r="2"/>

                    </svg>

                </button>

                <div class="menu-dropdown">

                    <button class="edit-btn" data-id="${comment._id}">
                        Edit
                    </button>

                    <button class="delete-btn" data-id="${comment._id}">
                        Delete
                    </button>

                </div>

            </div>
        ` : ""}

    </div>

    <p class="comment-text">
        ${comment.content}
    </p>

</div>
`;

        });

        document.getElementById("commentCount").textContent =
            response.data.comments.length;

        document.querySelectorAll(".menu-btn").forEach(btn => {

            btn.addEventListener("click", function (e) {

                e.stopPropagation();

                document.querySelectorAll(".menu-dropdown").forEach(menu => {

                    if (menu !== this.nextElementSibling) {
                        menu.classList.remove("active");
                    }

                });

                this.nextElementSibling.classList.toggle("active");

            });

        });

        document.querySelectorAll(".delete-btn").forEach(btn => {

            btn.addEventListener("click", async function () {

                const commentId = this.dataset.id;

                if (!confirm("Delete this comment?")) return;

                try {

                    const response = await axios.delete(
                        `http://127.0.0.1:3001/comments/${commentId}`,
                        {
                            withCredentials: true
                        }
                    );

                    alert(response.data.message);

                    loadComments();

                } catch (error) {

                    console.log(error.response?.data || error.message);

                }

            });

        });
        document.querySelectorAll(".edit-btn").forEach(btn => {

            btn.addEventListener("click", function () {
        
                const commentCard = this.closest(".comment-card");
        
                const commentText = commentCard.querySelector(".comment-text");
        
                const oldComment = commentText.textContent.trim();
        
                commentText.innerHTML = `
                    <textarea class="edit-comment-input">${oldComment}</textarea>
        
                    <div class="edit-actions">
        
                        <button class="cancel-comment">Cancel</button>
        
                        <button class="save-comment" data-id="${this.dataset.id}">
                            Save
                        </button>
        
                    </div>
                `;
        
                commentCard.querySelector(".cancel-comment").addEventListener("click", () => {
        
                    loadComments();
        
                });
        
                commentCard.querySelector(".save-comment").addEventListener("click", async function () {
        
                    const UpdateComment = commentCard
                        .querySelector(".edit-comment-input")
                        .value
                        .trim();
        
                    if (!UpdateComment) {
                        alert("Comment cannot be empty");
                        return;
                    }
        
                    try {
        
                        const response = await axios.patch(
                            `http://127.0.0.1:3001/comments/${this.dataset.id}`,
                            {
                                UpdateComment
                            },
                            {
                                withCredentials: true
                            }
                        );
        
                        alert(response.data.message);
        
                        loadComments();
        
                    } catch (error) {
        
                        console.log(error.response?.data || error.message);
        
                    }
        
                });
        
            });
        
        });

    } catch (error) {

        console.log(error.response?.data || error.message);

    }

}
async function loadLikeCount() {
    try {
        const response = await axios.get(
            `http://127.0.0.1:3001/likes/count/${postId}`
        );

        document.getElementById("likeCount").textContent = response.data.count;
    } catch (error) {
        console.log(error.response?.data || error.message);
    }
}
document.addEventListener("click", () => {

    document.querySelectorAll(".menu-dropdown").forEach(menu => {

        menu.classList.remove("active");

    });

});
document.getElementById("logoutBtn").addEventListener("click", async (e) => {

    e.preventDefault();

    const confirmLogout = confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;

    try {

        const response = await axios.post(
            "http://127.0.0.1:3001/user/logout",
            {},
            {
                withCredentials: true
            }
        );

        alert(response.data.message);

        window.location.href = "login.html";

    } catch (error) {

        console.log(error.response?.data || error.message);

    }

});
(async () => {

    await getCurrentUser();

    await getPost();

    await loadLikeCount();

    await loadComments();

})();