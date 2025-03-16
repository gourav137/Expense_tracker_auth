const UserModel = require("../Models/Schema");

 //const userModel = require('../Models/Schema');
const addExpenses = async(req,res)=>{
     const body = req.body;
     const { _id } = req.user;
      console.log(body,_id ) ; 
    //  res.send('sucess');

    try{
      const userData = await UserModel.findByIdAndUpdate(
            _id,
            {

    $push: { expenses: body}
            },
            {new: true}  // return update values
        );
        return res.status(200).json({
            message:"expenses added successfully",
            sucess:true,
            data: userData?.expenses
        });

    }
    catch(err){
        return res.status(500).json({
            messaage:"server issue",
            errorL:err,
            success:false
        })
    }

}


const fetchExpenses = async (req,res)=>{
    const body = req.body;
    const { _id } = req.user;
     console.log(body,_id ) ; 
   //  res.send('sucess');

   try{
     const userData = await UserModel.findById(_id).select('expenses');
       return res.status(200).json({
           message:"expenses fetched successfully",
           sucess:true,
           data: userData?.expenses
       });

   }
   catch(err){
       return res.status(500).json({
           messaage:"server issue",
           errorL:err,
           success:false
       })
   }


}
const deleteExpenses = async (req,res)=>{
     
    const { _id } = req.user;
    const {expenseId} = req.params;

   try{
     const userData = await UserModel.findByIdAndUpdate(
           _id,
           {

   $pull: { expenses: {_id:expenseId}}
           },
           {new: true}  // return update values
       );
       return res.status(200).json({
           message:"expenses deleted successfully",
           sucess:true,
           data: userData?.expenses
       });

   }
   catch(err){
       return res.status(500).json({
           messaage:"server issue",
           errorL:err,
           success:false
       })
   }
}

module.exports ={
    addExpenses,
    fetchExpenses,
    deleteExpenses
}