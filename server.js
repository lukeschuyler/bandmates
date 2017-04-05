const express = require('express')
const app = express()

app.use(express.static(__dirname + '/'))

app.use((req, res, next) => {
	res.send('<h1>Nothing Here</h1>')
})

app.listen(8080, () => {
	console.log('bandmates')
})
