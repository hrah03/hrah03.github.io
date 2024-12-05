function toggleOverlay(overlayId) {
    document.querySelectorAll('.overlay').forEach((el) => {
      el.style.display = el.id === overlayId && el.style.display !== 'flex' ? 'flex' : 'none';
    });
  }