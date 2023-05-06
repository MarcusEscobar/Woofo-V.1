
function showLogin() {
    document.querySelector('.login-section').classList.add('active');
    document.querySelector('.cadastro-section').classList.remove('active');
}
function showCadastro() {
    document.querySelector('.login-section').classList.remove('active');
    document.querySelector('.cadastro-section').classList.add('active');
}