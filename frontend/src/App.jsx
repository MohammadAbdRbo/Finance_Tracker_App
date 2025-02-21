import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import MonthlyExpense from "./pages/MonthlyExpensePage";
import YearlyExpense from "./pages/YearlyExpensePage";
import Goals from "./pages/Goals";
import AiChatPage from "./pages/AiChatPage";
import PrivateRoute from "./components/PrivateRoute";
import FinanceSummary from "./pages/FinanceSummaryPage";

function App() {


  
  return (
    <Router>
      <Routes>
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Home/>} />
        
        
        <Route element={<PrivateRoute />}>
          <Route path="/finance-summary" element={<FinanceSummary />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/monthly-expense" element={<MonthlyExpense />} />
          <Route path="/yearly-expense" element={<YearlyExpense />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/ai-chat" element={<AiChatPage />} />
        </Route>
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
