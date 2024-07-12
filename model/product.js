import {Sequelize} from 'sequelize';
import db from '../config/database.js';
import product_category from './product_category.js';

const {DataTypes} = Sequelize;

const product = db.define('product', {
    product_Id:{type:DataTypes.INTEGER,
        references:{
            model:product_category,
            key:'id',
        },
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

}, { freezeTableName: true });

product.belongsTo(product_category, { foreignKey: 'product_Id' });
product_category.hasMany(product, { foreignKey: 'product_Id' });

export default product;