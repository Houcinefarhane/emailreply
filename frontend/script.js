const API_URL = 'http://localhost:3000/api';

// Elements
const emailContent = document.getElementById('emailContent');
const generateBtn = document.getElementById('generateBtn');
const outputSection = document.getElementById('outputSection');
const generatedReply = document.getElementById('generatedReply');
const copyBtn = document.getElementById('copyBtn');
const loading = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const toneCards = document.querySelectorAll('.tone-card');
const charCount = document.getElementById('charCount');
const replyCharCount = document.getElementById('replyCharCount');

let selectedTone = 'formel';

// ===================================
// Character Counter
// ===================================
emailContent.addEventListener('input', () => {
    const count = emailContent.value.length;
    charCount.textContent = count.toLocaleString();
});

// ===================================
// Tone Selection
// ===================================
toneCards.forEach(card => {
    card.addEventListener('click', () => {
        toneCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        selectedTone = card.dataset.tone;
    });
});

// ===================================
// Generate Reply
// ===================================
generateBtn.addEventListener('click', async () => {
    const email = emailContent.value.trim();

    if (!email) {
        showError('Veuillez coller un email avant de générer une réponse.');
        return;
    }

    hideError();
    hideOutput();
    showLoading();
    generateBtn.disabled = true;

    try {
        const response = await fetch(`${API_URL}/generate-reply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                emailContent: email,
                tone: selectedTone
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Erreur lors de la génération');
        }

        await typewriterEffect(data.reply);

        hideLoading();
        showOutput();

    } catch (error) {
        hideLoading();
        showError(error.message || 'Une erreur est survenue. Vérifiez que le serveur est démarré.');
    } finally {
        generateBtn.disabled = false;
    }
});

// ===================================
// Copy to Clipboard
// ===================================
copyBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(generatedReply.value);

        const copyIcon = copyBtn.querySelector('.copy-icon');
        const copyText = copyBtn.querySelector('.copy-text');

        const originalIcon = copyIcon.innerHTML;
        const originalText = copyText.textContent;

        copyIcon.innerHTML = '<path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
        copyText.textContent = 'Copié !';
        copyBtn.classList.add('copied');

        setTimeout(() => {
            copyIcon.innerHTML = originalIcon;
            copyText.textContent = originalText;
            copyBtn.classList.remove('copied');
        }, 2000);

    } catch (error) {
        showError('Erreur lors de la copie');
    }
});

// ===================================
// Keyboard Shortcuts
// ===================================
emailContent.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        generateBtn.click();
    }
});

// ===================================
// Helper Functions
// ===================================

function showLoading() {
    loading.style.display = 'block';
    requestAnimationFrame(() => {
        loading.style.opacity = '1';
    });
}

function hideLoading() {
    loading.style.opacity = '0';
    setTimeout(() => {
        loading.style.display = 'none';
    }, 300);
}

function showOutput() {
    outputSection.style.display = 'block';
    requestAnimationFrame(() => {
        outputSection.style.opacity = '1';
        setTimeout(() => {
            outputSection.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }, 100);
    });
}

function hideOutput() {
    outputSection.style.opacity = '0';
    setTimeout(() => {
        outputSection.style.display = 'none';
    }, 300);
}

function showError(message) {
    errorDiv.innerHTML = `
        <div class="error-icon">⚠️</div>
        <div class="error-content">
            <div class="error-title">Oops!</div>
            <div class="error-message">${message}</div>
        </div>
    `;

    errorDiv.style.display = 'flex';
    requestAnimationFrame(() => {
        errorDiv.style.opacity = '1';
    });

    setTimeout(hideError, 5000);
}

function hideError() {
    errorDiv.style.opacity = '0';
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 300);
}

// Typewriter effect with character counter update
async function typewriterEffect(text) {
    generatedReply.value = '';
    replyCharCount.textContent = '0';

    const speed = 8;
    const chunkSize = 3;

    for (let i = 0; i < text.length; i += chunkSize) {
        const chunk = text.slice(i, i + chunkSize);
        generatedReply.value += chunk;

        // Update character count
        replyCharCount.textContent = generatedReply.value.length.toLocaleString();

        // Auto-scroll
        generatedReply.scrollTop = generatedReply.scrollHeight;

        // Small delay every few chunks
        if (i % (chunkSize * 2) === 0) {
            await new Promise(resolve => setTimeout(resolve, speed));
        }
    }

    // Final count update
    replyCharCount.textContent = text.length.toLocaleString();
}

// ===================================
// Initialize
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Set up smooth transitions
    outputSection.style.transition = 'opacity 0.3s ease';
    loading.style.transition = 'opacity 0.3s ease';
    errorDiv.style.transition = 'opacity 0.3s ease';

    // Hide elements initially
    outputSection.style.opacity = '0';
    loading.style.opacity = '0';
    errorDiv.style.opacity = '0';

    // Add focus effects to textarea
    emailContent.addEventListener('focus', () => {
        emailContent.style.transform = 'scale(1.002)';
    });

    emailContent.addEventListener('blur', () => {
        emailContent.style.transform = '';
    });

    // Add paste event for better UX
    emailContent.addEventListener('paste', () => {
        setTimeout(() => {
            const count = emailContent.value.length;
            charCount.textContent = count.toLocaleString();

            // Add a subtle flash effect
            charCount.style.transform = 'scale(1.2)';
            setTimeout(() => {
                charCount.style.transform = '';
            }, 200);
        }, 10);
    });
});
