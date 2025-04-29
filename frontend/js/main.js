// Versión mínima de main.js
document.addEventListener('DOMContentLoaded', function() {
    // Solo lo esencial
    console.log('Aplicación iniciada');
    
    // Controlar el envío de formularios globalmente
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!this.checkValidity()) {
                e.preventDefault();
                alert('Por favor completa todos los campos requeridos.');
            }
        });
    });
});