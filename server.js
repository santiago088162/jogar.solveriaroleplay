const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

// Endpoint para ler status
app.get('/api/status', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./data/status.json'));
    res.json(data);
});

// Endpoint para atualizar status
app.post('/api/status', (req, res) => {
    const { online } = req.body;
    if (typeof online !== 'boolean') return res.status(400).send('Invalid state');

    const statusData = { online: online };
    fs.writeFileSync('./data/status.json', JSON.stringify(statusData, null, 2));
    
    console.log(`[SERVER] Status alterado para: ${online ? 'ONLINE' : 'OFFLINE'}`);
    res.send('Updated');
});

app.listen(PORT, () => {
    console.log(`
    =========================================
    SISTEMA SOLVÉRIA RP RODANDO!
    Acesse: http://localhost:${PORT}
    =========================================
    `);
});
