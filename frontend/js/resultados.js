// Mapeo de respuestas a texto visible
const opcionesP1 = {
  5: "Muy buena",
  4: "Buena",
  3: "Regular",
  2: "Mala",
  1: "Pésima",
};

const opcionesP2 = {
  5: "Muy bueno",
  4: "Bueno",
  3: "Regular",
  2: "Malo",
  1: "Pésimo",
};

const opcionesP3 = {
  5: "Muy buena",
  4: "Buena",
  3: "Regular",
  2: "Mala",
  1: "Pésima",
};

const opcionesP4 = {
  5: "Muy bueno",
  4: "Bueno",
  3: "Regular",
  2: "Malo",
  1: "Pésimo",
};

const opcionesP5 = {
  5: "Muy buena",
  4: "Buena",
  3: "Regular",
  2: "Mala",
  1: "Pésima",
};

// Colores personalizados por respuesta
const coloresP1 = {
  "Muy buena": "#61C76C",
  "Buena": "#A8E0A6",
  "Regular": "#85C1E9",
  "Mala": "#4682B4",
  "Pésima": "#1C4F7B",
};

const coloresP2 = {
  "Muy bueno": "#61C76C",
  "Bueno": "#A8E0A6",
  "Regular": "#85C1E9",
  "Malo": "#4682B4",
  "Pésimo": "#1C4F7B",
};

const coloresP3 = {
  "Muy buena": "#61C76C",
  "Buena": "#A8E0A6",
  "Regular": "#85C1E9",
  "Mala": "#4682B4",
  "Pésima": "#1C4F7B",
};

const coloresP4 = {
  "Muy bueno": "#61C76C",
  "Bueno": "#A8E0A6",
  "Regular": "#85C1E9",
  "Malo": "#4682B4",
  "Pésimo": "#1C4F7B",
};

const coloresP5 = {
  "Muy buena": "#61C76C",
  "Buena": "#A8E0A6",
  "Regular": "#85C1E9",
  "Mala": "#4682B4",
  "Pésima": "#1C4F7B",
};

// Función para contar las respuestas con sus textos
function contarRespuestas(data, campo, opciones) {
  const conteo = {};
  data.forEach((encuesta) => {
    const valor = encuesta[campo];
    const texto = opciones[valor] || valor;
    conteo[texto] = (conteo[texto] || 0) + 1;
  });
  return conteo;
}

// Crear gráfico de torta
const ordenP1 = ["Muy buena", "Buena", "Regular", "Mala", "Pésima"];
const ordenP2 = ["Muy bueno", "Bueno", "Regular", "Malo", "Pésimo"];
const ordenP3 = ["Muy buena", "Buena", "Regular", "Mala", "Pésima"];
const ordenP4 = ["Muy bueno", "Bueno", "Regular", "Malo", "Pésimo"];
const ordenP5 = ["Muy buena", "Buena", "Regular", "Mala", "Pésima"];

function crearGraficoTorta(canvasId, datos, coloresPorRespuesta, orden) {
  const ctx = document.getElementById(canvasId).getContext("2d");
  const etiquetas = orden;
  const valores = orden.map((etiqueta) => datos[etiqueta] || 0);
  const colores = orden.map(
    (etiqueta) => coloresPorRespuesta[etiqueta] || "#ccc"
  );

  new Chart(ctx, {
    type: "pie",
    data: {
      labels: etiquetas,
      datasets: [
        {
          data: valores,
          backgroundColor: colores,
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
}

// Obtener los resultados desde el servidor
fetch("/api/resultados")
  .then((res) => res.json())
  .then((data) => {
    document.getElementById("contador-encuestas").textContent = `Encuestas cargadas: ${data.length}`;
    
    const conteoP1 = contarRespuestas(data, "p1", opcionesP1);
    const conteoP2 = contarRespuestas(data, "p2", opcionesP2);
    const conteoP3 = contarRespuestas(data, "p3", opcionesP3);
    const conteoP4 = contarRespuestas(data, "p4", opcionesP4);
    const conteoP5 = contarRespuestas(data, "p5", opcionesP5);
  
    crearGraficoTorta("graficoP1", conteoP1, coloresP1, ordenP1);
    crearGraficoTorta("graficoP2", conteoP2, coloresP2, ordenP2);
    crearGraficoTorta("graficoP3", conteoP3, coloresP3, ordenP3);
    crearGraficoTorta("graficoP4", conteoP4, coloresP4, ordenP4);
    crearGraficoTorta("graficoP5", conteoP5, coloresP5, ordenP5);
  })
  .catch((err) => console.error("Error al cargar los resultados:", err));
