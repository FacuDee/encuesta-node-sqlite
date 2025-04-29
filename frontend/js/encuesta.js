document
  .getElementById("formEncuesta")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    // Obtener datos del formulario
    const formData = new FormData(this);
    const respuestas = {};

    for (let [key, value] of formData.entries()) {
      respuestas[key] = value;
    }

    for (let i = 1; i <= 5; i++) {
      // Aumentar este número según las preguntas
      if (!respuestas[`p${i}`]) {
        Swal.fire({
          icon: "warning",
          title: "Falta una respuesta",
          text: `Por favor respondé la pregunta ${i}`,
          confirmButtonText: "Entendido",
        });
        return;
      }
    }

    // Verificar si ya votó (usando localStorage como solución local)
    // if (localStorage.getItem('yaVoto') === 'true') {
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Ya participaste',
    //         text: 'Solo se permite una respuesta por persona.',
    //         confirmButtonText: 'Entendido'
    //     });
    //     return;
    // }

    try {
      // Enviar datos al backend (usando Fetch API)
      const response = await fetch("http://localhost:3000/api/encuestas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(respuestas),
      });

      if (response.ok) {
        localStorage.setItem("yaVoto", "true");
        await Swal.fire({
          icon: "success",
          title: "¡Gracias por participar!",
          text: "Tu encuesta ha sido registrada.",
          confirmButtonText: "Ver resultados",
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
          backdrop: true,
        });
        window.location.href = "resultados.html";
      } else {
        throw new Error("Error al enviar la encuesta");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Ocurrió un error",
        text: "Por favor intenta nuevamente.",
        confirmButtonText: "Intentar nuevamente",
      });
    }
  });
