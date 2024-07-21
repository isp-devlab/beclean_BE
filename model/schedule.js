import { Sequelize, Model } from 'sequelize';
import db from '../config/database.js';
import User from './userModel.js';
import Transaction from './transaction.js';

const { DataTypes } = Sequelize;

class Schedule extends Model {}

Schedule.init({
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
    transaction_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Transaction,
            key: 'id',
        },
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: db,
    modelName: 'schedule',
    tableName: 'schedules',
    timestamps: true, // $timestamps = true in Laravel
    freezeTableName: true,
});

User.hasMany(Schedule, { foreignKey: 'user_id' });
Schedule.belongsTo(User, { foreignKey: 'user_id' });
Transaction.hasMany(Schedule, { foreignKey: 'transaction_id' });
Schedule.belongsTo(Transaction, { foreignKey: 'transaction_id' });

export default Schedule;
