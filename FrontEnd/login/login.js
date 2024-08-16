
const loginUrl = "http://localhost:5678/api/users/login";
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const submitBtn = document.querySelector("input[type='submit']");
const form = document.getElementById("loginForm");
const loginError = document.querySelector(".loginError");
const passwordError = document.querySelector(".passwordError");
const userData = {
  email: "",
  password: "",
};


//creation des balises dans le html et leur fonction

form.addEventListener("submit", (event) => {
  event.preventDefault();
  loginUser();
});

inputEmail.addEventListener("input", (event) => {
  inputEmail.reportValidity();
  userData.email = event.target.value;
});

inputPassword.addEventListener("input", (event) => {
  inputPassword.reportValidity();
  userData.password = event.target.value;
});
//chargement du DOM, preventdefault pour que cela ne bouge pas
document.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();
  userData.email = inputEmail.value;
  userData.password = inputPassword.value;
  console.log(userData);
});

//Fonction qui fetch les users
async function loginUser() {
  try {
    const response= await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
        console.log(data);

    if (data.message) {
      loginError.textContent = "Email inexistant";
      inputEmail.style.color = "red";
      
    } else if (data.error) {
      passwordError.textContent = "Mot de passe invalide";
      loginError.textContent = "";
      inputPassword.style.color = "red";
      inputEmail.style.color = "#1D6154";
     
    } else {
      inputPassword.style.color = "#1D6154";
      passwordError.textContent = "";
      loginError.textContent = "";
      localStorage.setItem("token", data.token);
      window.location.href = "../index.html";
      //si le token est bon, il passe dans le localstorage
      // on revient à la page html de l'accueil
    }
  } catch (error) {
    console.log(error);
  }
}