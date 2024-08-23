window.onload = function() {
    var music = document.getElementById('song');
    music.muted = false;
    music.play();
}
var audio = document.getElementById('song');
audio.volume = 0.2;

// Rango de personajes para cada sección
const sections = {
    section1: { min: 1, max: 5, current: 1},
    section2: { min: 6, max: 10, current: 6},
    section3: { min: 11, max: 15, current: 11},
};

// Función generadora para obtener IDs secuenciales
function* generatorIds(min, max) {
    for (let i = min; i <= max; i++) {
        yield i;
    };
};

// Crear generadores para cada sección
const generators = {
    section1: generatorIds(1, 5),
    section2: generatorIds(6, 10),
    section3: generatorIds(11,15),
};

// Función para obtener los datos de la API
async function fetchCharacter(id) {
    const response = await fetch(`https://swapi.dev/api/people/${id}/`);
    const data = await response.json();
    return data;
};

// Función para agregar personajes a la sección correspondiente
async function addCharacter(sectionId, sect) {
    const generator = generators[sectionId];
    const { value: characterId, done } = generator.next();

    if (done) {
        document.getElementById(`button${sectionId.slice(-1)}`).disabled = true;
        return;
    };

    const characterData = await fetchCharacter(characterId);
    const characterDiv = document.createElement('div');
    characterDiv.className = 'character';
    characterDiv.innerHTML = `
    <div class="card-container">
        <div class="card-logo-${sect}">
            <p></p>
        </div>
        <div class="card-info">
            <h2>${characterData.name}</h2>
            <p>
                Estatura: ${characterData.height} cm. 
                Peso: ${characterData.mass} kg.
            </p>
        </div>
    </div>
    `;
    document.getElementById(sectionId).appendChild(characterDiv);
};

// Event Listeners para los botones
document.getElementById('button1').addEventListener('click', () => addCharacter('section1','1'));
document.getElementById('button2').addEventListener('click', () => addCharacter('section2','2'));
document.getElementById('button3').addEventListener('click', () => addCharacter('section3','3'));
