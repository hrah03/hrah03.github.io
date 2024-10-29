function toggleOverlay(quoteNumber) {
    document.querySelectorAll(".overlay-card").forEach(card => card.classList.remove("show"));
    document.querySelector(".dimmed-background").classList.toggle("show");

    const overlayCard = document.getElementById(`overlayCard${quoteNumber}`);
    overlayCard.classList.toggle("show");
}