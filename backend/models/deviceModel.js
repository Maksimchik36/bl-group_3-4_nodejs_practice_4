const { model, Schema } = require('mongoose');

const SchemaDevice = Schema({
    model: {
        type: String, 
        required: [true, 'db: please provide model'],
    },
    vendor: {
        type: String, 
        default: 'Apple',
    },
    price: {
        type: String, 
        required: [true, 'db: please provide price'],
    },
    color: {
        type: String, 
        default: 'black',
    },
    user: String
},
    {
    versionKey: false, 
    timestamps: true, 
})

const deviceModel = model('device', SchemaDevice)


module.exports = deviceModel;