const conn = require('./conn');
const { Sequelize } = conn;

const Customer = conn.define('customer', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    }
});

module.exports = Customer;