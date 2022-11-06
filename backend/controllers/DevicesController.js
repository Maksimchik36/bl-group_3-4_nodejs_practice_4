// обертка для контроллеров для отлавливания ошибок (аналог try/catch)
const asyncHandler = require('express-async-handler');

const { deviceModel } = require('../models');


class DevicesController {
    create = asyncHandler(async (req, res) => {
        const { model, price } = req.body;
        if (!model || !price) {
            res.status(400);
            throw new Error("Model and price are required.");
        }
        const data = await deviceModel.create({ ...req.body });
        
        if (!data) {
            res.status(400);
            throw new Error("Unable to save in data base.");            
        }

        res.status(201).json({ code: 201, status: 'Success', data })        
    });
    

    getAll = asyncHandler(async(req, res) => {
        const data = await deviceModel.find({});
        if (!data) {
            res.status(400);
            throw new Error("Unable to fetch devices.");             
        }

        res.status(200).json({ code: 200, status: 'Success', data, total: data.length })                
    });
    

    getOne = asyncHandler(async(req, res) => {
        const {_id} = req.params;
    });
    

    update = asyncHandler(async(req, res) => {
        res.send("Update device")
    });
    

    delete = asyncHandler(async(req, res) => {
        res.send("Delete device")        
    });
}



// express.get('/', asyncHandler(async (req, res, next) => {
// 	const bar = await foo.findAll();
// 	res.send(bar)
// }))


module.exports = new DevicesController();