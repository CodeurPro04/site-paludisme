
    AOS.init();//Ici c'est un script qu'on dois initialiser pour l'effet AOS

    // Coordonnées du centre de la Côte d'Ivoire
    var map = L.map('map').setView([7.539989, -5.547080], 6);  // Centre de la Côte d'Ivoire

    // Limites géographiques de la Côte d'Ivoire (bounding box)
    var bounds = [
        [4.5, -7.5],  // Sud-Ouest
        [11.5, -2.5]  // Nord-Est
    ];

    // Ajout d'un fond de carte (ici OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Appliquer les limites à la carte (empêcher de se déplacer au-delà des frontières)
    map.setMaxBounds(bounds);

    // Liste des zones affectées par le paludisme avec des informations
    var malariaZones = [
        {
            name: "Zone Sud",
            lat: 5.000000,
            lon: -4.000000,
            incidenceRate: "10%",
            mortalityRate: "2%",
            population: "500,000",
            details: "Zone avec transmission quasi toute l'année, endémique. Forte incidence.",
            color: "green" 
        },
        {
            name: "Zone Nord",
            lat: 10.000000,
            lon: -5.500000,
            incidenceRate: "15%",
            mortalityRate: "1.5%",
            population: "700,000",
            details: "Transmission pendant la saison des pluies. Climat favorable à la prolifération des moustiques.",
            color: "orange" 
        },
        {
            name: "Zone Centre",
            lat: 7.500000,
            lon: -5.000000,
            incidenceRate: "12%",
            mortalityRate: "1.2%",
            population: "600,000",
            details: "Endémique, transmission plus courte, mais fortement affectée.",
            color: "yellow" 
        },
        {
            name: "Zone Est",
            lat: 7.000000,
            lon: -3.500000,
            incidenceRate: "13%",
            mortalityRate: "1.3%",
            population: "650,000",
            details: "Zone où la déforestation a accentué la propagation du paludisme.",
            color: "red" 
        }
        // Ajouter d'autres zones avec leurs informations ici
    ];

    // Ajouter un marqueur et un polygone pour chaque zone affectée par le paludisme
    malariaZones.forEach(function(zone) {
        var popupContent = `
            <b>${zone.name}</b><br>
            Taux d'incidence : ${zone.incidenceRate}<br>
            Taux de mortalité : ${zone.mortalityRate}<br>
            Population touchée : ${zone.population}<br>
            Détails : ${zone.details}
        `;
        
        // Définir des coordonnées approximatives pour un polygone représentant la zone
        var zoneCoords = [
            [zone.lat + 0.5, zone.lon - 0.5],
            [zone.lat + 0.5, zone.lon + 0.5],
            [zone.lat - 0.5, zone.lon + 0.5],
            [zone.lat - 0.5, zone.lon - 0.5]
        ];

        // Ajouter le polygone à la carte avec une couleur spécifique
        L.polygon(zoneCoords, {
            color: 'black',
            weight: 2,
            fillColor: zone.color, 
            fillOpacity: 0.5
        }).addTo(map);

        // Ajouter un marqueur au centre de la zone
        L.marker([zone.lat, zone.lon]).addTo(map)
            .bindPopup(popupContent);
    });

    // Empêcher le zoom arrière après un certain niveau
    map.on('drag', function() {
        map.panInsideBounds(bounds);
    });
    
    // ici c'est pour masquer le prechargement
    window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
        preloader.style.display = 'none';
        }, 500); 
    }, 100); 
    });

    document.addEventListener("DOMContentLoaded", function() {
        const navLinks = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('section');
    
        // Fonction pour gérer l'état actif au défilement
        function handleScroll() {
            let currentSectionId = '';
    
            // Vérifier quelle section est actuellement visible
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100; // Ajuster la position si nécessaire
                const sectionBottom = sectionTop + section.offsetHeight;
    
                // Vérifier si la section est visible dans la fenêtre
                if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                    currentSectionId = section.id;
                }
            });
    
            // Mettre à jour l'état actif dans la barre de navigation
            navLinks.forEach(link => {
                const span = link.querySelector('span');
                if (link.getAttribute('href').substring(1) === currentSectionId) {
                    link.classList.add('text-blue-600', 'font-semibold'); // Ajoute la couleur bleue au texte
                    if (span) {
                        span.classList.add('w-full');
                        span.classList.remove('w-0');
                    }
                } else {
                    link.classList.remove('text-blue-600', 'font-semibold'); // Retire la couleur bleue
                    if (span) {
                        span.classList.remove('w-full');
                        span.classList.add('w-0');
                    }
                }
            });
        }
    
        // Ajouter un événement scroll pour mettre à jour la barre bleue et la couleur du texte
        window.addEventListener('scroll', handleScroll);
    
        // Appliquer le scroll immédiatement après le chargement pour avoir le bon état actif
        handleScroll();
    
        // Ajouter un événement click pour que l'élément cliqué soit coloré en bleu
        navLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault(); // Empêche l'action de défilement brute
    
                // Retirer la couleur bleue de tous les liens
                navLinks.forEach(link => {
                    link.classList.remove('text-blue-600', 'font-semibold');
                    const span = link.querySelector('span');
                    if (span) {
                        span.classList.remove('w-full');
                        span.classList.add('w-0');
                    }
                });
    
                // Ajouter la couleur bleue et la barre bleue sous le lien cliqué
                link.classList.add('text-blue-600', 'font-semibold');
                const span = link.querySelector('span');
                if (span) {
                    span.classList.add('w-full');
                    span.classList.remove('w-0');
                }
    
                // Si le lien cliqué est "Accueil", scroll vers le haut avec un défilement fluide
                if (link.getAttribute('href') === '#') {
                    document.querySelector('body').scrollIntoView({ behavior: 'smooth' });
                } else {
                    // Sinon, effectuer le scroll normal vers la section
                    const targetSection = document.querySelector(link.getAttribute('href'));
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    
        // Définir "Accueil" comme actif par défaut lors du chargement de la page
        const defaultLink = document.querySelector('#nav-accueil');
        const defaultSpan = defaultLink.querySelector('span');
        defaultLink.classList.add('text-blue-600', 'font-semibold');
        if (defaultSpan) {
            defaultSpan.classList.add('w-full');
            defaultSpan.classList.remove('w-0');
        }
    });