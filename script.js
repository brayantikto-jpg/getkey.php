// Estado global
let whatsappDone = false;
let youtubeDone = false;
let countdownActive = false;

/**
 * Marca WhatsApp como completado
 */
function markWhatsAppDone() {
    whatsappDone = true;
    
    // Mostrar check de WhatsApp
    document.getElementById('whatsappCheck').style.display = 'flex';
    
    // Habilitar YouTube
    const youtubeBtn = document.getElementById('youtubeBtn');
    youtubeBtn.disabled = false;
    
    // Actualizar estilos del paso 1
    const step1 = document.getElementById('step1');
    step1.classList.add('completed');
    step1.classList.remove('active');
    
    // Activar paso 2
    const step2 = document.getElementById('step2');
    step2.classList.add('active');
    step2.classList.remove('disabled');
    
    // Guardar estado
    localStorage.setItem('whatsappDone', 'true');
    
    // Mensaje de confirmación
    showNotification('✓ WhatsApp verificado. Ahora puedes seguir a YouTube');
}

/**
 * Marca YouTube como completado
 */
function markYoutubeDone() {
    youtubeDone = true;
    
    // Mostrar check de YouTube
    document.getElementById('youtubeCheck').style.display = 'flex';
    
    // Habilitar generador
    const generateBtn = document.getElementById('generateBtn');
    generateBtn.disabled = false;
    
    // Actualizar estilos del paso 2
    const step2 = document.getElementById('step2');
    step2.classList.add('completed');
    step2.classList.remove('active');
    
    // Activar paso 3
    const step3 = document.getElementById('step3');
    step3.classList.add('active');
    step3.classList.remove('disabled');
    
    // Guardar estado
    localStorage.setItem('youtubeDone', 'true');
    
    // Mensaje de confirmación
    showNotification('✓ YouTube verificado. Ahora puedes generar tu KEY');
}

/**
 * Muestra una notificación al usuario
 */
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/**
 * Inicia el countdown de 60 segundos
 */
function startCountdown() {
    // Verificar que WhatsApp esté completado
    if (!whatsappDone) {
        showNotification('❌ Debes seguir el canal de WhatsApp primero');
        return;
    }
    
    // Verificar que YouTube esté completado
    if (!youtubeDone) {
        showNotification('❌ Debes suscribirte a YouTube primero');
        return;
    }
    
    if (countdownActive) return;
    
    countdownActive = true;
    
    // Deshabilitar botón
    const generateBtn = document.getElementById('generateBtn');
    generateBtn.disabled = true;
    
    // Mostrar contador
    const countdownContainer = document.getElementById('countdownContainer');
    const countdownTimer = document.getElementById('countdownTimer');
    const resultContainer = document.getElementById('resultContainer');
    
    countdownContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    
    let timeRemaining = 60;
    countdownTimer.textContent = timeRemaining;
    
    const interval = setInterval(() => {
        timeRemaining--;
        countdownTimer.textContent = timeRemaining;
        
        if (timeRemaining <= 0) {
            clearInterval(interval);
            generateKey();
            countdownContainer.style.display = 'none';
            countdownActive = false;
        }
    }, 1000);
}

/**
 * Genera la key CRISS-MODZ-DAH9FA
 */
function generateKey() {
    const key = 'CRISS-MODZ-DAH9FA';
    
    // Mostrar el contenedor de resultados
    const resultContainer = document.getElementById('resultContainer');
    const keyOutput = document.getElementById('keyOutput');
    
    keyOutput.value = key;
    resultContainer.style.display = 'block';
    
    // Animación suave
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Guardar en localStorage
    saveKeyToHistory(key);
}

/**
 * Guarda la key en el historial local
 */
function saveKeyToHistory(key) {
    let history = JSON.parse(localStorage.getItem('keyHistory')) || [];
    history.unshift({
        key: key,
        timestamp: new Date().toISOString()
    });
    
    // Guardar solo las últimas 50 keys
    if (history.length > 50) {
        history = history.slice(0, 50);
    }
    localStorage.setItem('keyHistory', JSON.stringify(history));
}

/**
 * Copia el key al portapapeles
 */
function copyToClipboard() {
    const keyOutput = document.getElementById('keyOutput');
    const btnCopy = event.target.closest('.cyber-btn-copy');
    
    // Seleccionar el texto
    keyOutput.select();
    keyOutput.setSelectionRange(0, 99999);
    
    // Copiar al portapapeles
    document.execCommand('copy');
    
    // Feedback visual
    const originalText = btnCopy.innerHTML;
    btnCopy.innerHTML = '<span class="copy-glow"></span><span class="copy-text">✓ COPIADO</span>';
    btnCopy.style.borderColor = '#ffbe0b';
    btnCopy.style.boxShadow = '0 0 15px #ffbe0b';
    
    setTimeout(() => {
        btnCopy.innerHTML = originalText;
        btnCopy.style.borderColor = '';
        btnCopy.style.boxShadow = '';
    }, 2000);
}

/**
 * Reinicia el formulario
 */
function resetForm() {
    const resultContainer = document.getElementById('resultContainer');
    const keyOutput = document.getElementById('keyOutput');
    const generateBtn = document.getElementById('generateBtn');
    const countdownContainer = document.getElementById('countdownContainer');
    
    resultContainer.style.display = 'none';
    countdownContainer.style.display = 'none';
    keyOutput.value = '';
    generateBtn.disabled = false;
    countdownActive = false;
    
    // Scroll hacia el botón de generar
    generateBtn.focus();
}

/**
 * Verifica el estado al cargar la página
 */
window.addEventListener('DOMContentLoaded', function() {
    // Verificar si WhatsApp fue completado
    if (localStorage.getItem('whatsappDone') === 'true') {
        whatsappDone = true;
        markWhatsAppDone();
    } else {
        // Paso 1 siempre activo inicialmente si no se completó
        document.getElementById('step1').classList.add('active');
    }
    
    // Verificar si YouTube fue completado
    if (localStorage.getItem('youtubeDone') === 'true') {
        youtubeDone = true;
        markYoutubeDone();
    }
});
