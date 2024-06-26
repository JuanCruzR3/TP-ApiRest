document.getElementById('get-characters').addEventListener('click', fetchAllCharacters);
document.getElementById('filter-characters').addEventListener('click', fetchFilteredCharacters);

function fetchAllCharacters() {
    fetch('https://rickandmortyapi.com/api/character')
        .then(response => response.json())
        .then(data => displayCharacters(data.results))
        .catch(error => displayError(error));
}

function fetchFilteredCharacters() {
    const name = document.getElementById('name').value;
    const status = document.getElementById('status').value;
    const species = document.getElementById('species').value;
    const type = document.getElementById('type').value;
    const gender = document.getElementById('gender').value;

    let url = `https://rickandmortyapi.com/api/character/?name=${name}&status=${status}&species=${species}&type=${type}&gender=${gender}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayCharacters(data.results))
        .catch(error => displayError(error));
}

function displayCharacters(characters) {
    const charactersDiv = document.getElementById('characters');
    charactersDiv.innerHTML = '';

    if (characters.length === 0) {
        charactersDiv.innerHTML = 'No se encontraron personajes.';
        return;
    }

    characters.forEach(character => {
        const characterDiv = document.createElement('div');
        characterDiv.className = 'character';
        characterDiv.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h3>${character.name}</h3>
            <p>${character.status} - ${character.species}</p>
            <p>${character.gender}</p>
        `;
        charactersDiv.appendChild(characterDiv);
    });
}

function displayError(error) {
    const charactersDiv = document.getElementById('characters');
    charactersDiv.innerHTML = `Error: ${error.message}`;
}
