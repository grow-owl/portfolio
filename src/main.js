import { createIcons, Gauge, TrendingDown, ImageOff, Phone, Bird, MessageCircle, ArrowRight, CheckCircle2, AlertCircle, X } from 'lucide';
import { renderProjects } from './js/projects.js';
import { inject } from '@vercel/analytics';

// Initialize Vercel Analytics
inject();

// Render the projects dynamically first
renderProjects();

// Then initialize all Lucide icons so they apply to the newly rendered HTML
createIcons({
  icons: {
    Gauge,
    TrendingDown,
    ImageOff,
    Phone,
    Bird,
    MessageCircle,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
    X
  }
});

// Custom Sonner-style Toast Notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    const isSuccess = type === 'success';
    
    // Base classes for the toast
    toast.className = `fixed bottom-4 right-4 md:bottom-8 md:right-8 p-4 rounded-xl shadow-2xl flex items-center gap-3 font-medium text-sm brutal-border z-[100] transform transition-all duration-300 translate-y-20 opacity-0 min-w-[300px] ${
        isSuccess ? 'bg-zinc-900 text-white' : 'bg-red-500 text-white'
    }`;
    
    toast.innerHTML = `
        <div class="flex-shrink-0">
            <i data-lucide="${isSuccess ? 'check-circle-2' : 'alert-circle'}" class="w-5 h-5 ${isSuccess ? 'text-[#25D366]' : 'text-white'}"></i>
        </div>
        <span class="flex-grow">${message}</span>
        <button class="flex-shrink-0 hover:opacity-70 transition-opacity ml-4" onclick="this.parentElement.remove()">
            <i data-lucide="x" class="w-4 h-4"></i>
        </button>
    `;
    
    document.body.appendChild(toast);
    
    // Initialize icons for the newly created toast
    createIcons({
        icons: { CheckCircle2, AlertCircle, X },
        nameAttr: 'data-lucide',
        root: toast
    });

    // Trigger animation in
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-20', 'opacity-0');
    });

    // Auto-remove after 4 seconds
    setTimeout(() => {
        if (document.body.contains(toast)) {
            toast.classList.add('translate-y-20', 'opacity-0');
            setTimeout(() => {
                if (document.body.contains(toast)) toast.remove();
            }, 300);
        }
    }, 4000);
}

// Web3Forms Contact Form Handling
const form = document.getElementById('contact-form');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);

        const submitBtn = document.getElementById('contact-submit');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                showToast("Success! Your message has been sent.", 'success');
                form.reset();
            } else {
                showToast("Error: " + json.message, 'error');
            }
        })
        .catch(error => {
            console.log(error);
            showToast("Something went wrong. Please try again.", 'error');
        })
        .finally(function() {
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        });
    });
}
