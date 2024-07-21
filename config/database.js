import {Sequelize} from 'sequelize';

const db = new Sequelize('joki_bpk','root','',{
    host: "localhost",
    dialect: "mysql"
});

export default db;