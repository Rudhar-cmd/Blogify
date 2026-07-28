const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

const title = document.getElementById("title");
const content = document.getElementById("content");
const image = document.getElementById("image");
const previewImage = document.getElementById("previewImage");
const form = document.getElementById("editPostForm");

async function loadCategories() {

    try {

        const response = await axios.get(
            "http://127.0.0.1:3001/category/all-category"
        );

        category.innerHTML = `<option value="">Select Category</option>`;

        response.data.category.forEach(cat => {

            category.innerHTML += `
                <option value="${cat._id}">
                    ${cat.name}
                </option>
            `;

        });

    } catch (error) {

        console.log(error.response?.data || error.message);

    }

}

async function loadPost() {

    try {

        const response = await axios.get(
            `http://127.0.0.1:3001/post/${postId}`
        );

        const post = response.data.post;

        title.value = post.title;
        content.value = post.content;
        previewImage.src = post.image;

    } catch (error) {

        console.log(error.response?.data || error.message);

    }

}

image.addEventListener("change", () => {

    const file = image.files[0];

    if (!file) return;

    previewImage.src = URL.createObjectURL(file);

});

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        const formData = new FormData();

        formData.append("title", title.value);
        formData.append("content", content.value);

        if (image.files.length > 0) {

            formData.append("image", image.files[0]);

        }

        const response = await axios.patch(
            `http://127.0.0.1:3001/post/update-post/${postId}`,
            formData,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        alert(response.data.message);

        window.location.href = "profile.html";

    } catch (error) {

        console.log(error.response?.data || error.message);

    }

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

loadPost();