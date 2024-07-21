import { Sequelize, Model } from 'sequelize';
import db from '../config/database.js';
import transaction from './transaction.js';

const { DataTypes } = Sequelize;

class Item extends Model {}

Item.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    transaction_id: {
        type: DataTypes.INTEGER,
        references: {
            model: transaction, // 'transaction' is the model name
            key: 'id',
        },
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'item',
    tableName: 'items',
    timestamps: true, // $timestamps = true in Laravel
    freezeTableName: true,
});

Item.belongsTo(transaction, { foreignKey: 'transaction_id' });
transaction.hasMany(Item, { foreignKey: 'transaction_id' });

export default Item;
