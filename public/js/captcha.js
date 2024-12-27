async function submitCaptcha() {
    const input = document.getElementById('captchaInput');
    const submitButton = document.querySelector('button[onclick="submitCaptcha()"]');
    
    // Disable input and button during submission
    input.disabled = true;
    submitButton.disabled = true;
    
    // Add loading state
    submitButton.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Verifying...
    `;
    
    try {
        const response = await fetch('/verify-captcha', {
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
        submitButton.innerHTML = 'Verify';
    }
}

function refreshCaptcha() {
    const img = document.getElementById('captchaImage');
    if (!img) return;

    img.src = '/captcha?' + new Date().getTime();
    document.getElementById('captchaInput').value = '';
}