module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER, 
            autoIncrement: true, 
            primaryKey: true, 
            allowNull: false,
        }, 
        username: {
            type: DataTypes.STRING, 
            allowNull: false, 
            unique: true,
        }, 
        password: {
            type: DataTypes.STRING,
            allowNull: false, 
        }
    }, {
        tableName: 'users',
        timestamps: true,
        underscored: true,
    });

    User.associate = function(models) {
        User.hasMany(models.Caption, {
            foreignKey: 'userId', 
            as: 'captions'
        })
    }


    return User;    
};

