import User from "../model/user.model";

export const CreateUser= async(req,res)=>{
    try {

        const data=req.body;
        console.log(data);

        const {name,email,age}=req.body;
        console.log(name,email,age);


        //creating a new instance for new users
        const user=new User({name,email,age});

        const result=await user.save();
        
        return res.status(201).json({
            data:result,
            message:"All Good",
            success:true
        })
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Something went wrong",
            success:false
        })
        
    }
}