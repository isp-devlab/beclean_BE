import {Sequelize} from 'sequelize';
import db from '../config/database.js';
import user from './userModel.js';
import transaction from './transaction.js';

const {DataTypes} = Sequelize;

const schedule = db.define('schedule', {
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, { freezeTableName: true });

user.hasMany(schedule, { foreignKey: 'userId' });
schedule.belongsTo(user, { foreignKey: 'userId' });
transaction.hasMany(schedule, { foreignKey: 'transactionId' });
schedule.belongsTo(transaction, { foreignKey: 'transactionId' });

export default schedule;