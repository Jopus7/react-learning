
import { useState } from "react";

type Expense = {
  id: string;
  name: string;
  amount: number;
  paid:boolean;
};

function AddExpense() {

  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleAddExpense = () => {
    if (!name.trim() || amount <= 0) {
      
      return;
    }

    const newExpense: Expense = {
      id: crypto.randomUUID(),
      name,
      amount,
      paid:false,
    };

    setExpenses((previousExpenses) => [
      ...previousExpenses,
      newExpense,
    ]);

    setName("");
    setAmount(0);
  };

  const total = expenses.reduce(
  (sum, expense) => sum + expense.amount,
  0
);

const deleteExpense = (id:string)=>{
  // const expToDelete = expenses.filter((exp) = > exp == name);
  const result = expenses.filter((expense) => expense.id !== id)
  setExpenses((result))
}
const markAsPaid = (id:string) =>{
  const result = expenses.map((expense)=>{
    
    if(expense.id === id){
      return {...expense, paid:true}
    }    
    return expense;
  }
)
  setExpenses(result)
  
}

  return (
    <div>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Nazwa wydatku"
      />

      <input
        type="number"
        value={amount}
        onChange={(event) => setAmount(Number(event.target.value))}
      />

      <button onClick={handleAddExpense}>
        Dodaj
      </button>

      <h3>Lista wydatków</h3>

          {expenses.map((expense) => (
            <div key={expense.id}>
              <p>
                {expense.name}: {expense.amount} zł
                Status: {expense.paid ? "Opłacony" : "Nieopłacony"}
              </p>

              {!expense.paid && (
                <button onClick={() => markAsPaid(expense.id)}>
                  Oznacz jako opłacony
                </button>
              )}

              <button onClick={() => deleteExpense(expense.id)}>
                Usuń
              </button>
            </div>
          ))}
      <p>Łącznie: {total} zł</p>
    </div>
  );
}

export default AddExpense;
