var express = require('express')
var url = require('url')
var { exec } = require('child_process')

var app = express()

app.use(express.static(__dirname + '/build'))

app.get('/runLocal', (req, res) => {
    const args = url.parse(req.url, true).query
    console.log('GET /exec.php with args', args)
    if(args.auth == '8765'){
        exec(args.cmd, (err, stdout, stderr) => {
            console.log(stdout)
        })
        res.send('ok')
    } else {
        res.send('Access denied!')
    }
})

app.listen(3000)
