const conn = require('./conn');
const Customer = require('./Customer');

const sync = ()=>{
    return conn.sync({force: true})
}

const seed = ()=>{

    Promise.all([
        Customer.create({email: 'joe@gmail.com'}),
        Customer.create({email: 'jack@gmail.com'}),
        Customer.create({email: 'steve@gmail.com'}),
    ])

}


module.exports = {
    sync,
    seed,
    models: {
        Customer
    }
}