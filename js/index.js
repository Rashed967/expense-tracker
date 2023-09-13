// Get all dom element 
const expenseForm = document.getElementById("expenseForm"), 
expenseNameElement = document.getElementById("expenseName"),
expenseAmountElement = document.getElementById("expenseAmount"),
expenseCategoryElement = document.getElementById("expenseCategory"),
expenseDateElement = document.getElementById("expenseDate")
expenseBodyElement = document.getElementById("expenseBody")
addExpenseButton =  document.getElementById("addExpenseButton")
resetExpenseButton = document.getElementById("resetExpenseButton")


// global variable 
let expenseName, expenseAmount, expenseCategory, expenseDate;
const allExpense = [];
const numberPettern = /^\d+$/


// Form submission funciton 
expenseForm.addEventListener("submit", (event) => {
    event.preventDefault()
    expenseName =  expenseNameElement.value;
    expenseAmount = expenseAmountElement.value;
    expenseCategory = expenseCategoryElement.options[expenseCategoryElement.selectedIndex].innerText
    expenseDate = expenseDateElement.value;

    if(isNaN(expenseName) && isNaN(expenseAmount) && isNaN(expenseCategory)){
        console.log(expenseName);
    }
    else{
        return alert("write something")
    }

    const newExpenseObject = {
        expenseName : expenseName,
        expenseAmount : expenseAmount,
        expenseCategory : expenseCategory,
        expenseDate : expenseDate
    }


    allExpense.push(newExpenseObject)
    localStorage.setItem("allExpense", JSON.stringify(allExpense))

    
})

