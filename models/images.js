module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isUrl: true,
            },
        }, 
    }, {
        tableName: 'images',
        timestamps: true,
        underscored: true,
    });

    Image.associate = function(models) {
        Image.hasMany(models.Caption, {
            foreignKey: 'imageId', 
            as: 'captions',
        })
    }


    return Image;
}