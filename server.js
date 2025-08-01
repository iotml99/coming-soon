const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static assets from 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all fallback
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
