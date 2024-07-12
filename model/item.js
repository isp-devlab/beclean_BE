import {Sequelize} from 'sequelize';
import db from '../config/database.js';
import transaction from './transaction.js';

const {DataTypes} = Sequelize;

const item = db.define('item', {
    transaction_Id: {type: DataTypes.INTEGER,
        references: {
            model: transaction, // 'Users' would also work
            key: 'id',
        },
    },
    product: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ammount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, { freezeTableName: true });

item.belongsTo(transaction, { foreignKey: 'transaction_Id' });
transaction.hasMany(item, { foreignKey: 'transaction_Id' });

export default item;