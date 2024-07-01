const Brand = require('./Brand')
const Category = require('./Category')
const Inventory = require('./Inventory')
const Product = require('./Product')
const ProductItem = require('./ProductItem')
const PurchaseDetail = require('./PurchaseDetail')
const PurchaseOrder = require('./PurchaseOrder')
const Role = require('./Role')
const Supplier = require('./Supplier')
const User = require('./User')

User.belongsTo(Role, {
    foreignKey: 'role_id',
    as: 'role'
})
Role.hasMany(User, {
    foreignKey: 'role_id'
})

Product.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category'
})
Category.hasMany(Product, {
    foreignKey: 'category_id'
})

Product.belongsTo(Brand, {
    foreignKey: 'brand_id',
    as: 'brand'
})

Brand.hasMany(Product, {
    foreignKey: 'brand_id'
})

ProductItem.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'product'
})

Product.hasMany(ProductItem, {
    foreignKey: 'product_id',
    as: 'items'
})

PurchaseOrder.belongsTo(Supplier, {
    foreignKey: 'supplier_id',
    as: 'supplier'
})

Supplier.hasMany(PurchaseOrder, {
    foreignKey: 'supplier_id'
})

PurchaseOrder.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
})

User.hasMany(PurchaseOrder, {
    foreignKey: 'user_id'
})

PurchaseDetail.belongsTo(PurchaseOrder, {
    foreignKey: 'purchase_id',
    as: 'purchase'
})

PurchaseOrder.hasMany(PurchaseDetail, {
    foreignKey: 'purchase_id',
    as: 'details'
})

Inventory.belongsTo(ProductItem, {
    foreignKey: 'product_item_id',
    as: 'product_item'
})

ProductItem.hasOne(Inventory, {
    foreignKey: 'product_item_id'
})
