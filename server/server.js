const Routes = require('./routes/Routes')



const express = require('express');

const PORT = 3001;

const app = new express();

app.use(express.json());
app.use('', Routes)




app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));

module.exports = app;