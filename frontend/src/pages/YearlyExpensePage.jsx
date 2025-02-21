import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Card, Button, Form, Container, Row, Col } from "react-bootstrap";
import { BsPlus, BsTrash } from "react-icons/bs"; // استيراد الأيقونات


const MAX_EXPENSES = 20;
const YearlyExpensesPage = () => {
  
  const [yearlyExpenses, setYearlyExpenses] = useState([]);
  
  
  
  const addExpense = (type) => {
    if (yearlyExpenses.length >= MAX_EXPENSES) {
      alert("your limit is 20!"); 
      return;
    }
  
    const newExpense = { id: Date.now(), title: "", amount: "" };
  
    if (type === "yearly") {
      setYearlyExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    }
  };
  // دالة لإزالة مصروف أو هدف
  const removeExpense = (type, id) => {
    if (type === "yearly") {
      setYearlyExpenses((prevExpenses) => prevExpenses.filter((exp) => exp.id !== id));
    }
  };

  return (
    
    <Container fluid>
    <Row className="vh-100">
      
        
        <Sidebar />
      
      <Col md={10} className="d-flex justify-content-center align-items-start mt-5">
        <Card className="p-4 shadow-lg" style={{ width: "65%" }}>
          <h3 className="d-flex justify-content-between align-items-center">
            Yearly Expenses
            <Button variant="success" size="sm" onClick={() => addExpense("yearly")}>
              <BsPlus size={20} />
            </Button>
          </h3>
          {yearlyExpenses.map((exp) => (
            <Form.Group key={exp.id} className="mb-3 d-flex">
              <Form.Control type="text" placeholder="Title" className="me-2" />
              <Form.Control type="number" placeholder="Amount" className="me-2" />
              <Button variant="danger" onClick={() => removeExpense("yearly", exp.id)}>
                <BsTrash size={18} />
              </Button>
            </Form.Group>
          ))}
        </Card>
      </Col>
    </Row>
  </Container>
  );
  
};

export default YearlyExpensesPage;
