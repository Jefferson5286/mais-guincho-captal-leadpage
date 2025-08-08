function gerarEmbedSemAPI(lat: number, lng: number, zoom = 15) {
    return `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
}

function inserirMapa(lat: number, lng: number, zoom: number) {
    const container: HTMLElement | null = document.getElementById("map-container");
    const iframe: HTMLIFrameElement | null = document.createElement("iframe");
    iframe.src = gerarEmbedSemAPI(lat, lng, zoom);
    iframe.allowFullscreen = true;
    iframe.loading = "lazy";

    if (container && iframe) {
        iframe.classList.add('embed-responsive');
        container.innerHTML = "";
        container.appendChild(iframe);
    }
}


inserirMapa(-15.761067068612714, -47.787382364665675, 15);


document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target as HTMLElement;

                if (el.classList.contains('from-left')) {
                    el.classList.add('from-active');
                } else {
                    el.classList.add('reveal-active');
                }

                observer.unobserve(el);
            }
        });
    }, {
        threshold: 0.1,
    });

    const elements = document.querySelectorAll<HTMLElement>('.reveal, .from-left');
    elements.forEach(el => observer.observe(el));
});

