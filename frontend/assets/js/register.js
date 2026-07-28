const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const avatar = document.getElementById("avatar").files[0];

    const formData = new FormData();

    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    if (avatar) {
        formData.append("avatar", avatar);
    }

    try {
        console.log("Before request");
    
        const response = await axios.post(
            "https://blogify-7ibm.onrender.com/user/register",
            formData
        );
    
        console.log("After request");
        console.log(response);
    
        alert("Registration successful!");
    
        window.location.href = "./home.html";
    
    } catch (error) {
        console.log(error);
        console.log(error.message);
    
        if (error.response) {
            console.log("Status:", error.response.status);
            console.log("Data:", error.response.data);
        } else {
            console.log("No response from server");
        }
    }
});