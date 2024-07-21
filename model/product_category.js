import { Sequelize, Model } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

class ProductCategory extends Model {}

ProductCategory.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'product_category',
    tableName: 'product_categories',
    timestamps: true, // $timestamps = true in Laravel
    freezeTableName: true,
});

export default ProductCategory;
