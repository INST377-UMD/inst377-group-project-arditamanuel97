const express = require('express')
var bodyParser = require('body-parser')
const supabaseClient = require('@supabase/supabase-js')
const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

const supabaseUrl = 'https://sowgbxuivmhqfokmixyf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvd2dieHVpdm1ocWZva21peHlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI1NjYzMDksImV4cCI6MjAxODE0MjMwOX0.qomn1R8VoI48mzd6flw6_NJ_NhTWhScwVmFFRXysi9c'
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey)

app.get('/', (req, res) => {
    res.sendFile('public/metarInfoPage.html', {root: __dirname})
})

app.get('/showMetar', async (req, res) => {
    const {data, error} = await supabase
        .from('METAR_reports')
        .select(); 
    
    if (error) {
        console.log(error)
    } else if (data) {
        res.send(data)
    }
})

app.post('/updateMetar', async (req, res) => {
    var metarId = req.body.metarId
    var stationId = req.body.stationId
    var reportTime = req.body.reportTime
    var temp = parseFloat(req.body.temp)
    var dewp = parseFloat(req.body.dewp) 
    var wdir = req.body.wdir
    var wspd = req.body.wspd 
    var visib = req.body.visib 
    var altim = parseFloat(req.body.altim)
    var slp = parseFloat(req.body.slp)
    var coordinates = req.body.coordinates

    const {data, error} = await supabase 
        .from('METAR_reports')
        .insert([
            {'metarId': metarId, 'stationId': stationId, 'reportTime': reportTime, 'temp': temp, 'dewp': dewp, 'wdir': wdir, 'wspd': wspd, 'visib': visib, 'altim': altim, 'slp': slp, 'coordinates': coordinates}
        ])
        .select();

    res.header('Content-type', 'application/json')
    res.send(data)
})

app.listen(port, () => {
    console.log('APP is RUNNING')
})