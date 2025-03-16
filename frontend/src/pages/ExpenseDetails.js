import React from "react"; 


function ExpenseDetails({incomeAmt,expenseAmt}){
    return (
        <div> 
            <div>
                your balance is {incomeAmt-expenseAmt}
            </div>
         <div className="amounts-container">
              income
              <span className="income-amt">{incomeAmt}</span>

              expense
              <span className="exp-amt">{expenseAmt}</span>

         </div>

        </div>
    )

}

export default ExpenseDetails