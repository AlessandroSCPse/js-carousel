const carouselImages = [
    {
        title: 'Giove',
        description: 'Giove (dal latino Iovem, accusativo di Iuppiter) è il quinto pianeta del sistema solare in ordine di distanza dal Sole e il più grande di tutto il sistema solare.',
        image : 'jupiter.jpg'
    },
    {
        title: 'Nebulosa di Orione',
        description: 'Il Complesso nebuloso molecolare di Orione (noto anche semplicemente come Complesso di Orione) è una grande nube molecolare che prende il nome dalla costellazione in cui è visibile, quella di Orione. La sua distanza dalla Terra è stimata fra i 1500 e i 1600 anni luce.',
        image : 'orion-nebula.jpg'
    },
    {
        title: 'Andromeda',
        description: 'E\' una galassia spirale gigante facente parte del Gruppo Locale, assieme alla nostra, la Via Lattea; si trova a circa 3,2 milioni di anni luce da noi. Si tratta della galassia spirale di grandi dimensioni più vicina alla nostra.',
        image : 'andromeda.jpg'
    },
    {
        title: 'Saturno',
        description: 'Saturno è il sesto pianeta del sistema solare in ordine di distanza dal Sole e il secondo pianeta più massiccio dopo Giove. Con un raggio medio 9,48 volte quello della Terra e una massa 95 volte superiore a quella terrestre. Saturno, con Giove, Urano e Nettuno, è classificato come gigante gassoso.',
        image : 'saturn.jpg'
    },
    {
        title: 'Pleiadi',
        description: 'Le Pleiadi (conosciute anche come le Sette sorelle, la Chioccetta o con la sigla M45 del catalogo di Charles Messier) sono un ammasso aperto visibile nella costellazione del Toro.[5] Questo ammasso, piuttosto vicino (440 anni luce),[2] conta diverse stelle visibili a occhio nudo.',
        image : 'pleiadi.jpg'
    }
];

// Variabili indispensabili al funzionamento del programma
const carouselContainer = document.querySelector('.carousel');
const imagesContainer = document.querySelector('.images-container');
const circlesContainer = document.querySelector('.circles-wrapper ul');

// Al caricamento della pagina scrivo nel DOM immagini e cerchietti
drawAllImages(carouselImages, imagesContainer, circlesContainer);

// Selezioni tutte le immagini e tutti i cerchietti per poterli manipolare
const allSingleImages = document.querySelectorAll('.single-image');
const allCircles = document.querySelectorAll('.js-circle');

// Al caricamento della pagina settiamo come attiva l'elemento di default
let currentActiveElement = 0;
setActiveElement();

let autoPlayClock = setInterval(showNextElement, 2000);

// -------------
// EVENT LISTENERS
// -------------

// Al click sulla freccia destra mostro la prossima immagine
const rightArrow = document.querySelector('.js-right-arrow');
rightArrow.addEventListener('click', showNextElement);
function showNextElement() {
    // Mostro l'immagine successiva solo se non sono nell'ultima immagine
    // altrimenti se sono a fine array torno all'inizio
    if(currentActiveElement < allSingleImages.length - 1) {
        // Incrementa di 1 currentActiveElement
        currentActiveElement++;
    } else {
        currentActiveElement = 0;
    }

    setActiveElement();
}

// Al click sulla freccia sinistra mostro l'immagine precedente
const leftArrow = document.querySelector('.js-left-arrow');
leftArrow.addEventListener('click', showPreviousElement);
function showPreviousElement() {
    // Mostro l'immagine precedente solo se non sono nella prima immagine
    // altrimenti se sono all'inizio dell'array ricomincio dalla fine
    if(currentActiveElement > 0) {
        // Decremento di 1 currentActiveElement
        currentActiveElement--;
    } else {
        currentActiveElement = allSingleImages.length - 1;
    }

    setActiveElement();
}

// Al click sul cerchietto mostro l'immagine relativa
allCircles.forEach((circle, index) => {
    circle.addEventListener('click', function() {
        currentActiveElement = index;
        setActiveElement();
    });
});

// Quando l'utente entra col mouse sul carousel, clearInterval di autoPlayClock
carouselContainer.addEventListener('mouseenter', function() {
    clearInterval(autoPlayClock);
});

// Quando l'utente esce col mouse dal carousel, 
carouselContainer.addEventListener('mouseleave', function() {
    autoPlayClock = setInterval(showNextElement, 2000);
});

// -------------
// FUNCTIONS
// -------------

// Stampa in pagina tutti gli elementi del carosello
function drawAllImages(imagesArray, imagesContainer, circlesContainer) {
    imagesArray.forEach((singleImageObject) => {
        // Stampiamo l'immagine
        const imageTemplate = `
        <div class="single-image">
            <img src="img/${singleImageObject.image}" alt="${singleImageObject.title}">

            <div class="single-image-text">
                <h3>${singleImageObject.title}</h3>
                <p>${singleImageObject.description}</p>
            </div>
        </div>
        `;

        imagesContainer.innerHTML += imageTemplate;

        // Stampiamo il cerchietto
        const circleTemplate = `
        <li>
            <a href="#" class="js-circle">
                <i class="fas fa-dot-circle"></i>
            </a>
        </li>
        `;
        circlesContainer.innerHTML += circleTemplate;
    });
}

// Legge currentActiveImage, disabilita un eventuale
// immagine che è attualmente attiva e rende attiva currentActiveImage
function setActiveElement() {
    // Levare la classe active all'elemento che già ce l'ha
    const oldActiveImage = document.querySelector('.single-image.active');
    if(oldActiveImage !== null) {
        oldActiveImage.classList.remove('active');
    }

    // Levare la classe active al cerchietto che già ce l'ha
    const oldActiveCircle = document.querySelector('.js-circle.active');
    if(oldActiveCircle !== null) {
        oldActiveCircle.classList.remove('active');
    }

    // Attivo l'immagine con indice currentActiveImage
    allSingleImages[currentActiveElement].classList.add('active');
    // Attivo il cerchietto con indice currentActiveImage
    allCircles[currentActiveElement].classList.add('active');
}
