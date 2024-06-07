const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) =>
{
    const username = req.headers.username;
        const password =req.headers.password;
    const kidneyid = req.headers.kidneyid;
    if (username!="hammad" || password!="pass") {
        res.status(400).json({ "msg": "something up with your inputs" })
        return
    }
    if (kidneyid!=1 && kidneyid!=2) {
        res.status(400).json({ "msg": "something up with your inputs" })
        return
    }
    res.json({
     msg:"your kidney is"
 })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))