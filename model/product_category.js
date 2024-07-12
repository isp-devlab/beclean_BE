import {Sequelize} from 'sequelize';
import db from '../config/database.js';

const {DataTypes} = Sequelize;

const product_category = db.define('product_category', {
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
}, { freezeTableName: true });

export default product_category;