const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, defaultValue: "unauthorizedUser.png", allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "USER", allowNull: false},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketItem = sequelize.define('basket_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
})

const Wishlist = sequelize.define('wish_list', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const WishlistItem = sequelize.define('wishlist_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
})

const OrderList = sequelize.define('order_list', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    isPaid: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
})

const OrderItem = sequelize.define('order_item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
})

const Game = sequelize.define('game', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING(1000), allowNull: false},
    price: {type: DataTypes.STRING, allowNull: false},
    rating: {type: DataTypes.STRING, allowNull: false, defaultValue: 7},
    img: {type: DataTypes.STRING, allowNull: false},
    trailer: {type: DataTypes.STRING, allowNull: false},
})

const Platform = sequelize.define('platform', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
})

const GamePlatform = sequelize.define('gamePlatform', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
}, {tableName: "gamePlatform"});

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

const Comment = sequelize.define('comment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING, allowNull: false},
})

const TypeSort = sequelize.define('type_sort', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    order: {type: DataTypes.JSON, allowNull: false},
})

const Key = sequelize.define('key', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    key: {type: DataTypes.STRING, unique: true, allowNull: false}
})

//корзина
User.hasOne(Basket, {foreignKey: {name: 'userId', allowNull: false}});
Basket.belongsTo(User, {foreignKey: { name: 'userId', allowNull: false}});
Basket.belongsToMany(Game, {through: BasketItem})
Game.belongsToMany(Basket, {through: BasketItem})

//список желаемого
User.hasOne(Wishlist, {foreignKey: { name: 'userId', allowNull: false}});
Wishlist.belongsTo(User, {foreignKey: { name: 'userId', allowNull: false}});
Wishlist.belongsToMany(Game, {through: WishlistItem})
Game.belongsToMany(Wishlist, {through: WishlistItem})

//список заказов
User.hasOne(OrderList, {foreignKey: {name: 'userId', allowNull: false}});
OrderList.belongsTo(User, {foreignKey: { name: 'userId', allowNull: false}});
OrderList.hasMany(Order, {foreignKey: { name: 'orderListId', allowNull: false}});
Order.belongsTo(OrderList, {foreignKey: { name: 'orderListId', allowNull: false}});
Order.belongsToMany(Game, { through: OrderItem });
Game.belongsToMany(Order, { through: OrderItem });
OrderItem.belongsTo(Order);
OrderItem.belongsTo(Game);

//комментарии
User.hasMany(Comment);
Game.hasMany(Comment);
Comment.belongsTo(User);
Comment.belongsTo(Game);

//игра
Game.hasOne(MinRequirement, {foreignKey: { name: 'gameId', allowNull: false}});
MinRequirement.belongsTo(Game, {foreignKey: { name: 'gameId', allowNull: false}});
Game.hasOne(RecRequirement, {foreignKey: { name: 'gameId', allowNull: false}});
RecRequirement.belongsTo(Game, {foreignKey: { name: 'gameId', allowNull: false}});
Game.belongsToMany(Platform, { through: GamePlatform, as: "platforms" });
Platform.belongsToMany(Game, { through: GamePlatform, as: "games" });

//ключи
Game.hasMany(Key, {foreignKey: { name: 'gameId', allowNull: false}});
Key.belongsTo(Game, {foreignKey: { name: 'gameId', allowNull: false}});
Platform.hasOne(Key, { foreignKey: 'platformId' });
Key.belongsTo(Platform, { foreignKey: 'platformId' });

module.exports = {
    User,
    Basket,
    BasketItem,
    Wishlist,
    WishlistItem,
    OrderList,
    Order,
    OrderItem,
    Game,
    Platform,
    GamePlatform,
    MinRequirement,
    RecRequirement,
    Comment,
    Key,
    TypeSort,
}
