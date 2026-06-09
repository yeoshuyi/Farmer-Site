const express = require('express');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 3000;

// The save route
app.get('/save/:dataString', (req, res) => {
    const dataToSave = req.params.dataString;
    const timestamp = new Date().toISOString();
    
    const logEntry = `${timestamp} - ${dataToSave}\n`;

    fs.appendFile('saved_data.txt', logEntry, (err) => {
        if (err) {
            console.error('Error saving data:', err);
            return res.status(500).send('Server Error: Failed to save data.');
        }
        
        console.log(`Saved: ${dataToSave}`);
        res.send(`Successfully saved: ${dataToSave}`);
    });
});

// Home route
app.get('/', (req, res) => {
    res.send('Server is active. Go to /save/YOUR_STRING to record a string.');
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is listening on port ${PORT}`);
});
