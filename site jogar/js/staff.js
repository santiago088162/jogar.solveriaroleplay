document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const alert = document.getElementById('login-alert');

    // Admin Check
    if (user === "Welcome" && pass === "Solveria_ofc") {
        localStorage.setItem('staff_role', 'admin');
        window.location.href = 'admin.html';
    } 
    // Basic Staff Check (Simulado)
    else if (user.length >= 3 && pass.length >= 3) {
        localStorage.setItem('staff_role', 'staff');
        window.location.href = 'staff.html';
    } 
    else {
        alert.style.display = 'block';
    }
});
