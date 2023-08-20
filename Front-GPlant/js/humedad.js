document.addEventListener('DOMContentLoaded', load);

const api = 'gplant-env-1.eba-2mea4cph.us-east-1.elasticbeanstalk.com';

/*
{
    "lectureNo":562,
    "plantNo":"P005",
    "dia":"2021-12-02T06:00:00.000Z",
    "hora":"01:58:26",
    "humedad":100,
    "temp_int":24.4,
    "humedad_out":100, // humedad del ambiente
    "luz_solar":16
}

*/
async function getData() {
    return fetch(`http://${api}/last`)
        .then(response => response.json())
        .then(json => json[0]);
}

function load() {
    const display = document.getElementById('data-humedad-tierra');
    console.trace('display', display)
    //display.addEventListener('click', () => update(display));
    update(display);
    setInterval(() => update(display), 1000);
}

async function update(display) {
    console.trace('update');
    const { humedad } = await getData();
    const estado = (() => {
        if (humedad >= 100) {
            return "Tiene agua";
        }
        if (humedad <= 1) {
            return "Tiene sed";
        }
    })();
    display.innerHTML = `
        <p>Humedad: ${humedad}</p>
        <p>Estado: ${estado}</p>
    `;

    drawGraph(humedad);
}


let grafica = null;
function drawGraph(humedad) {
    if (!grafica) {
        const g = document.getElementById('g-humedad-tierra');
        const ctx = g.getContext("2d");

        let config = {
            type: 'doughnut',
            data: {
                datasets: [
                    {
                        data: [ humedad, 100 - humedad],
                        backgroundColor: [
                            '#29BB2E',
                            '#f54242'
                        ]
                    }
                ]
            }
            ,
            options: {
                responsive: true,
                circumference: 180,
                rotation: -90,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                }
            }
        }
        grafica = new Chart(ctx, config)
    } else {
        grafica.data.datasets[0].data = [ humedad, 100 - humedad];
        grafica.update();
    }
}