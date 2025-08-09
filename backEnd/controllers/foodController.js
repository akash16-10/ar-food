import foodModel from "../models/foodModel.js";
import fs from 'fs'


//add food

const addFood = async (req, res)=>{
        let image_filename = `${req.file.filename}`;
        const {name, description, price, category} = req.body;
        const food = new foodModel({
            name,
            description,
            price, 
            category,
            image : image_filename
        })

        try{
            await food.save();
            res.json({success:true, message:"Food Added"});
        } catch(err){
            console.log(err)
            res.json({success:false, message:"Error"})
        }

}

//all food list

const listFood = async (req, res)=>{
    const food = await foodModel.find();
    try{
        res.json({success:true, foods:food});
    }catch(err){
        console.log(err)
        res.json({success:false, message:"Error"});
    }
}

//remove Food item

const removeFood = async (req, res)=>{
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, ()=>{});
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true , message : "Food Removed"});
    } catch (error) {
        console.log(error);
        res.json({success:false , message : "Error"});        
    }
    
}


export {addFood, listFood, removeFood}