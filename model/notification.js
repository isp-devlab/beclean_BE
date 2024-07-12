import {Sequelize} from 'sequelize';
import db from '../config/database.js';
import user from './userModel.js';

const {DataTypes} = Sequelize;

const notification = db.define('notification', {
    userId: {type: DataTypes.INTEGER,
        references: {
            model: user, // 'Users' would also work
            key: 'id',
        },
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, { freezeTableName: true });

user.hasMany(notification, { foreignKey: 'userId' });
notification.belongsTo(user, { foreignKey: 'userId' });

export default notification;