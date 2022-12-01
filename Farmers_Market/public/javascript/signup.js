async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const is_vendor = document.querySelector('#is-vendor-signup').checked;

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password,
                is_vendor
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
            console.log('success');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.signup-form').addEventListener("submit", signupFormHandler);