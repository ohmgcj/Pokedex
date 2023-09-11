var urlImg = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
var pokePorPag = 12;
var pagAtual = 1;

function buscaPag(pagina) {
    const pokeElement = document.getElementById("pokemonsId");
    pokeElement.innerHTML = ''
    const requests = [];
    for (let i = (pagina - 1) * pokePorPag + 1; i <= pagina * pokePorPag; i++) {  
        let pokeInfoUrl = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        requests.push(fetch(pokeInfoUrl));
    }
    Promise.all(requests)
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(dataArray => {
            dataArray.forEach((data, index) => {
                const i = (pagina - 1) * pokePorPag + 1 + index;
                const pokeImg = `${urlImg}${i}.png`;
                const nome = data.name;
                const tipos = data.types;

                if (tipos && tipos.length > 0) {
                    const tiposDoPokemon = tipos.map(tipo => tipo.type.name)
                    criaLiComImagemETexto(pokeImg, nome, tiposDoPokemon, i);
                }
            });
        })
        .catch(error => console.error('Erro ao buscar informações do Pokémon:', error));
}

function avancarPagina() {
    pagAtual++
    buscaPag(pagAtual)
}

function voltarPagina() {
    pagAtual--
    buscaPag(pagAtual)
}

function reset() {
    pagAtual = 1
    buscaPag(pagAtual)
}


function criaLiComImagemETexto(src, nome, tipo, i){
    const pokeElement = document.getElementById("pokemonsId")
    
    const listItem = document.createElement("li")

    const divInfo = document.createElement("div")
    divInfo.classList.add('pokeInfo')
    
    const ordList = document.createElement("ol") //Ol que vai ser usada para guardar os tipos
    ordList.classList.add('pokeTipo')

    const image = document.createElement("img");
    image.src = src;

    const text = document.createElement("span");
    text.textContent = nome;
    text.classList.add('pokeNome')

    const id = document.createElement("span");
    id.textContent = `#${i}`;
    id.classList.add('pokeId')
    
    listItem.appendChild(id);
    listItem.appendChild(text);
    listItem.appendChild(divInfo)
    listItem.classList.add(tipo[0])
    divInfo.appendChild(ordList);

    tipo.forEach(tipo  => {
        const type = document.createElement("li");
        type.textContent = tipo
        type.classList.add(tipo)
        ordList.appendChild(type)
    });

    divInfo.appendChild(image); // Adicione a imagem ao elemento <li>
    pokeElement.appendChild(listItem); // Adicione o elemento <li> à lista <ol>

    if (pagAtual == 1) {
        document.querySelector('#btn1').disabled = true;
    } else {
        document.querySelector('#btn1').disabled = false;
    }
}
buscaPag(pagAtual)