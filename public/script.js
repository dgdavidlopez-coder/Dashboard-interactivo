// ====== Gráfico de ventas ======
const ctx = document.getElementById('graficoVentas').getContext('2d');
const graficoVentas = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [{
            label: 'Ventas',
            data: [120, 150, 180, 90, 200, 250],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.4,
			fill: true
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// ====== Botón modo oscuro ======
const toggleDark = document.getElementById('toggleDark');
toggleDark.addEventListener('click', () => {
    document.body.classList.toggle('dark');
	//Cambiar icono dinamicamente
	if(document.body.classList.contains('dark')){
		toggleDark.innerHTML = '<i class="bi bi-brightness-high"></i> Modo Claro';
	}else{
		toggleDark.innerHTML = '<i class="bi bi-moon"></i> Modo Oscuro';
	}
});

// ====== Datos de CoinGecko (Criptomonedas) ======
async function cargarCriptos() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd");
    const data = await res.json();

    // Insertamos datos en las tarjetas
    document.getElementById("usuarios").innerText = `${data.bitcoin.usd}`;
    document.getElementById("ventas").innerText = `$${data.ethereum.usd}`;
    document.getElementById("ganancias").innerText = `${data.solana.usd}`;
    document.getElementById("pedidos").innerText = "Actualizado ✔️";

    // Actualizamos gráfico con precios
    graficoVentas.data.labels = ["BTC", "ETH", "SOL"];
    graficoVentas.data.datasets[0].data = [
      data.bitcoin.usd,
      data.ethereum.usd,
      data.solana.usd
    ];
    graficoVentas.update();
  } catch (error) {
    console.error("Error al cargar datos de criptos:", error);
  }
}

// ====== API Key de OpenWeatherMap ======
// ⚠️ Sustituye con tu propia API key gratuita
const apiKey = "87b057aaa67257837f92a432ec404197";

// ====== Función para cargar clima desde nuestro backend ======
async function cargarClima(ciudad = "Madrid") {
  try {
    const res = await fetch(`/clima?ciudad=${ciudad}`);
    if (!res.ok) throw new Error("Ciudad no encontrada");
    const data = await res.json();

    // Insertamos datos en el dashboard
    document.getElementById("ciudad").innerText = data.name;
    document.getElementById("temp").innerText = `${data.main.temp} °C`;
    document.getElementById("humedad").innerText = `${data.main.humidity}%`;
  } catch (error) {
    document.getElementById("ciudad").innerText = "❌ Error";
    document.getElementById("temp").innerText = "-";
    document.getElementById("humedad").innerText = "-";
    console.error("Error al cargar datos del clima:", error);
  }
}

// ====== Buscador de ciudades ======
const formClima = document.getElementById("formClima");
formClima.addEventListener("submit", (e) => {
  e.preventDefault();
  const ciudad = document.getElementById("inputCiudad").value.trim();
  if (ciudad) {
    cargarClima(ciudad);
	//Guardamos la ciudad en localStorage
	localStorage.setItem("ultimaCiudad", ciudad);
  }
});

// ====== Inicialización ======
cargarCriptos();
setInterval(cargarCriptos, 60000);

// Cargar clima de última ciudad buscada o por defecto
const ciudadGuardada = localStorage.getItem("ultimaCiudad");
	if (ciudadGuardada) {
  		cargarClima(ciudadGuardada);
  		document.getElementById("inputCiudad").value = ciudadGuardada;
	} else {
  		cargarClima("Madrid");
	}
	
setInterval(() => {
  const ciudad = localStorage.getItem("ultimaCiudad") || "Madrid";
  cargarClima(ciudad);
}, 60000);