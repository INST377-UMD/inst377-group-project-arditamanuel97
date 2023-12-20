async function getCurrentMETAR() {
    var stationId = document.getElementById('stationId').value
    var rectCoordinates = document.getElementById('rectCoordinates').value
    var dateTime = document.getElementById('dateTime').value

    var rectCoordinatesArr = rectCoordinates.split(',')
    
    const weatherInfo = `https://aviationweather.gov/cgi-bin/data/metar.php?ids=${stationId}&format=json&taf=true&hours=1&date=${dateTime}Z`

    const response = await fetch(weatherInfo)
    var weatherData = await response.json()

    console.log(weatherData)
    
    //METAR data
    var metarId = weatherData[0].metar_id
    var stationId = weatherData[0].icaoId
    var reportTime = weatherData[0].reportTime
    var temperature = weatherData[0].temp
    var dewpoint = weatherData[0].dewp
    var windDirection = weatherData[0].wdir
    var windSpeed = weatherData[0].wspd
    var visibility = weatherData[0].visib
    var altimeter = weatherData[0].altim
    var seaLevelPressure = weatherData[0].slp

    var host = window.location.origin
    var update = await fetch(`${host}/updateMetar`, {
        method: 'POST', 
        body: JSON.stringify({
            "metarId": `${metarId}`, 
            "stationId": `${stationId}`, 
            "reportTime": `${reportTime}`, 
            "temp": `${temperature}`, 
            "dewp": `${dewpoint}`, 
            "wdir": `${windDirection}`, 
            "wspd": `${windSpeed}`, 
            "visib": `${visibility}`, 
            "altim": `${altimeter}`, 
            "slp": `${seaLevelPressure}`, 
            "coordinates": `${rectCoordinates}`
        }), 
        headers: {
            "Content-type": "application/json"
        }
    })

    var map = L.map('map').setView([rectCoordinatesArr[0], rectCoordinatesArr[1]], 4);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    
    L.marker([rectCoordinatesArr[0], rectCoordinatesArr[1]]).addTo(map);

    await getMETARs()
}

async function getMETARs() {
    var host = window.location.origin; 

    var test = await fetch(`${host}/showMetar`, {
        method: 'GET', 
        headers: {
            "Content-type": "application/json"
        }
    })
        .then((res) => res)
        .then(async res => {            
            const element = document.getElementById('errorBox')
            if (element) {
                element.remove()
            }

            if (res.status == 200 || res.status == 304){ 
                return res.json()
            }

            throw Error(JSON.stringify(await res.json()))
        })
        .then((res) => {
            const element = document.getElementById("metarTable")
            if (element) {
                element.remove()
            }

            var table = document.createElement('table')
            table.setAttribute('id', 'metarTable')
            
            var tableRow = document.createElement('tr')
            
            var th1 = document.createElement('th')
            th1.innerHTML = "metarId"
            tableRow.appendChild(th1)

            var th2 = document.createElement('th')
            th2.innerHTML = "stationId"
            tableRow.appendChild(th2)

            var th3 = document.createElement('th')
            th3.innerHTML = "reportTime"
            tableRow.appendChild(th3)

            var th4 = document.createElement('th')
            th4.innerHTML = "temp"
            tableRow.appendChild(th4)

            var th5 = document.createElement('th')
            th5.innerHTML = "dewp"
            tableRow.appendChild(th5)

            var th6 = document.createElement('th')
            th6.innerHTML = "wdir"
            tableRow.appendChild(th6)

            var th7 = document.createElement('th')
            th7.innerHTML = "wspd"
            tableRow.appendChild(th7)

            var th8 = document.createElement('th')
            th8.innerHTML = "visib"
            tableRow.appendChild(th8)

            var th9 = document.createElement('th')
            th9.innerHTML = "altim"
            tableRow.appendChild(th9)

            var th10 = document.createElement('th')
            th10.innerHTML = "slp"
            tableRow.appendChild(th10)

            var th11 = document.createElement('th')
            th11.innerHTML = "coordinates"
            tableRow.appendChild(th11)

            table.appendChild(tableRow)
        
            document.body.appendChild(table) 
            for (i = 0; i < res.length; i++) {
                var metarRow = document.createElement('tr')
                var metarId = document.createElement('td')
                var stationId = document.createElement('td')
                var reportTime = document.createElement('td')
                var temp = document.createElement('td')
                var dewp = document.createElement('td')
                var wdir = document.createElement('td')
                var wspd = document.createElement('td')
                var visib = document.createElement('td')
                var altim = document.createElement('td')
                var slp = document.createElement('td')
                var coordinates = document.createElement('td')

                metarId.innerHTML = res[i].metarId
                stationId.innerHTML = res[i].stationId
                reportTime.innerHTML = res[i].reportTime
                temp.innerHTML = res[i].temp
                dewp.innerHTML = res[i].dewp 
                wdir.innerHTML = res[i].wdir
                wspd.innerHTML = res[i].wspd
                visib.innerHTML = res[i].visib
                altim.innerHTML = res[i].altim
                slp.innerHTML = res[i].slp
                coordinates.innerHTML = res[i].coordinates

                metarRow.appendChild(metarId)
                metarRow.appendChild(stationId)
                metarRow.appendChild(reportTime)
                metarRow.appendChild(temp)
                metarRow.appendChild(dewp)
                metarRow.appendChild(wdir)
                metarRow.appendChild(wspd)
                metarRow.appendChild(visib)
                metarRow.appendChild(altim)
                metarRow.appendChild(slp)
                metarRow.appendChild(coordinates)

                table.appendChild(metarRow)
            }

        })
        .catch((error) => {
            var errorDiv = document.createElement('div')
            errorDiv.setAttribute('class', 'errorBox')
            errorDiv.setAttribute('id', 'errorBox')

            var h1 = document.createElement('h1')
            h1.innerHTML = `Error Occurred: `

            var p = document.createElement('p')
            p.innerHTML = `${JSON.parse(error.message).message}`

            errorDiv.appendChild(h1)
            errorDiv.appendChild(p)
            document.body.appendChild(errorDiv)
        })
}


