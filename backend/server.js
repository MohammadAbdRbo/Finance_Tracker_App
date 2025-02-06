const express = require("express");
const pool = require("./config/db");
const app = express();
const PORT = process.env.PORT || 5000;  
app.use(express.json()); 

// check the conction on db 
(async () => {
    try {
      const res = await pool.query("SELECT NOW();");
      console.log("✅ Connection successful, current time:", res.rows[0].now);
    } catch (err) {
      console.error("❌ Error connecting to the database: ", err.message);
    }
  })();

// get users
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public."User"');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// creat user 
app.post("/users", async (req, res) => {
  try {
    const { full_name, email, password, monthly_income } = req.body;
    const newUser = await pool.query(
      'INSERT INTO public."User" (full_name, email, password, monthly_income) VALUES ($1, $2, $3, $4) RETURNING *',
      [full_name, email, password, monthly_income]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
