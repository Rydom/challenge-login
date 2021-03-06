import { Sequelize, DataTypes } from 'sequelize';

class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                fullname: {
                    type: DataTypes.STRING(255),
                    allowNull: true
                },
                email: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                    unique: true
                },
                password: {
                    type: DataTypes.STRING(255),
                    allowNull: false
                },
                active: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: true
                }
                
            },
            {
                tableName: 'user',
                modelName: 'user',
                sequelize
            }
        );
    }
}

export default User