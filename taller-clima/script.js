const dashboard = document.getElementById('weather-dashboard');
const rutaJson = './clima.json';

fetch(rutaJson)
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo JSON.');
        }
        return response.json();
    })
    .then(data => {
        data.forEach(ciudad => {
            const card = document.createElement('div');
            card.className = 'weather-card';

            // Título de la ciudad
            const cityTitle = document.createElement('h3');
            cityTitle.textContent = ciudad.ciudad;
            
            // Icono del clima
            const icon = document.createElement('img');
            icon.src = `https://ejemplo.com/iconos/${ciudad.icono}`; // URL de ejemplo, en un examen se usaría una real
            icon.alt = ciudad.condicion;
            icon.className = 'weather-icon';

            // Temperatura
            const tempElement = document.createElement('div');
            tempElement.className = 'temperature';
            let temperaturaActual = ciudad.temperatura;
            tempElement.textContent = `${temperaturaActual}ºC`;

            // Condición del clima
            const conditionElement = document.createElement('p');
            conditionElement.className = 'condition';
            conditionElement.textContent = ciudad.condicion;

            // Detalles adicionales (ocultos)
            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'details oculto';
            
            const humidity = document.createElement('p');
            humidity.textContent = `Humedad: ${ciudad.humedad}`;
            
            const wind = document.createElement('p');
            wind.textContent = `Viento: ${ciudad.viento}`;
            
            detailsDiv.appendChild(humidity);
            detailsDiv.appendChild(wind);

            // Botón para mostrar/ocultar detalles
            const detailsButton = document.createElement('button');
            detailsButton.className = 'details-button';
            detailsButton.textContent = 'Mostrar Detalles';
            
            // Ensamblar la tarjeta
            card.appendChild(cityTitle);
            card.appendChild(icon);
            card.appendChild(tempElement);
            card.appendChild(conditionElement);
            card.appendChild(detailsDiv);
            card.appendChild(detailsButton);

            dashboard.appendChild(card);

            // Lógica de interacción
            detailsButton.addEventListener('click', () => {
                detailsDiv.classList.toggle('oculto');
                if (detailsDiv.classList.contains('oculto')) {
                    detailsButton.textContent = 'Mostrar Detalles';
                } else {
                    detailsButton.textContent = 'Ocultar Detalles';
                }
            });

            tempElement.addEventListener('click', () => {
                if (tempElement.textContent.includes('ºC')) {
                    const tempF = (temperaturaActual * 1.8 + 32).toFixed(1);
                    tempElement.textContent = `${tempF}ºF`;
                } else {
                    tempElement.textContent = `${temperaturaActual}ºC`;
                }
            });
        });
    })
    .catch(error => {
        console.error('Ha ocurrido un error:', error);
        dashboard.innerHTML = '<p>Lo sentimos, no se pudieron cargar los datos del clima.</p>';
    });



