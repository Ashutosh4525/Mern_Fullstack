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


export const GetUser=async (req,res) => {
    try {
        const users=await User.find();
        
        return res.status(200).json({
            data: users,
            message:"User fetched successfully",
            success:true
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message:"Somethhing went wrong",
            success:false
        })
        
    }
}

export const GetSingleUser= async (req,res) => {
     try {
        const {id}=req.params;
        const user=await User.findById(id).select("-__v");

        if (!user) {
            return res.status(400).json({
            message:"User does not exist",
            success:false
        })
        }
        
        return res.status(200).json({
            data: user,
            message:"User fetched successfully",
            success:true
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message:"Somethhing went wrong",
            success:false
        })
        
    }
}

export const UpdateUser= async (req,res) => {
    try {
        const {id}=req.params;
        const user=await User.findById(id);

        //  const data=req.body;
        // console.log(data);

        // const {name,email,age}=req.body;
        // console.log(name,email,age);


        if (!user) {
            return res.status(400).json({
            message:"User does not exist",
            success:false
        })
        }
        else{
        const userdata=req.body;
        console.log(userdata);

        const {name,email,age}=req.body;
        // await User.updateOne({id});
        await User.updateOne({_id:id},{name,email,age});

        console.log(user);
        }
        return res.status(201).json({
            data: user,
            message:"User Updated successfully",
            success:true
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message:"Somethhing went wrong",
            success:false
        })
        
    }
}

export const DeleteUser= async (req,res) => {
    try {
        const {id}=req.params;
        const user=await User.findById(id);

        //  const data=req.body;
        // console.log(data);

        // const {name,email,age}=req.body;
        // console.log(name,email,age);


        if (!user) {
            return res.status(400).json({
            message:"User does not exist",
            success:false
        })
        }
        // else{
        // const userdata=req.body;
        // console.log(userdata);

        // const {name,email,age}=req.body;
        const del=await User.deleteOne({_id:id});
        console.log(del);
        // }
        return res.status(201).json({
            // data: user,
            message:"User deleted successfully",
            success:true
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message:"Somethhing went wrong",
            success:false
        })
        
    }
}