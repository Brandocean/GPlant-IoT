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
    const display = document.getElementById('data-temperatura');
    console.trace('display', display)
    //display.addEventListener('click', () => update(display));
    update(display);
    setInterval(() => update(display), 1000);
}

async function update(display) {
    console.trace('update');
    const { temp_int } = await getData();
    const estado = (() => {
        if (temp_int > 21) {
            return "Alta";
        }
        if (temp_int >= 17 && temp_int <= 21) {
            return "Buena";
        }
        if (temp_int < 17) {
            return "Baja";
        }
    })();
    display.innerHTML = `
        <p>Luz: ${temp_int}</p>
        <p>Estado: ${estado}</p>
    `;

    drawGraph(temp_int);
}


let grafica = null;
function drawGraph(temp_int) {
    if (!grafica) {
        const g = document.getElementById('g-temperatura');
        const ctx = g.getContext("2d");

        let config = {
            type: 'doughnut',
            data: {
                datasets: [
                    {
                        data: [ temp_int, 40 - temp_int],
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
        grafica.data.datasets[0].data = [ temp_int, 40 - temp_int];
        grafica.update();
    }
}
