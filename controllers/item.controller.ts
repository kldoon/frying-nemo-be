import mongoose from "mongoose";
import { Item } from "../models/index";
import { MenuItem } from "../types/index";

const getItems = async (params: MenuItem.IItemQuery) => {
    const query: mongoose.FilterQuery<MenuItem.IItem> = {}

    if (params.maxPrice !== undefined) {
        query.price = { $lte: params.maxPrice }
    }

    const categories = JSON.parse(params.categories || '[]');
    if (categories.length) {
        query.category = { $in: categories }
    }

    if (params.searchTerms) {
        const RegEx = new RegExp(params.searchTerms, 'i');
        query.$or = [
            { name: RegEx },
            { description: RegEx },
            { category: RegEx },
            { ingredients: RegEx }
        ]
    }

    const items = await Item.find(query, null, { sort: { '_id': -1 } }); // -1: desc
    return items;
}

const getItemById = async (id: string) => {
    const itemDoc = await Item.findById(id);
    if (itemDoc) {
        const item: MenuItem.IItem = {
            name: itemDoc.name,
            price: itemDoc.price,
            category: itemDoc.category,
            description: itemDoc.description || '',
            imageURL: itemDoc.imageURL || '',
            ingredients: itemDoc.ingredients
        }
        return itemDoc;
    }
    return null;
}

const deleteItemById = async (id: string) => {
    const itemDoc = await Item.findOneAndDelete({ _id: { $eq: id } });
    if (itemDoc) {
        return itemDoc;
    }
    return null;
}

const updateItem = async (id: string, newItem: MenuItem.IItem) => {
    const itemDoc = await Item.findOneAndUpdate({ _id: { $eq: id } }, newItem);
    if (itemDoc) {
        return itemDoc;
    }
    return null;
}

const createItem = (body: MenuItem.IItem) => {
    const newItem = new Item({
        name: body.name,
        category: body.category,
        price: body.price,
        ingredients: body.ingredients,
        description: body.description,
        imageURL: body.imageURL
    })

    return newItem.save() // returning a promise
}

export default {
    getItems,
    createItem,
    getItemById,
    deleteItemById,
    updateItem
}