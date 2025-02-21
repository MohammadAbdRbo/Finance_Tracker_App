import React, { useState } from "react";
import { Button, Form, Card, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar";

const Goals = () => {
  const [goals, setGoals] = useState([]);

  // Function to add a new goal
  const addGoal = () => {
    const newGoal = { id: Date.now(), goal_name: "", target_amount: "", current_amount: "0", target_date: "" };
    setGoals((prevGoals) => [...prevGoals, newGoal]);
  };

  // Function to remove a goal
  const removeGoal = (id) => {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
  };

  // Function to handle input changes for goal fields
  const handleInputChange = (id, field, value) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === id ? { ...goal, [field]: value } : goal
      )
    );
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "260px", padding: "20px", width: "100%" }}>
        <Col md={6}>
          <Card className="p-3 shadow-sm">
            <h3 className="d-flex justify-content-between">
              Goals
              <Button variant="success" size="sm" onClick={addGoal}>
                +
              </Button>
            </h3>
            {goals.map((goal) => (
              <Form.Group key={goal.id} className="mb-3 d-flex align-items-center">
                {/* Goal Name */}
                <Form.Control
                  type="text"
                  placeholder="Goal Name"
                  value={goal.goal_name}
                  onChange={(e) =>
                    handleInputChange(goal.id, "goal_name", e.target.value)
                  }
                  className="me-2"
                />
                {/* Target Amount */}
                <Form.Control
                  type="number"
                  placeholder="Target Amount"
                  value={goal.target_amount}
                  onChange={(e) =>
                    handleInputChange(goal.id, "target_amount", e.target.value)
                  }
                  className="me-2"
                />
                {/* Current Amount */}
                <Form.Control
                  type="number"
                  placeholder="Current Amount"
                  value={goal.current_amount}
                  onChange={(e) =>
                    handleInputChange(goal.id, "current_amount", e.target.value)
                  }
                  className="me-2"
                />
                {/* Target Date */}
                <Form.Control
                  type="date"
                  value={goal.target_date}
                  onChange={(e) =>
                    handleInputChange(goal.id, "target_date", e.target.value)
                  }
                  className="me-2"
                />
                {/* Remove Goal */}
                <Button
                  variant="danger"
                  onClick={() => removeGoal(goal.id)}
                  className="ms-2"
                >
                  X
                </Button>
              </Form.Group>
            ))}
          </Card>
        </Col>
      </div>
    </div>
  );
};

export default Goals;
