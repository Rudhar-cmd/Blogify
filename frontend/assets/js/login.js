const login = document.getElementById('loginForm')
login.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const credential = document.getElementById('credential').value.trim();;
    const password = document.getElementById('password').value;
    const formData = new FormData();
    try{
        const response = await axios.post(
            "https://blogify-7ibm.onrender.com/user/login",
            {
                email : credential,
                username : credential,
                password,
                
            },
            {
                withCredentials : true,
            }
        );
        alert(response.data.message);
        window.location.href = "./home.html";
    }catch (error) {
        console.log(error);
    
        if (error.response) {
            console.log(error.response);
            alert(error.response.data.message);
        } else {
            alert("Server is not responding.");
        }
    }
})