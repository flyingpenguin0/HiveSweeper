const path = require('path');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;


app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

// Serve the files for the built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// All other requests will return the React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});