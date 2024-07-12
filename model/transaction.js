import {Sequelize} from 'sequelize';
import db from '../config/database.js';
import user from './userModel.js';
import product_category from './product_category.js';

const {DataTypes} = Sequelize;

const transaction = db.define('transaction', {
    user_Id: {type: DataTypes.INTEGER,
        references: {
            model: user, // 'Users' would also work
            key: 'id',
        },
    },
    product_category_Id: {
        type: DataTypes.INTEGER,
        references: {
            model: product_category,
            key: 'id',
        },
    },
    longitude: {
        type: DataTypes.STRING,
        allowNull: false
    },
    latitude: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status_product: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status_transaction: {
        type: DataTypes.STRING,
        allowNull: false
    },

}, { freezeTableName: true });

user.hasMany(transaction, { foreignKey: 'user_Id' });
transaction.belongsTo(user, { foreignKey: 'user_Id' });
product_category.hasMany(transaction, { foreignKey: 'product_category_Id' });
transaction.belongsTo(product_category, { foreignKey: 'product_category_Id' });

export default transaction;
