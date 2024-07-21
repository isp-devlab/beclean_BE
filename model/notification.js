import { Sequelize, Model } from 'sequelize';
import db from '../config/database.js';
import user from './userModel.js';

const { DataTypes } = Sequelize;

class Notification extends Model {}

Notification.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: user, // 'user' is the model name
            key: 'id',
        },
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'notification',
    tableName: 'notifications',
    timestamps: true, // $timestamps = true in Laravel
    freezeTableName: true,
});

user.hasMany(Notification, { foreignKey: 'user_id' });
Notification.belongsTo(user, { foreignKey: 'user_id' });

export default Notification;