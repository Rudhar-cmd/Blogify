window.addEventListener("DOMContentLoaded", async () => {

    await getCurrentUser();

    await loadPosts();

});

async function getCurrentUser() {

    try {

        const response = await axios.get(
            "https://blogify-7ibm.onrender.com/user/current-user",
            {
                withCredentials: true
            }
        );

        const user = response.data.user;
        document.getElementById("welcomeText").textContent =
            `Welcome Back, ${user.username} 👋`;

        document.getElementById("username").textContent =
            user.username;

        document.getElementById("avatar").src =
            user.avatar;

    } catch (error) {

        console.log(error.response?.data || error.message);

    }

}

async function loadPosts() {

    try {

        const response = await axios.get(
            "http://127.0.0.1:3001/post"
        );

        const posts = response.data.posts;
        loadLatestPosts(posts);

    } catch (error) {

        console.log(error.response?.data || error.message);

    }

}

function loadFeaturedPost(post) {

    document.getElementById("featuredBlog").innerHTML = `

        <div class="featured-image">

            <img src="${post.image}" alt="${post.title}">

        </div>

        <div class="featured-content">

            <span>

                Featured

            </span>

            <h2>

                ${post.title}

            </h2>

            <p>

                ${post.content.substring(0,180)}...

            </p>

            <div class="author">

                <img src="${post.author.avatar}">

                <div>

                    <h4>

                        ${post.author.username}

                    </h4>

                    <p>

                        ${new Date(post.createdAt).toLocaleDateString()}

                    </p>

                </div>

            </div>

            <a
                href="post-details.html?id=${post._id}"
                class="read-more">

                Read More →

            </a>

        </div>

    `;

}

function loadLatestPosts(posts) {

    const blogGrid = document.getElementById("blogGrid");

    let html = "";

    posts.forEach(post => {

        if (!post.author) return;

        html += `

        <div class="blog-card">

            <img src="${post.image}" alt="${post.title}">

            <div class="blog-body">

                <span>

                    ${post.category?.name || "General"}

                </span>

                <h3>

                    ${post.title}

                </h3>

                <p>

                    ${post.content.substring(0,100)}...

                </p>

                <div class="meta">

                    <div class="author-small">

                        <img src="${post.author.avatar}" alt="${post.author.username}">

                        <span>

                            ${post.author.username}

                        </span>

                    </div>

                    <span>

                        ${new Date(post.createdAt).toLocaleDateString()}

                    </span>

                </div>

                <div class="actions">

                    <span class="action-item">

                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round">

                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2C10.5 3.5 9.26 3 7.5 3A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>

                        </svg>

                        ${post.likesCount}

                    </span>

                    <span class="action-item">

                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round">

                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>

                        </svg>

                        ${post.commentsCount}

                    </span>

                </div>

                <a
                    href="post-details.html?id=${post._id}"
                    class="read-more">

                    Read More →

                </a>

            </div>

        </div>

        `;

    });

    blogGrid.innerHTML = html;

}

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
