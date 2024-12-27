async function submitCaptcha() {
    const input = document.getElementById('captchaInput');
    const submitButton = document.querySelector('button[onclick="submitCaptcha()"]');
    
    // Disable input and button during submission
    input.disabled = true;
    submitButton.disabled = true;
    
    try {
        const response = await fetch('/
            ', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ captcha: input.value })
        });
        
        const data = await response.json();
        
        if (data.success) {
            window.location.reload();
        } else {
            alert('Invalid captcha! Please try again.');
            refreshCaptcha();
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    } finally {
        // Re-enable input and button
        input.disabled = false;
        submitButton.disabled = false;
    }
}

function refreshCaptcha() {
    const img = document.getElementById('captchaImage');
    if (!img) return;

    img.src = '/captcha?' + new Date().getTime();
    document.getElementById('captchaInput').value = '';
}