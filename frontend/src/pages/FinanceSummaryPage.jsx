import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/Sidebar";

export default function FinanceSummary() {
  const [totalIncome, setTotalIncome] = useState(5000);
  const [totalExpenses, setTotalExpenses] = useState(3000);
  const [monthlySavings, setMonthlySavings] = useState(totalIncome - totalExpenses);

  const handleSave = () => {
    alert("Data saved successfully!");
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container-fluid mt-5 d-flex justify-content-center">
        <div className="card shadow-lg p-4 rounded-3" style={{ maxWidth: "600px", width: "100%" }}>
          <h2 className="text-center fw-bold mb-4">Finance Summary</h2>
  
          <div className="mb-3">
            <label className="form-label fw-bold">Total Income</label>
            <input
              type="number"
              className="form-control"
              value={totalIncome}
              onChange={(e) => {
                setTotalIncome(Number(e.target.value));
                setMonthlySavings(Number(e.target.value) - totalExpenses);
              }}
            />
          </div>
  
          <div className="mb-3">
            <label className="form-label fw-bold">Total Expenses</label>
            <input
              type="number"
              className="form-control"
              value={totalExpenses}
              onChange={(e) => {
                setTotalExpenses(Number(e.target.value));
                setMonthlySavings(totalIncome - Number(e.target.value));
              }}
            />
          </div>
  
          <div className="mb-3">
            <label className="form-label fw-bold">Monthly Savings</label>
            <input type="text" className="form-control" value={monthlySavings} readOnly />
          </div>
  
          <button className="btn btn-primary w-100 fw-bold" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
  
}
