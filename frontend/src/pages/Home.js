import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {APIUrl, handleError, handleSucess } from '../utils';
import { ToastContainer } from 'react-toastify';
import ExpenseTable from './ExpenseTable';
import ExpenseDetails from './ExpenseDetails';

import ExpenseTrackerForm from './ExpenseTrackerForm';
function Home(){

    const [loggedInUser,setLoggedInUser] = useState();
    const[expenses,setExpenses] = useState([]);
    const [expenseAmt,setExpenseAmt] = useState(0);
    const [incomeAmt,setIncomeAmt] = useState(0);

const navigate = useNavigate();
    useEffect(()=>{
        setLoggedInUser(localStorage.getItem('Logged in user'))
    } ,[])


    useEffect(()=>{
        const amounts = expenses.map((item)=>item.amount);
        console.log(amounts);

        const income = amounts.filter(item=> item>0)
        .reduce((acc,item)=>(acc+=item),0);
        console.log('income:',income);



        const exp = amounts.filter(item=> item<0)
        .reduce((acc,item)=>(acc+=item),0) * -1;
        console.log('expense:',exp);

setIncomeAmt(income);
setExpenseAmt(exp);
    },[expenses]);
    const handleLogout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('Logged in user');
        handleSucess('user logged out');
        setTimeout(()=>{
navigate('/login');
        },1000)
    }

    const fetchExpenses = async()=>{
        try{
const url = `${APIUrl}/expenses`;
const token = localStorage.getItem('token');
    
const response = await fetch(url,
    {
        method:"GET",
        headers:{
            "Content-Type": "application/json",
        Authorization: `${token}`,
        }
    });
    if(response.status===403){
        navigate('/login');
        return;
    }
const result = await response.json();
setExpenses(result.data);

        }
        catch(err){
            handleError(err);
        }
    }



    const addExpenses = async(data)=>{
        try{
const url = `${APIUrl}/expenses/add`;
const token = localStorage.getItem('token');
    
const response = await fetch(url,
    {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        Authorization: `${token}`,
        },
        body:JSON.stringify(data)
    });
    if(response.status===403){
        navigate('/login');
        return;
    }
const result = await response.json();
setExpenses(result.data);

        }
        catch(err){
            handleError(err);
        }
    }




    useEffect(()=>{
        fetchExpenses()
    },[])

const handleDeleteExpense =  async(expenseId)=>{
    try{
        const url = `${APIUrl}/expenses/${expenseId}`;
        const token = localStorage.getItem('token');
            
        const response = await fetch(url,
            {
                method:"DELETE",
                headers:{
                    "Content-Type": "application/json",
                Authorization: `${token}`,
                },
                
            });
            if(response.status===403){
                navigate('/login');
                return;
            }
        const result = await response.json();
        setExpenses(result.data);
        
                }
                catch(err){
                    handleError(err);
                }
   


}

    return (
        <div>
<div className='user-section'>

            <h1>{loggedInUser}</h1>
           
            <button onClick={handleLogout}>Logout</button>
          </div>
          <ExpenseDetails incomeAmt={incomeAmt}  expenseAmt={expenseAmt}/>
          <ExpenseTrackerForm  addExpenses ={addExpenses}/>
          <ExpenseTable expenses ={expenses} handleDeleteExpense={handleDeleteExpense}/>
            <ToastContainer/>

        </div>
        
    )
}

export default Home

