document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop();
    const isRootIndex = currentPath.endsWith('/') || currentFile === '';

    function buildBingQueryFromForm(form) {
        const elements = Array.from(form.elements).filter(el => el.name && el.type !== 'submit');
        const parts = [];
        elements.forEach(el => {
            if (el.type === 'checkbox' || el.type === 'radio') {
                if (!el.checked) return;
            }
            const label = form.querySelector(`label[for="${el.id}"]`);
            const nameOrLabel = (label && label.textContent.trim()) || el.name;
            const value = (el.value || '').toString().trim();
            if (value) parts.push(`${nameOrLabel}: ${value}`);
        });
        return parts.join(' | ');
    }

    const bingForms = document.querySelectorAll('form.bing-form');
    bingForms.forEach(form => {
        form.addEventListener('submit', function() {
            const qValue = buildBingQueryFromForm(form);
            let qField = form.querySelector('input[name="q"]');
            if (!qField) {
                qField = document.createElement('input');
                qField.type = 'hidden';
                qField.name = 'q';
                form.appendChild(qField);
            }
            qField.value = qValue || qField.value || 'default-query';
        });
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (/^https?:\/\//i.test(href)) return;
        const linkFile = href.split('/').pop();
        if ((isRootIndex && linkFile === 'index.html') || (!isRootIndex && currentFile === linkFile)) {
            link.classList.add('active');
        }
    });

    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Build a single Bing query parameter 'q' from filled fields
            const fields = [
                { label: 'Фамилия', value: document.getElementById('surname')?.value },
                { label: 'Имя', value: document.getElementById('name')?.value },
                { label: 'Группа', value: document.getElementById('group')?.value },
                { label: 'Телефон', value: document.getElementById('mobile_phone')?.value },
                { label: 'Email', value: document.getElementById('email')?.value },
                { label: 'Дата', value: document.getElementById('date_of_submission')?.value },
            ];

            const parts = fields
                .filter(f => f && f.value && String(f.value).trim() !== '')
                .map(f => `${f.label}: ${String(f.value).trim()}`);

            const q = parts.join(' | ');
            const hidden = document.getElementById('bing_query');
            if (hidden) {
                hidden.value = q;
            }
        });
    }
});
