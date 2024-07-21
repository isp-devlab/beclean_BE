import { Sequelize, Model } from 'sequelize';
import db from '../config/database.js';
import ProductCategory from './product_category.js';

const { DataTypes } = Sequelize;

class Product extends Model {}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    product_category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: ProductCategory,
            key: 'id',
        },
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'product',
    tableName: 'products',
    timestamps: true, // $timestamps = true in Laravel
    freezeTableName: true,
});

Product.belongsTo(ProductCategory, { foreignKey: 'product_category_id' });
ProductCategory.hasMany(Product, { foreignKey: 'product_category_id' });

export default Product;