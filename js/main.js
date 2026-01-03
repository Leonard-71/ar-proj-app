/**
 * AR.js Application - Main JavaScript
 * Gestionează interacțiunile și evenimentele aplicației AR
 */

// State management
const appState = {
    currentModel: 'trex',
    animations: {
        rotate: true,
        bounce: false,
        pulse: false
    },
    scale: 1,
    speed: 1,
    color: '#ffffff'
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

/**
 * Inițializează aplicația AR
 */
function initializeApp() {
    const loadingScreen = document.getElementById('loading-screen');
    const instructionsOverlay = document.getElementById('instructions');
    const infoButton = document.getElementById('info-btn');
    const closeInstructionsBtn = document.getElementById('close-instructions');
    const arScene = document.getElementById('ar-scene');
    const hiroMarker = document.getElementById('hiro-marker');

    // Hide loading screen when AR is ready
    arScene.addEventListener('loaded', function () {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            initializeControls();
            startFPSMonitor();
        }, 1000);
    });

    // Info button click handler
    if (infoButton) {
        infoButton.addEventListener('click', function () {
            instructionsOverlay.classList.add('active');
        });
    }

    // Close instructions handler
    if (closeInstructionsBtn) {
        closeInstructionsBtn.addEventListener('click', function () {
            instructionsOverlay.classList.remove('active');
        });
    }

    // Close instructions when clicking outside
    instructionsOverlay.addEventListener('click', function (e) {
        if (e.target === instructionsOverlay) {
            instructionsOverlay.classList.remove('active');
        }
    });

    // Marker detection events
    if (hiroMarker) {
        // Marker found
        hiroMarker.addEventListener('markerFound', function () {
            console.log('Marker detectat!');
            updateMarkerStatus('detected', '✓ Detectat');
            showMarkerDetected();
        });

        // Marker lost
        hiroMarker.addEventListener('markerLost', function () {
            console.log('Marker pierdut!');
            updateMarkerStatus('lost', '✗ Pierdut');
            hideMarkerDetected();
        });
    }

    // Handle camera permission errors
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            console.log('Acces la cameră acordat');
            updateMarkerStatus('searching', '⏳ Căutare...');
        })
        .catch(function (error) {
            console.error('Eroare acces cameră:', error);
            showCameraError();
        });
}

/**
 * Inițializează controalele panoului
 */
function initializeControls() {
    // Toggle panel
    const togglePanel = document.getElementById('toggle-panel');
    const controlPanel = document.getElementById('control-panel');

    if (togglePanel && controlPanel) {
        togglePanel.addEventListener('click', function () {
            controlPanel.classList.toggle('collapsed');
            togglePanel.textContent = controlPanel.classList.contains('collapsed') ? '+' : '−';
        });
    }

    // Model selector
    const modelButtons = document.querySelectorAll('[data-model]');
    modelButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const modelType = this.getAttribute('data-model');
            switchModel(modelType);

            // Update active state
            modelButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Animation toggles
    const toggleRotate = document.getElementById('toggle-rotate');
    const toggleBounce = document.getElementById('toggle-bounce');
    const togglePulse = document.getElementById('toggle-pulse');

    if (toggleRotate) {
        toggleRotate.addEventListener('click', function () {
            appState.animations.rotate = !appState.animations.rotate;
            this.classList.toggle('active');
            updateAnimations();
        });
    }

    if (toggleBounce) {
        toggleBounce.addEventListener('click', function () {
            appState.animations.bounce = !appState.animations.bounce;
            this.classList.toggle('active');
            updateAnimations();
        });
    }

    if (togglePulse) {
        togglePulse.addEventListener('click', function () {
            appState.animations.pulse = !appState.animations.pulse;
            this.classList.toggle('active');
            updateAnimations();
        });
    }

    // Scale slider
    const scaleSlider = document.getElementById('scale-slider');
    const scaleValue = document.getElementById('scale-value');

    if (scaleSlider && scaleValue) {
        scaleSlider.addEventListener('input', function () {
            appState.scale = parseFloat(this.value);
            scaleValue.textContent = Math.round(appState.scale * 100) + '%';
            applyScale();
        });
    }

    // Speed slider
    const speedSlider = document.getElementById('speed-slider');
    const speedValue = document.getElementById('speed-value');

    if (speedSlider && speedValue) {
        speedSlider.addEventListener('input', function () {
            appState.speed = parseFloat(this.value);
            speedValue.textContent = Math.round(appState.speed * 100) + '%';
            updateAnimations();
        });
    }

    // Color picker
    const colorPicker = document.getElementById('color-picker');
    const resetColor = document.getElementById('reset-color');

    if (colorPicker) {
        colorPicker.addEventListener('input', function () {
            appState.color = this.value;
            applyColor();
        });
    }

    if (resetColor) {
        resetColor.addEventListener('click', function () {
            appState.color = '#ffffff';
            if (colorPicker) colorPicker.value = '#ffffff';
            applyColor();
        });
    }

    // Reset all button
    const resetAll = document.getElementById('reset-all');
    if (resetAll) {
        resetAll.addEventListener('click', function () {
            resetAllSettings();
        });
    }

    // Screenshot button
    const takeScreenshot = document.getElementById('take-screenshot');
    if (takeScreenshot) {
        takeScreenshot.addEventListener('click', function () {
            captureScreenshot();
        });
    }

    // Model click interactions
    setupModelInteractions();
}

/**
 * Schimbă modelul 3D
 */
function switchModel(modelType) {
    appState.currentModel = modelType;

    const models = {
        trex: document.getElementById('ar-model-trex'),
        box: document.getElementById('ar-model-box'),
        sphere: document.getElementById('ar-model-sphere')
    };

    // Hide all models
    Object.values(models).forEach(model => {
        if (model) model.setAttribute('visible', 'false');
    });

    // Show selected model
    if (models[modelType]) {
        models[modelType].setAttribute('visible', 'true');
        // Reset scale and animations
        applyScale();
        updateAnimations();
    }
}

/**
 * Aplică scalarea modelului
 */
function applyScale() {
    const modelContainer = document.getElementById('model-container');
    if (!modelContainer) return;

    const baseScale = {
        trex: 0.05,
        box: 0.5,
        sphere: 0.3
    };

    const currentBase = baseScale[appState.currentModel] || 0.05;
    const newScale = currentBase * appState.scale;

    if (appState.currentModel === 'trex') {
        const trex = document.getElementById('ar-model-trex');
        if (trex) trex.setAttribute('scale', `${newScale} ${newScale} ${newScale}`);
    } else if (appState.currentModel === 'box') {
        const box = document.getElementById('ar-model-box');
        if (box) box.setAttribute('scale', `${newScale} ${newScale} ${newScale}`);
    } else if (appState.currentModel === 'sphere') {
        const sphere = document.getElementById('ar-model-sphere');
        if (sphere) sphere.setAttribute('radius', newScale);
    }
}

/**
 * Aplică culoarea modelului
 */
function applyColor() {
    const box = document.getElementById('ar-model-box');
    const sphere = document.getElementById('ar-model-sphere');

    if (box && appState.currentModel === 'box') {
        box.setAttribute('color', appState.color);
    }

    if (sphere && appState.currentModel === 'sphere') {
        sphere.setAttribute('color', appState.color);
    }
}

/**
 * Actualizează animațiile
 */
function updateAnimations() {
    const models = {
        trex: document.getElementById('ar-model-trex'),
        box: document.getElementById('ar-model-box'),
        sphere: document.getElementById('ar-model-sphere')
    };

    const currentModel = models[appState.currentModel];
    if (!currentModel) return;

    const baseDuration = 10000;
    const duration = baseDuration / appState.speed;

    // Remove all animations from all models
    Object.values(models).forEach(model => {
        if (model) {
            model.removeAttribute('animation__rotate');
            model.removeAttribute('animation__bounce');
            model.removeAttribute('animation__pulse');
        }
    });

    // Apply rotate animation
    if (appState.animations.rotate) {
        currentModel.setAttribute('animation__rotate', {
            property: 'rotation',
            to: '0 360 0',
            loop: true,
            dur: duration,
            easing: 'linear'
        });
    }

    // Apply bounce animation
    if (appState.animations.bounce) {
        const modelContainer = document.getElementById('model-container');
        if (modelContainer) {
            const currentPos = modelContainer.getAttribute('position');
            const y = parseFloat(currentPos.y) || 0.5;
            modelContainer.setAttribute('animation__bounce', {
                property: 'position',
                from: `${currentPos.x} ${y} ${currentPos.z}`,
                to: `${currentPos.x} ${y + 0.2} ${currentPos.z}`,
                dur: duration / 2,
                easing: 'easeInOut',
                direction: 'alternate',
                loop: true
            });
        }
    }

    // Apply pulse animation
    if (appState.animations.pulse) {
        const currentScale = currentModel.getAttribute('scale') || '1 1 1';
        const scaleValues = currentScale.split(' ').map(v => parseFloat(v));
        const pulseScale = scaleValues.map(v => v * 1.2).join(' ');

        currentModel.setAttribute('animation__pulse', {
            property: 'scale',
            from: currentScale,
            to: pulseScale,
            dur: duration / 2,
            easing: 'easeInOut',
            direction: 'alternate',
            loop: true
        });
    }
}

/**
 * Configurează interacțiunile cu modelele
 */
function setupModelInteractions() {
    const models = document.querySelectorAll('.ar-model');

    models.forEach(model => {
        model.addEventListener('click', function () {
            // Add click effect
            const originalScale = this.getAttribute('scale') || '1 1 1';
            this.setAttribute('animation__click', {
                property: 'scale',
                from: originalScale,
                to: this.getAttribute('scale').split(' ').map(v => parseFloat(v) * 1.1).join(' '),
                dur: 200,
                easing: 'easeOut',
                direction: 'alternate'
            });

            setTimeout(() => {
                this.removeAttribute('animation__click');
            }, 400);

            console.log('Model clicked!');
        });
    });
}

/**
 * Resetează toate setările
 */
function resetAllSettings() {
    appState.currentModel = 'trex';
    appState.animations = { rotate: true, bounce: false, pulse: false };
    appState.scale = 1;
    appState.speed = 1;
    appState.color = '#ffffff';

    // Update UI
    document.querySelectorAll('[data-model]').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-model') === 'trex');
    });

    document.getElementById('toggle-rotate')?.classList.add('active');
    document.getElementById('toggle-bounce')?.classList.remove('active');
    document.getElementById('toggle-pulse')?.classList.remove('active');

    const scaleSlider = document.getElementById('scale-slider');
    const speedSlider = document.getElementById('speed-slider');
    const colorPicker = document.getElementById('color-picker');
    const scaleValue = document.getElementById('scale-value');
    const speedValue = document.getElementById('speed-value');

    if (scaleSlider) scaleSlider.value = 1;
    if (speedSlider) speedSlider.value = 1;
    if (colorPicker) colorPicker.value = '#ffffff';
    if (scaleValue) scaleValue.textContent = '100%';
    if (speedValue) speedValue.textContent = '100%';

    // Apply reset
    switchModel('trex');
    applyScale();
    applyColor();
    updateAnimations();
}

/**
 * Capturează un screenshot
 */
function captureScreenshot() {
    const arScene = document.getElementById('ar-scene');
    if (!arScene) return;

    // Use A-Frame's screenshot component if available, or canvas capture
    try {
        arScene.systems.screenshot.capture('perspective');
        showNotification('📸 Screenshot salvat!');
    } catch (e) {
        // Fallback: use canvas
        const canvas = document.querySelector('a-scene').canvas;
        if (canvas) {
            canvas.toBlob(function (blob) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'ar-screenshot-' + Date.now() + '.png';
                a.click();
                URL.revokeObjectURL(url);
                showNotification('📸 Screenshot descărcat!');
            });
        }
    }
}

/**
 * Afișează o notificare
 */
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: rgba(76, 175, 80, 0.9);
        color: white;
        padding: 15px 25px;
        border-radius: 12px;
        z-index: 10000;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

/**
 * Actualizează statusul markerului
 */
function updateMarkerStatus(status, text) {
    const markerStatus = document.getElementById('marker-status');
    if (markerStatus) {
        markerStatus.textContent = text;
        markerStatus.className = 'status-value ' + status;
    }
}

/**
 * Afișează indicatorul că markerul a fost detectat
 */
function showMarkerDetected() {
    let indicator = document.getElementById('marker-indicator');

    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'marker-indicator';
        indicator.className = 'marker-detected';
        indicator.textContent = '✓ Marker detectat!';
        document.body.appendChild(indicator);
    }

    indicator.classList.add('active');
}

/**
 * Ascunde indicatorul de detecție marker
 */
function hideMarkerDetected() {
    const indicator = document.getElementById('marker-indicator');
    if (indicator) {
        indicator.classList.remove('active');
    }
}

/**
 * Afișează eroare când nu se poate accesa camera
 */
function showCameraError() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        const loaderContent = loadingScreen.querySelector('.loader-content');
        if (loaderContent) {
            loaderContent.innerHTML = `
                <div style="color: #ff6b6b; text-align: center;">
                    <h2>⚠️ Eroare acces cameră</h2>
                    <p>Vă rugăm să permiteți accesul la cameră pentru a folosi aplicația AR.</p>
                    <p style="margin-top: 10px; font-size: 14px; opacity: 0.8;">
                        Reîncărcați pagina și permiteți accesul când vi se solicită.
                    </p>
                </div>
            `;
        }
    }
}

/**
 * Monitorizează FPS
 */
let fps = 0;
let lastTime = performance.now();
let frameCount = 0;

function startFPSMonitor() {
    function updateFPS() {
        frameCount++;
        const currentTime = performance.now();

        if (currentTime >= lastTime + 1000) {
            fps = frameCount;
            frameCount = 0;
            lastTime = currentTime;

            const fpsCounter = document.getElementById('fps-counter');
            if (fpsCounter) {
                fpsCounter.textContent = fps;
                fpsCounter.style.color = fps >= 30 ? '#4CAF50' : fps >= 20 ? '#FFC107' : '#f44336';
            }
        }

        requestAnimationFrame(updateFPS);
    }

    updateFPS();
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
