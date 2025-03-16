import React,{ useState} from "react";
import { handleError } from "../utils";


function ExpenseTrackerForm({addExpenses}){

    const[expenseInfo,setExpenseInfo] = useState({
text:'',amount:''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyexpenseInfo = { ...expenseInfo };
        copyexpenseInfo[name] = value;
        setExpenseInfo(copyexpenseInfo);
    }

    const handleExpense =(e)=>{
        e.preventDefault();
        console.log(expenseInfo);
        const{text,amount} = expenseInfo;
        if(!text || !amount){
            handleError('please enter all feilds');
            return;
        }
        setTimeout(()=>{
            setExpenseInfo({text:'',amount:''});
        },1000)
        addExpenses(expenseInfo);
        
    }
return (
    <div className='container'>
            <h1>ADD EXPENSE</h1>
            <form onSubmit={handleExpense} >
                <div>
                    <label htmlFor='text'>Expense type</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='text'
                        placeholder='Enter your Expense info' />
                </div>
                <div>
                    <label htmlFor='amount'>Amount</label>
                    <input
                        onChange={handleChange}
                        type='number'
                        name='amount'
                        placeholder='Enter your Amount Expense(-ve) Income(+ve)...' />
                </div>
                <button type='submit'>Add expense</button>
               
            </form>

        </div>
)
}

export default ExpenseTrackerForm

