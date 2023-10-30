const API_BASE_URL = "http://authsys.rf.gd/authsys_api_php/api.php";

// Asegurarse de que las bibliotecas externas se han cargado
document.addEventListener("DOMContentLoaded", function () {
  // Funciones para mostrar las páginas
  function showLoginPage() {
    app.currentPage = "login";
  }

  function showRegisterPage() {
    app.currentPage = "register";
  }

  function showWelcomePage() {
    app.currentPage = "welcome";
    animateWelcome();
  }

  // Inicializar Petite-Vue
  const app = PetiteVue.createApp({
    currentPage: "login", // Página actual
    navigateTo(page) {
      // Función para cambiar de página
      this.currentPage = page;
    },
    dayjs: dayjs, // Librería Day.js accesible desde el HTML
  }).mount();

  // Configuración de Navigo para ruteo SPA
  const router = new Navigo("/");

  // Definir rutas
  router
    .on({
      "/": showLoginPage,
      "/register": showRegisterPage,
      "/welcome": showWelcomePage,
      // Añade esto para manejar cualquier otra ruta no especificada
      "*": showLoginPage,
    })
    .resolve();

  // Animaciones con Anime.js
  function animateWelcome() {
    anime({
      targets: "#welcome h3",
      translateY: [-50, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: "easeOutElastic(1, .8)",
    });
  }

  window.login = async function () {
    const userData = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };

    console.log("Datos de registro enviados:", userData);  // Debugging

    const response = await fetch(`${API_BASE_URL}?action=login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    console.log("Respuesta de la API:", data);  // Debugging

    if (data.success) {
      app.navigateTo("welcome");
      // Aquí puedes guardar el token o cualquier dato que la API devuelva en localStorage o sessionStorage, por ejemplo.
    } else {
      console.error("Error al iniciar sesión:", data.message);
      // Aquí puedes mostrar un mensaje al usuario sobre el error
    }
  };

  window.register = async function () {
    const userData = {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    console.log("Datos de registro enviados:", userData);  // Debugging

    const response = await fetch(`${API_BASE_URL}?action=register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    console.log("Respuesta de la API:", data);  // Debugging

    if (data.success) {
      app.navigateTo("welcome");
    } else {
      console.error("Error registrando:", data.message);
      // Aquí puedes mostrar un mensaje al usuario sobre el error
    }
  };

  window.logout = async function () {
    const response = await fetch(`${API_BASE_URL}?action=logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Aquí puedes añadir cualquier token o dato de autenticación que tu API requiera
      },
    });

    const data = await response.json();

    console.log("Respuesta de la API:", data);  // Debugging

    if (data.success) {
      app.navigateTo("login");
      // Aquí puedes limpiar el localStorage o sessionStorage
    } else {
      console.error("Error al cerrar sesión:", data.message);
      // Aquí puedes mostrar un mensaje al usuario sobre el error
    }
  };
});
