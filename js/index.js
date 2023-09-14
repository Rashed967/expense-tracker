

// Get all dom element 
const expenseForm = document.getElementById("expenseForm"), 
expenseNameElement = document.getElementById("expenseName"),
expenseAmountElement = document.getElementById("expenseAmount"),
expenseCategoryElement = document.getElementById("expenseCategory"),
expenseDateElement = document.getElementById("expenseDate"),
expenseBodyElement = document.getElementById("AllExpenses"),
addExpenseButton =  document.getElementById("addExpenseButton"),
resetExpenseButton = document.getElementById("resetExpenseButton"),
cancelExpenseButtonElement = document.getElementById("cancelExpenseButton"),
editExpenseSectionElement = document.getElementById("editExpenseSection"),
editSubmitExpenseButtonElement = document.getElementById("editSubmitExpenseButton"),
editExpenseNameElement =  document.getElementById("editExpenseName"),
editExpenseAmountElement = document.getElementById("editExpenseAmount"),
editExpenseCategoryElement = document.getElementById("editExpenseCategory"),
editExpenseDateElement = document.getElementById("editExpenseDate"),
editExpenseFormElement = document.getElementById("editExpenseForm")


// global variable 
let expenseName, expenseAmount, expenseCategory, expenseDate;
const numberPettern = /^\d+$/
let allExpense =  JSON.parse(localStorage.getItem("allExpense"))


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

        // set array to the localStorage 
        if(!allExpense){
            allExpense = []
        }
        allExpense.push(newExpenseObject)
        setItem("allExpense", allExpense)
        setAllExpenseToTheDom()        
    }

    // throw error with missing condition 
    else{
        return alert("Make sure input validation!")
    }  
})


// function to set item to the localStorage 
function setItem(itemName, item){
    localStorage.setItem(itemName, JSON.stringify(item))
}


// generate unique id 
function generateId(name){
    const id = Math.floor(Math.random() * 1000000)
    return id
}


// edit expense function 
function editExpense(itemId){
    editExpenseSectionElement.classList.add("showModal")
    editExpenseFormElement.addEventListener("submit", (event) =>{
        event.preventDefault()

        // object to changed 
        let editExpenseName =  editExpenseNameElement.value;
        let editExpenseAmount = editExpenseAmountElement.value;
        let editExpenseCategory = editExpenseCategoryElement.options[editExpenseCategoryElement.selectedIndex].innerText
        let editExpenseDate = editExpenseDateElement.value;


        // checking form validation 
        if(isNaN(editExpenseName) && editExpenseCategory !== "Expense Category" && editExpenseAmount > 0 && isNaN(editExpenseDate)){

            // get index 
            const findIndex = allExpense.findIndex(expense => expense.id === itemId)

            // get element 
            const editedElement = allExpense[findIndex]
           

            // changing prop value 
            editedElement.name = editExpenseName;
            editedElement.amount = editExpenseAmount;
            editedElement.category = editExpenseCategory;
            editedElement.date = editExpenseDate;


            // allExpense.push(newExpenseObject)
            setItem("allExpense", allExpense)
            setAllExpenseToTheDom()        
        }
    
        // throw error with missing condition 
        else{
            return alert("Make sure input validation!")
        }  

        editExpenseSectionElement.classList.remove("showModal")
    })
}


// hide modal function 
cancelExpenseButtonElement.addEventListener("click", () => {
    editExpenseSectionElement.classList.remove("showModal")
    
})


// delete expense functtion 
function deleteExpense(itemId){
    allExpense = allExpense.filter(expense => expense.id !== itemId)
    setItem("allExpense", allExpense)
    setAllExpenseToTheDom()
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
                    <button id="editButton" onclick="editExpense(${expense.id})">Edit</button>
                    <button id="deleteButton" onclick="deleteExpense(${expense.id})">Delete</button>
                </td>
            `;
            expenseBodyElement.appendChild(tr)
            
        });
    }
}



// set data to the dom in first load 
setAllExpenseToTheDom()