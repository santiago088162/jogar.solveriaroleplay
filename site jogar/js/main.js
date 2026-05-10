const ROBLOX_LINK = "roblox://placeId=2534724415&launchData=%7B%22psCode%22%3A%22sIMsh%22%7D";

async function updateStatus() {
    const statusContainer = document.getElementById('status-container');
    const statusText = document.getElementById('status-text');
    const connectBtn = document.getElementById('connect-btn');

    try {
        // Busca do arquivo local status.json
        const response = await fetch('data/status.json?t=' + new Date().getTime());
        const data = await response.json();

        if (data.online) {
            statusContainer.className = 'status-badge online';
            statusText.innerText = 'SERVIDOR ONLINE';
            connectBtn.href = ROBLOX_LINK;
        } else {
            statusContainer.className = 'status-badge offline';
            statusText.innerText = 'SERVIDOR OFFLINE';
            connectBtn.href = 'offline.html';
        }
    } catch (error) {
        console.error('Erro ao buscar status:', error);
        statusContainer.className = 'status-badge offline';
        statusText.innerText = 'ERRO DE CONEXÃO';
        connectBtn.href = 'offline.html';
    }
}

// Atualiza ao carregar
updateStatus();

// Atualiza a cada 5 segundos
setInterval(updateStatus, 5000);
