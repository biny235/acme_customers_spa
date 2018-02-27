const express = require('express');
const app = express();
const db = require('./db');
const { Customer } = db.models;
app.use(require('body-parser').json())

db.sync()
    .then(()=>{
        return db.seed()
    })

app.use('/', express.static(__dirname))

app.get('/api/customers', (req, res,next)=>{
    Customer.findAll()
        .then(customers =>{
            res.send(customers)
        })
        .catch(next)
})
app.post('/api/customers', (req, res, next)=>{
    Customer.create({email: req.body.email})
        .then(customer =>{ 
            res.send(customer)
        })
        .catch(next)
})
app.delete('/api/customers/:id', (req, res, next)=>{
    Customer.findById(req.params.id)
        .then(customer => {
            customer.destroy()
        })
        .catch(next)
})
app.use((err, req, res, next)=> {
    res.status(err.status || 500).send({err});
});
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(port)
})