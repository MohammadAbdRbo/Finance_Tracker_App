const pool = require("../config/db");

const getFinanceDetails = async () => {
    try {
        const result = await pool.query("SELECT * FROM finance_details");
        return result.rows;
    } catch (err) {
        console.error("❌ Error getting finance details:", err);
        throw err;
    }
};

const addFinanceDetails = async (details) => {
    try {
        const result = await pool.query("INSERT INTO finance_details (details) VALUES ($1) RETURNING *", [details]);
        return result.rows[0]; // ارجاع المستخدم الذي تم اضافته
    } catch (err) {
        console.error("❌ Error adding finance details:", err);
        throw err;
    }
};

const addMonthlyExpense = async (amount) => {
    try {
        const result = await pool.query("INSERT INTO monthly_expenses (amount) VALUES ($1) RETURNING *", [amount]);
        return result.rows[0]; // ارجاع المستخدم الذي تم اضافته
    } catch (err) {
        console.error("❌ Error adding monthly expense:", err);
        throw err;
    }
};

const addYearlyExpense = async (amount) => {
    try {
        const result = await pool.query("INSERT INTO yearly_expenses (amount) VALUES ($1) RETURNING *", [amount]);
        return result.rows[0]; // ارجاع المستخدم الذي تم اضافته
    } catch (err) {
        console.error("❌ Error adding yearly expense:", err);
        throw err;
    }
};

const addGoals = async (amount) => {
    try {
        const result = await pool.query("INSERT INTO goals (amount) VALUES ($1) RETURNING *", [amount]);
        return result.rows[0]; // ارجاع المستخدم الذي تم اضافته
    } catch (err) {
        console.error("❌ Error adding goals:", err);
        throw err;
    }
};




module.exports = 
{   getFinanceDetails,
    addFinanceDetails 
};