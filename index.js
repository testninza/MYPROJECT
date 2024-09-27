const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Vulnerable route to simulate SQL Injection
app.get('/user', (req, res) => {
  const userId = req.query.id; // User input directly used in query
  const query = `SELECT * FROM users WHERE id = ${userId};`; // Vulnerable to SQL injection
  // Imagine executing this query against a database here...
  res.send(`Query executed: ${query}`);
});

// Vulnerable XSS example
app.get('/greet', (req, res) => {
  const name = req.query.name; // User input directly rendered
  res.send(`<h1>Hello, ${name}!</h1>`); // Vulnerable to XSS
});

// Vulnerable CSRF example
app.post('/change-password', (req, res) => {
  const newPassword = req.body.password; // No CSRF protection
  // Change password logic here...
  res.send('Password changed!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
