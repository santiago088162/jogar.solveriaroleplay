async function updateUI() {
    const statusContainer = document.getElementById('status-container');
    const statusText = document.getElementById('status-text');
    
    try {
        const response = await fetch('../data/status.json?t=' + new Date().getTime());
        const data = await response.json();
        
        if (data.online) {
            statusContainer.className = 'status-badge online';
            statusText.innerText = 'ONLINE';
        } else {
            statusContainer.className = 'status-badge offline';
            statusText.innerText = 'OFFLINE';
        }
    } catch (e) {
        statusText.innerText = 'ERRO DE SYNC';
    }
}

async function toggleStatus(state) {
    const msg = document.getElementById('msg');
    msg.innerText = 'Processando...';
    msg.style.color = 'var(--text-dim)';

    try {
        // Envia para o servidor local (server.py)
        const response = await fetch('/api/status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ online: state })
        });

        if (response.ok) {
            msg.innerText = 'Status atualizado com sucesso!';
            msg.style.color = 'var(--success)';
            updateUI();
        } else {
            throw new Error('Falha no backend');
        }
    } catch (error) {
        msg.innerText = 'Erro: O servidor não está rodando!';
        msg.style.color = 'var(--danger)';
    }
}

updateUI();
setInterval(updateUI, 5000);
