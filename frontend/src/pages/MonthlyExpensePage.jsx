import React, { useState } from "react";
import { Button, Form, Card, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar"; // تأكد من أنك تستورد Sidebar

const MonthlyExpensesPage = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);

  // دالة لإضافة مصروف جديد
  const addExpense = (type) => {
    const newExpense = { id: Date.now(), title: "", amount: "" };
    if (type === "monthly") {
      setMonthlyExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    }
  };

  // دالة لإزالة مصروف
  const removeExpense = (type, id) => {
    if (type === "monthly") {
      setMonthlyExpenses((prevExpenses) => prevExpenses.filter((exp) => exp.id !== id));
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      
      <Sidebar />

      <div style={{ marginLeft: '260px', padding: '20px', width: '100%' }}>
        
          <Card className="p-3 shadow-sm">
            <h3 className="d-flex justify-content-between">
              Monthly Expenses
              <Button variant="success" size="sm" onClick={() => addExpense("monthly")}>
                +
              </Button>
            </h3>
            {monthlyExpenses.map((exp) => (
              <Form.Group key={exp.id} className="mb-3 d-flex">
                <Form.Control type="text" placeholder="Title" className="me-2" />
                <Form.Control type="number" placeholder="Amount" className="me-2" />
                <Button variant="danger" onClick={() => removeExpense("monthly", exp.id)}>
                  X
                </Button>
              </Form.Group>
            ))}
          </Card>
        
      </div>
    </div>
  );
};

export default MonthlyExpensesPage;
