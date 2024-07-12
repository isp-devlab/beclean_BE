import {Sequelize} from 'sequelize';

const db = new Sequelize('wasteapp_db','root','',{
    host: "localhost",
    dialect: "mysql"
});

export default db;