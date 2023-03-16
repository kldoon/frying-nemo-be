import { Router, Request, Response } from "express";
import Item from "../models/item.js";
import { MenuItem } from "../types/item.js";
import itemController from '../controllers/item';

const router = Router();

router.get('/', async (req: MenuItem.IItemRequest, res: Response) => {
    const query = req.query;
    const result = await itemController.getItems(query);
    res.send(result);
});

router.get('/:id', async (req: Request, res: Response) => {
    const result = await Item.find();
    res.send(result);
});

router.delete('/:id', async (req, res) => {
    const itemId = req.params.id;
    const result = await Item.deleteOne({ name: itemId });
    res.status(200).send('deleted successfully');
})
router.post('/', async (req: Request<{}, {}, MenuItem.IItem>, res) => {

    const item = new Item({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category
    });

    try {
        item.validate()
            .then(() => {
                item.save();
                res.status(200).send('Item added successfully');
            })
            .catch((err) => {
                console.log(err.message);
            });
    } catch (error: any) {
        res.status(500).send(error.message).end()
        console.error(error.message);
    }
});

export default router;