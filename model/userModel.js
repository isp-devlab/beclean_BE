import { Sequelize, Model } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    access_token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: db,
    modelName: 'user',
    tableName: 'users',
    timestamps: true, // $timestamps = true in Laravel
    freezeTableName: true,
});

export default User;
