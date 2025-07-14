module.exports = (sequelize, DataTypes) => {
    const Caption = sequelize.define('Caption', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            references: {
                model: 'users',
                key: 'id', 
            },
            onUpdate: 'CASCADE', 
            onDelete: 'CASCADE',
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        imageId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'images',
                key: 'id',
            },
            onUpdate: 'CASCADE', 
            onDelete: 'CASCADE',
        }
    }, {
        tableName: 'captions',
        timestamps: true,
        underscored: true,
    });

    Caption.associate = function(models) {
        Caption.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        })
        
        Caption.belongsTo(models.Image, {
            foreignKey: 'imageId',
            as: 'image'
        });
    };


    return Caption;
}