

// Get all dom element 
const expenseForm = document.getElementById("expenseForm"), 
expenseNameElement = document.getElementById("expenseName"),
expenseAmountElement = document.getElementById("expenseAmount"),
expenseCategoryElement = document.getElementById("expenseCategory"),
expenseDateElement = document.getElementById("expenseDate"),
expenseBodyElement = document.getElementById("AllExpenses"),
addExpenseButton =  document.getElementById("addExpenseButton"),
resetExpenseButton = document.getElementById("resetExpenseButton");


// global variable 
let expenseName, expenseAmount, expenseCategory, expenseDate;
// const allExpense = [];
const numberPettern = /^\d+$/
let allExpense =  JSON.parse(localStorage.getItem("allExpense"))
console.log(allExpense, "from gloabal");


// Form submission funciton 
expenseForm.addEventListener("submit", (event) => {

    // stop useless loading 
    event.preventDefault()
    
    // get all input value from user and store them in variables 
    expenseName =  expenseNameElement.value;
    expenseAmount = expenseAmountElement.value;
    expenseCategory = expenseCategoryElement.options[expenseCategoryElement.selectedIndex].innerText
    expenseDate = expenseDateElement.value;

    // checking form validation 
    if(isNaN(expenseName) && expenseCategory !== "Expense Category" && expenseAmount > 0 && isNaN(expenseDate)){

        // make new object with user data 
        const newExpenseObject = {
            name : expenseName,
            id : generateId(),
            amount : expenseAmount,
            category : expenseCategory,
            date : expenseDate,
        }

        if(!allExpense){
            allExpense = []
        }
        allExpense.push(newExpenseObject)
        // localStorage.setItem("allExpense", JSON.stringify(allExpense))
        setItem("allExpense", allExpense)
        setAllExpenseToTheDom()        
    }

    // throw error with missing condition 
    else{
        return alert("write something")
    }  
})


// function to set item to the localStorage 
function setItem(itemName, item){
    localStorage.setItem(itemName, JSON.stringify(item))
}


// generate unique id 
function generateId(name){
    const id = `expense${Math.floor(Math.random() * 1000000)}` 
    return id
}


// edit expense function 
function editExpense(event){
    console.log(event.target.id);
}



// function to set all expense to the dom 
function setAllExpenseToTheDom(){
    if(allExpense){
        expenseBodyElement.innerHTML = ""
        allExpense.forEach(expense => {
            const tr = document.createElement("tr")
            tr.innerHTML = `
                <td>${expense.name}</td>
                <td>${expense.amount}$</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td>
                    <button id="editButton">Edit</button>
                    <button>Delete</button>
                </td>
            `;
            expenseBodyElement.appendChild(tr)
        });
    }
}



// set data to the dom in first load 
setAllExpenseToTheDom()