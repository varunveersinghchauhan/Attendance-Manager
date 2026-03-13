const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve static files (like HTML, CSS, JS)
app.use(express.static(__dirname));

// ✅ Home route (serves index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ✅ Login page route
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// ✅ Save leads route
app.post('/leads', (req, res) => {
  const data = req.body;
  const filePath = path.join(__dirname, 'leads.json');
  let leads = [];

  // Read old leads if file exists
  if (fs.existsSync(filePath)) {
    const existing = fs.readFileSync(filePath, 'utf8');
    if (existing) leads = JSON.parse(existing);
  }

  // Add new one
  leads.push({ ...data, timestamp: new Date().toISOString() });

  // Write to file
  fs.writeFileSync(filePath, JSON.stringify(leads, null, 2));
  console.log('✅ Lead saved:', data);

  res.json({ message: 'Lead saved successfully!' });
});

// ✅ Run server
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
