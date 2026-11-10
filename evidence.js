(() => {
    const en = document.documentElement.lang === 'en';
    const form = document.getElementById('impact-calculator');
    const output = document.getElementById('impact-output');
    const after = document.getElementById('impact-after');
    const number = new Intl.NumberFormat(en ? 'en-US' : 'pt-BR', { maximumFractionDigits: 1 });
    const calculate = () => {
        after.setCustomValidity('');
        const beforeValue = Number(form.elements.before.value);
        const afterValue = Number(after.value);
        if (afterValue > beforeValue) {
            after.setCustomValidity(en ? 'Enter a time no greater than the time before automation.' : 'Informe um tempo menor ou igual ao tempo antes da automação.');
        }
        if (!form.checkValidity()) {
            output.textContent = en ? 'Check the values to calculate your estimate.' : 'Confira os valores para calcular a estimativa.';
            return;
        }
        const hours = Number(form.elements.volume.value) * (beforeValue - afterValue) / 60;
        output.textContent = en
            ? number.format(hours) + ' hours / week · ' + number.format(hours * 4) + ' hours / 4 weeks'
            : number.format(hours) + ' horas / semana · ' + number.format(hours * 4) + ' horas / 4 semanas';
    };
    form.addEventListener('input', calculate);
    form.addEventListener('submit', event => {
        event.preventDefault();
        calculate();
        form.reportValidity();
    });
    calculate();

    const promptLink = document.querySelector('[data-prompt-download]');
    const evaluationLink = document.querySelector('[data-evaluation-download]');
    const locale = en ? 'en' : 'pt';
    promptLink.href = 'portfolio-assets/lab/lead-triage.' + locale + '.md';
    evaluationLink.href = 'portfolio-assets/lab/llm-evaluation.' + locale + '.md';
    document.querySelector('[data-copy-prompt]').addEventListener('click', async () => {
        const status = document.querySelector('[data-copy-status]');
        try {
            const response = await fetch(promptLink.href);
            if (!response.ok) throw new Error('Prompt unavailable');
            const content = await response.text();
            await navigator.clipboard.writeText(content);
            status.textContent = en ? 'Prompt copied.' : 'Prompt copiado.';
        } catch {
            status.textContent = en ? 'Unable to copy. Download the full example using the link.' : 'Não foi possível copiar. Baixe o exemplo completo pelo link.';
        }
    });
})();
