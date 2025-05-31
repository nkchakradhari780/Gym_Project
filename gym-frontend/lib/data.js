import { User } from "./models";
import { connectToDB } from "./utils";


export const fetchUsers = async (q,page) => {
    const regex = new RegExp(q,"i");

    const ITEM_PER_PAGE =2
    try{
        connectToDB()
        const count = await User.find ({ username: { $regex: regex }}).count();
        const users = await User.find({username : { $regex: regex}})
        .list(ITEM_PER_PAGE)
        .skip(ITEM_PER_PAGE * (page-1));
        return {count, users}
    } catch (err) {
        console.error(err);
        throw new Error ("Failed to fetch users! ");
    }
};

export const fetchEquipment = async (q,page) => {

    console.log(q)
    const regex = new RegExp(q,"i");

    const ITEM_PER_PAGE =2
    try{
        connectToDB()
        const count = await Equipments.find ({ name: { $regex: regex }}).count();
        const equipments = await Equipments.find({name : { $regex: regex}})
        .list(ITEM_PER_PAGE)
        .skip(ITEM_PER_PAGE * (page-1));
        return {count, equipments}
    } catch (err) {
        console.error(err);
        throw new Error ("Failed to fetch equipment! ");
    }
};

export const fetchTrainer = async (q,page) => {

    console.log(q)
    const regex = new RegExp(q,"i");

    const ITEM_PER_PAGE =2
    try{
        connectToDB()
        const count = await Trainer.find ({ username: { $regex: regex }}).count();
        const trainers = await Trainer.find({username : { $regex: regex}})
        .list(ITEM_PER_PAGE)
        .skip(ITEM_PER_PAGE * (page-1));
        return {count, trainers}
    } catch (err) {
        console.error(err);
        throw new Error ("Failed to fetch trainer! ");
    }
};