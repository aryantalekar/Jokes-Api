const url = "https://official-joke-api.appspot.com/random_joke";
const revealPunchline = document.querySelector('#reveal');
const nextJoke = document.querySelector('#nextJoke');
const setupUi = document.querySelector('#setup');
const punchlineUi = document.querySelector('#punchline');
const loadingUi = document.querySelector('#loading');

let isFetching = false;

async function api() {
    if (isFetching) {
        return;
    }

    isFetching = true;
    loadingUi.style.display = 'block';

    try {
        const response = await fetch(url);
        const data = await response.json();

        const setup = data.setup;
        const punchline = data.punchline;

        setupUi.innerHTML = setup;
        punchlineUi.dataset.punchline = punchline;
        punchlineUi.innerHTML = "";
    } catch (error) {
        console.error("Error fetching joke:", error);
    } finally {
        isFetching = false;
        loadingUi.style.display = 'none';
    }
}

function reveal() {
    const punchlineUi = document.querySelector('#punchline');
    punchlineUi.innerHTML = punchlineUi.dataset.punchline;
}

function clearUi() {
    const setupUi = document.querySelector('#setup');
    const punchlineUi = document.querySelector('#punchline');

    setupUi.innerHTML = "";
    punchlineUi.innerHTML = "";
}

revealPunchline.addEventListener('click', reveal);

nextJoke.addEventListener('click', () => {
    clearUi();
    api();
});

api();
