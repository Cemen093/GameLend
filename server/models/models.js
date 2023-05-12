const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, defaultValue: "user.png", allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "USER", allowNull: false},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketItem = sequelize.define('basket_game', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
})

const WishList = sequelize.define('wish_list', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const WishListItem = sequelize.define('wish_list_game', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
})

const Game = sequelize.define('game', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING(1000), allowNull: false},
    platform: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    trailer: {type: DataTypes.STRING, allowNull: false},
})

const Comment = sequelize.define('comment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING, allowNull: false},
    date: {type: DataTypes.DATE, allowNull: false},
})

const Key = sequelize.define('key', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    key: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const MinRequirement = sequelize.define('min_requirement', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    cpu: {type: DataTypes.STRING, allowNull: false},
    ram: {type: DataTypes.STRING, allowNull: false},
    os: {type: DataTypes.STRING, allowNull: false},
    space: {type: DataTypes.STRING, allowNull: false},
})

const RecRequirement = sequelize.define('rec_requirement', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    cpu: {type: DataTypes.STRING, allowNull: false},
    ram: {type: DataTypes.STRING, allowNull: false},
    os: {type: DataTypes.STRING, allowNull: false},
    space: {type: DataTypes.STRING, allowNull: false},
})

const UserGame = sequelize.define('user_game', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.DATE, allowNull: false},
})

User.hasOne(Basket, {foreignKey: {name: 'userId', allowNull: false}});
User.hasOne(WishList, {foreignKey: { name: 'userId', allowNull: false}});

Basket.belongsTo(User, {foreignKey: { name: 'userId', allowNull: false}});
WishList.belongsTo(User, {foreignKey: { name: 'userId', allowNull: false}});

Game.hasOne(MinRequirement, {foreignKey: { name: 'gameId', allowNull: false}});
Game.hasOne(RecRequirement, {foreignKey: { name: 'gameId', allowNull: false}});

MinRequirement.belongsTo(Game, {foreignKey: { name: 'gameId', allowNull: false}});
RecRequirement.belongsTo(Game, {foreignKey: { name: 'gameId', allowNull: false}});

User.belongsToMany(Game, {through: UserGame})
Game.belongsToMany(User, {through: UserGame})

Basket.belongsToMany(Game, {through: BasketItem})
Game.belongsToMany(Basket, {through: BasketItem})

WishList.belongsToMany(Game, {through: WishListItem})
Game.belongsToMany(WishList, {through: WishListItem})

Comment.belongsTo(User);
Comment.belongsTo(Game);

User.hasMany(Comment);
Game.hasMany(Comment);

Game.hasMany(Key, {foreignKey: { name: 'gameId', allowNull: false}});
Key.belongsTo(Game, {foreignKey: { name: 'gameId', allowNull: false}});

module.exports = {
    User,
    Basket,
    WishList,
    Game,
    Comment,
    Key,
    MinRequirement,
    RecRequirement,
    BasketItem,
    WishListItem,
    UserGame,
}
