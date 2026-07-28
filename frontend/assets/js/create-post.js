async function fetchCategories(){
    try {
        const response = await axios.get(
            "https://blogify-7ibm.onrender.com/category")

            const categories = response.data.category;

            const select = document.getElementById("category");
    
            categories.forEach((cat) => {
                const option = document.createElement("option");
    
                option.value = cat._id;
                option.textContent = cat.name;
    
                select.appendChild(option);
        });
        console.log(select);
    } catch (error) {
        console.log(error)
    }
}
fetchCategories();
const Create_Post = document.getElementById('createPostForm');
Create_Post.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const thumbnail = document.getElementById("thumbnail").files[0];
    const content = document.getElementById("content").value;

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("image", thumbnail);

    try {
        const response = await axios.post(
            "https://blogify-7ibm.onrender.com/post/create-post",
            formData,
            {
                withCredentials: true,
            }
        );
        window.location.href = "profile.html";
    
    } catch (err) {
        console.log("ERROR");
        console.log(err);
    }
});
document.getElementById("logoutBtn").addEventListener("click", async (e) => {

    e.preventDefault();

    const confirmLogout = confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;

    try {

        const response = await axios.post(
            "https://blogify-7ibm.onrender.com/user/logout",
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