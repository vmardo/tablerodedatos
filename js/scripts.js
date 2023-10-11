const codigos = {
    "Antofagasta" : "SCFA",
    "Arch. Juan Fernández" : "SCIR",
    "Arica" : "SCAR",
    "Balmaceda" : "SCBA",
    "Calama" : "SCCF",
    "Caldera" : "SCAT",
    "Chile Chico" : "SCCC",
    "Chillán" : "SCCH",
    "Cochrane" : "SCHR",
    "Concepción" : "SCIE",
    "Coyhaique" : "SCCY",
    "Curicó" : "SCIC",
    "Futaleufú" : "SCFT",
    "Iquique" : "SCDA",
    "Isla de Pascua" : "SCIP",
    "La Serena/Coquimbo" : "SCSE",
    "Los Ángeles" : "SCGE",
    "Melinka" : "SCMK",
    "Osorno" : "SCJO",
    "Península Antártica" : "SCRM",
    "Porvenir" : "SCFM",
    "Puerto Aysén" : "SCAS",
    "Puerto Montt" : "SCTE",
    "Puerto Natales" : "SCNT",
    "Puerto Williams" : "SCGZ",
    "Punta Arenas" : "SCCI",
    "Quellón" : "SCON",
    "Quellón" : "SCTN",
    "Rancagua" : "SCRG",
    "Rodelillo" : "SCRD",
    "San Antonio/Cartagena" : "SCSN",
    "Santiago Centro" : "SCQN",
    "Santiago Oriente" : "SCTB",
    "Santiago Poniente" : "SCEL",
    "Temuco" : "SCQP",
    "Valdivia" : "SCVD",
    "Viña del Mar/Valparaíso" : "SCVM",
}

document.addEventListener('DOMContentLoaded', iniciarApp);


function iniciarApp(){

    console.log('iniciando....')
    obtenerClimaCodigo();

    const formulario = document.querySelector('#formulario');
    formulario.addEventListener('submit', e =>{
        e.preventDefault();

        const busqueda = document.querySelector('#busqueda');
        const codigo = codigos[busqueda.value];
        obtenerClimaCodigo(codigo)

    })

    obtenerClimaCiudades();
    

}



const obtenerClimaCodigo = async (codigo= 'SCRM') => {

    const URL = 'https://api.gael.cloud/general/public/clima/'
    const respuesta = await fetch(URL + codigo);
    const datos = await respuesta.json();

    console.log(datos)
    actualizarClima(datos)

}

const actualizarClima = data => {
    //seleccionando elementos html
    const spanCiudad = document.querySelector('h3 span');
    const hora = document.querySelector(".hora");
    const estado = document.querySelector(".estado");
    const imagen = document.querySelector(".icono-estado");
    const temperatura = document.querySelector("p span ");
    const humedad = document.querySelector(".humedad span" );


    spanCiudad.textContent = data.Estacion;
    hora.textContent = data.HoraUpdate;
    estado.textContent = data.Estado;
    imagen.setAttribute('src', 'img/' + data.Icono);

    temperatura.textContent = data.Temp;
    humedad.textContent = data.Humedad;




}

const obtenerClimaCiudades = async () => {

    const URL = 'https://api.gael.cloud/general/public/clima/'
    const respuesta = await fetch(URL);
    const datos = await respuesta.json();
    obtenerCiudadesAleatorias(datos, 7)
    return datos;
}



const obtenerCiudadesAleatorias = (ciudades, cantidad) => {

    const ciudadesAleatorias = [];

    for (let i = 0; i < cantidad ; i++ ){

        const numeroAleatorio = Math.floor( Math.random() * ciudades.length );
        ciudadesAleatorias.push(ciudades[numeroAleatorio]);
    }
    generarGrafico(ciudadesAleatorias);

}


const generarGrafico = (ciudades) => {

    console.log('Vamos a generar un grafico con las ciudades: ')


    const estaciones =  ciudades.map( ciudad =>  ciudad.Estacion );
    const temperaturaCiudad = ciudades.map( ciudad => ciudad.Temp);
    

    console.log(estaciones)
    console.log( temperaturaCiudad)
    const ctx = document.querySelector('#miGrafico');

    const config = {
        type: 'bar',
        data: {
            labels: estaciones,
            datasets: [{
                label: 'Temperatura C',
                data: temperaturaCiudad,
                borderWidth: 1,
                borderColor: '#36A2EB',
            }]
        },
        options: {
            scales: {
            y: {
                beginAtZero: true
            }
            }
        }
        
    }
    

    const graficoBarras = new Chart(ctx, config);



}

