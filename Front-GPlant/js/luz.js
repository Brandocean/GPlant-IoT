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
    const display = document.getElementById('data-luz');
    console.trace('display', display)
    //display.addEventListener('click', () => update(display));
    update(display);
    setInterval(() => update(display), 1000);
}

async function update(display) {
    console.trace('update');
    const { luz_solar } = await getData();
    const estado = (() => {
        if (luz_solar > 250) {
            return "Alto";
        }
        if (luz_solar >= 70 && luz_solar <= 250) {
            return "Bueno";
        }
        if (luz_solar < 70) {
            return "Bajo";
        }
    })();
    display.innerHTML = `
        <p>Luz: ${luz_solar}</p>
        <p>Estado: ${estado}</p>
    `;

    drawGraph(luz_solar);
}


let grafica = null;
function drawGraph(luz_solar) {
    if (!grafica) {
        const g = document.getElementById('g-luz');
        const ctx = g.getContext("2d");

        let config = {
            type: 'doughnut',
            data: {
                datasets: [
                    {
                        data: [ luz_solar, 600 - luz_solar],
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
        grafica.data.datasets[0].data = [ luz_solar, 600 - luz_solar];
        grafica.update();
    }
}
