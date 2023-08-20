document.addEventListener('DOMContentLoaded', load2);

const api2 = 'gplant-env-1.eba-2mea4cph.us-east-1.elasticbeanstalk.com';

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
async function getData2() {
    return fetch(`http://${api2}/last`)
        .then(response => response.json())
        .then(json => json[0]);
}

function load2() {
    const display2 = document.getElementById('data-humedad-ambiente');
    console.trace('display', display2)
    //display.addEventListener('click', () => update(display)); grafica
    update2(display2);
    setInterval(() => update2(display2), 1000);
}

async function update2(display2) {
    console.trace('update');
    const { humedad_out } = await getData2();
    const estado2 = (() => {
        if (humedad_out > 110) {
            return "Alta";
        }
        if (humedad_out >= 90 && humedad_out <= 110) {
            return "Buena";
        }
        if (humedad_out < 90) {
            return "Baja";
        }
    })();
    display2.innerHTML = `
        <p>Humedad Ambiental: ${humedad_out}</p>
        <p>Estado: ${estado2}</p>
    `;

    drawGraph2(humedad_out);
}


let grafica2 = null;
function drawGraph2(humedad_out) {
    if (!grafica2) {
        const g2 = document.getElementById('g-humedad-ambiente');
        const ctx2 = g2.getContext("2d");

        let config2 = {
            type: 'doughnut',
            data: {
                datasets: [
                    {
                        data: [ humedad_out, 130 - humedad_out],
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
        grafica2 = new Chart(ctx2, config2)
    } else {
        grafica2.data.datasets[0].data = [ humedad_out, 130 - humedad_out];
        grafica2.update();
    }
}