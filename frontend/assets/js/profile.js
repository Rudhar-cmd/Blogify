async function getProfile() {
    try {
        const response = await axios.get(
            "http://127.0.0.1:3001/user/profile",
            {
                withCredentials: true,
            }
        );

        const { user, stats, posts } = response.data;


        document.getElementById("username").textContent = user.username;
        document.getElementById("email").textContent = ` ${user.email}`;
        document.getElementById("profileImage").src = user.avatar;



        document.getElementById("blogCount").textContent = stats.blogs;
        document.getElementById("likeCount").textContent = stats.likes;
        document.getElementById("commentCount").textContent = stats.comments;

        document.getElementById(
            "publishedArticles"
        ).textContent = `${stats.blogs} Published Articles`;


        const blogContainer = document.getElementById("blogContainer");
        const emptyState = document.getElementById("emptyState");

        blogContainer.innerHTML = "";

        if (posts.length === 0) {
            emptyState.style.display = "block";
            blogContainer.style.display = "none";
            return;
        }

        emptyState.style.display = "none";
        blogContainer.style.display = "grid";

        let html = "";

        posts.forEach((post) => {
            html += `
            <div class="blog-card">
        
                <img src="${post.image}" alt="${post.title}">
        
                <div class="blog-content">
        
                    <span>${post.category?.name || "General"}</span>
        
                    <h3>${post.title}</h3>
        
                    <p>${post.content.substring(0,100)}...</p>
        
                    <div class="blog-footer">
        
                        <small>${new Date(post.createdAt).toLocaleDateString()}</small>
        
                        <div class="actions">
        
                            <button class="action-btn view-btn"
                                onclick="viewPost('${post._id}')"
                                title="View">
        
                              
        
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table-of-contents-icon lucide-table-of-contents"><path d="M16 5H3"/><path d="M16 12H3"/><path d="M16 19H3"/><path d="M21 5h.01"/><path d="M21 12h.01"/><path d="M21 19h.01"/></svg>
        
                            </button>
        
                            <button class="action-btn edit-btn"
                                onclick="editPost('${post._id}')"
                                title="Edit">
        
                                
        
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                    <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
                                </svg>
        
                            </button>
        
                            <button class="action-btn delete-btn"
                                onclick="deletePost('${post._id}')"
                                title="Delete">
        
        
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M10 11v6"/>
                                    <path d="M14 11v6"/>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                                    <path d="M3 6h18"/>
                                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                </svg>
        
                            </button>
        
                        </div>
        
                    </div>
        
                </div>
        
            </div>
            `;
        });

        blogContainer.innerHTML = html;
    } catch (error) {
        console.log(error.response?.data || error.message);
    }
}


function viewPost(id) {
    window.location.href = `post-details.html?id=${id}`;
}



function editPost(id) {
    window.location.href = `edit-post.html?id=${id}`;
}



async function deletePost(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {

        const response = await axios.delete(
            `http://127.0.0.1:3001/post/delete-post/${id}`,
            {
                withCredentials: true,
            }
        );

        alert(response.data.message);

        // Reload Profile
        getProfile();

    } catch (error) {
        console.log(error.response?.data || error.message);
    }
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

getProfile();