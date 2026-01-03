/**
 * AR.js Application - Main JavaScript
 * Gestionează interacțiunile și evenimentele aplicației AR
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
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
    arScene.addEventListener('loaded', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 1000);
    });

    // Info button click handler
    if (infoButton) {
        infoButton.addEventListener('click', function() {
            instructionsOverlay.classList.add('active');
        });
    }

    // Close instructions handler
    if (closeInstructionsBtn) {
        closeInstructionsBtn.addEventListener('click', function() {
            instructionsOverlay.classList.remove('active');
        });
    }

    // Close instructions when clicking outside
    instructionsOverlay.addEventListener('click', function(e) {
        if (e.target === instructionsOverlay) {
            instructionsOverlay.classList.remove('active');
        }
    });

    // Marker detection events
    if (hiroMarker) {
        // Marker found
        hiroMarker.addEventListener('markerFound', function() {
            console.log('Marker detectat!');
            showMarkerDetected();
            
            // Add animation or effects when marker is found
            const model = document.getElementById('ar-model');
            if (model) {
                model.setAttribute('animation__bounce', {
                    property: 'position',
                    to: '0 0.7 0',
                    dur: 1000,
                    easing: 'easeInOut',
                    direction: 'alternate',
                    loop: true
                });
            }
        });

        // Marker lost
        hiroMarker.addEventListener('markerLost', function() {
            console.log('Marker pierdut!');
            hideMarkerDetected();
            
            // Remove bounce animation
            const model = document.getElementById('ar-model');
            if (model) {
                model.removeAttribute('animation__bounce');
            }
        });
    }

    // Handle camera permission errors
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            console.log('Acces la cameră acordat');
        })
        .catch(function(error) {
            console.error('Eroare acces cameră:', error);
            showCameraError();
        });
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
 * Gestionează evenimentele de click pe modelul 3D
 */
document.addEventListener('click', function(event) {
    // Log clicks for debugging
    console.log('Click detectat:', event);
});

// Performance monitoring (optional)
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Timp de încărcare:', pageLoadTime + 'ms');
        }, 0);
    });
}

