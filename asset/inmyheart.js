function showOverlay(overlayId) {
    document.getElementById(overlayId).classList.add('show');
    document.querySelector('.dimmed-background').classList.add('show');
}

function hideOverlay(overlayId) {
    document.getElementById(overlayId).classList.remove('show');
    document.querySelector('.dimmed-background').classList.remove('show');
}

function hideAllOverlays() {
    document.querySelectorAll('.overlay-card').forEach(overlay => {
        overlay.classList.remove('show');
    });
    document.querySelector('.dimmed-background').classList.remove('show');
}