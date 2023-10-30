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
  
    // Función para registrar (aquí deberías agregar la lógica de llamada a la API)
    window.register = function () {
      // Lógica para registrar
      console.log("Registrando...");
  
      // Por ahora, simplemente navega a la página de bienvenida
      app.navigateTo("welcome");
    };
  
    // Función para cerrar sesión (aquí deberías agregar la lógica de llamada a la API)
    window.logout = function () {
      // Lógica para cerrar sesión
      console.log("Cerrando sesión...");
  
      // Por ahora, simplemente navega a la página de inicio de sesión
      app.navigateTo("login");
    };
  });
  