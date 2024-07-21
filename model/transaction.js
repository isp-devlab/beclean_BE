import { Sequelize, Model } from 'sequelize';
import db from '../config/database.js';
import User from './userModel.js';
import ProductCategory from './product_category.js';

const { DataTypes } = Sequelize;

class Transaction extends Model {}

Transaction.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
    product_category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: ProductCategory,
            key: 'id',
        },
    },
    longitude: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    latitude: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    product_status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    transaction_status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'transaction',
    tableName: 'transactions',
    timestamps: true, // $timestamps = true in Laravel
    freezeTableName: true,
});

User.hasMany(Transaction, { foreignKey: 'user_id' });
Transaction.belongsTo(User, { foreignKey: 'user_id' });
ProductCategory.hasMany(Transaction, { foreignKey: 'product_category_id' });
Transaction.belongsTo(ProductCategory, { foreignKey: 'product_category_id' });

export default Transaction;
