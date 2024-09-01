document.addEventListener('DOMContentLoaded', () => {
    const signinForm = document.getElementById('signin-form');
    const signinMessage = document.getElementById('signin-message');

    signinForm.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(signinForm);
        const email = formData.get('email');
        const password = formData.get('password');

        // Simulating a sign-in process
        if (email === 'user@example.com' && password === 'password') {
            signinMessage.textContent = 'Sign in successful!';
            signinMessage.style.color = 'green';
        } else {
            signinMessage.textContent = 'Invalid email or password.';
            signinMessage.style.color = 'red';
        }
    });
});
