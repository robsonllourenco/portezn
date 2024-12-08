document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Carregar dados do JSON
    const response = await fetch('users.json');
    const users = await response.json();
  
    // Validar credenciais
    const user = users.find((user) => user.username === username && user.password === password);
  
    if (user) {
      // Redirecionar para a página de registro
      window.location.href = 'index.html';
    } else {
      document.getElementById('error-message').textContent = 'Usuário ou senha inválidos.';
    }
  });
  