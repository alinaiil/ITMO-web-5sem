(function() {
    const start = window.performance.now();
    function displayPageLoadStatistics() {
        const loadTime = window.performance.now() - start;
        const footerP = document.getElementById("load_time");
        footerP.innerText = `Время загрузки страницы: ${loadTime.toFixed(2)}мс`
    }
    window.addEventListener("load", displayPageLoadStatistics);
})();