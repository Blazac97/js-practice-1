const countryItems = [
    {
        name: 'Sweden',
        icon: 'https://cdn.countryflags.com/thumbs/sweden/flag-400.png'
    },
    {
        name: 'Russia',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/1200px-Flag_of_Russia.svg.png'
    },
    {
        name: 'Spain',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/2560px-Flag_of_Spain.svg.png'
    },
    {
        name: 'Ukrain',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg'
    }
]

const container = document.querySelector('#container')
const length = countryItems.length;
const wikiLink = 'en.wikipedia.org/wiki/';
const wikiUrl = 'https://en.wikipedia.org/wiki/';
const onChange = document.querySelector('.onChange');
const onSubmit = document.querySelector('.onSubmit');
const submit = document.getElementById('submitbtn');
const textArea = document.querySelector('.textArea');
const getJsonbutt = document.getElementById('json')
const resetJson = document.getElementById('reset')
let input = document.querySelector('#input');
let submitType = 'change';
let searchValue = ''

input.addEventListener("input", function (e) {
    searchValue = e.target.value
    if (submitType == 'change') {
        const result = search(e.target.value);
        render(result);
    }
})

submit.addEventListener("click", function (e) {
    if (submitType == 'submit') {
        const result = search(searchValue);
        render(result);
    }
})

onChange.addEventListener("click", function () {
    submitType = 'change';
})
onSubmit.addEventListener("click", function () {
    submitType = 'submit';
})

function search(value) {
    if (!value) {
        return countryItems
    }
    const result = countryItems.filter(country => {
        const temp = country.name.startsWith(value)
        return temp;
    })
    return result;
}

getJsonbutt.addEventListener("click", function () {
    const result = search(searchValue);
    textArea.innerHTML = JSON.stringify(result);
})
resetJson.addEventListener("click", function () {
    textArea.innerHTML = ''
})
// заинициализировать поля до конструктора , name ,icon
class Country {
    constructor(name, icon) {
        this.name = name;
        this.icon = icon;
        const newCountry = document.createElement('li');
        const newLink = document.createElement('a');
        const divI = document.createElement('div');
        const divT = document.createElement('div');
        const divU = document.createElement('div');
        const divUU = document.createElement('div')
        const divV = document.createElement('div');
        const newIcon = document.createElement('img');
        // const icon = this.icon;
        newIcon.src = this.icon;
        newLink.href = `${wikiUrl}${this.name}`;
        newLink.classList.add("link");
        newIcon.classList.add("flex");
        divI.classList.add("icon");
        divT.classList.add("text")
        divV.classList.add("vision");
        divUU.classList.add("undlink")
        // container.appendChild(newCountry);
        newCountry.appendChild(newLink);
        newLink.appendChild(divI);
        newLink.appendChild(divT);
        divT.appendChild(divU);
        divT.appendChild(divUU);
        divU.innerHTML = `<p> ${this.name}</p>`;
        divUU.innerHTML = `<p> ${wikiLink}${this.name}</p>`;
        divI.appendChild(newIcon);
        newLink.appendChild(divV);
        divV.innerHTML = `<i class="fa fa-chevron-right" aria-hidden="true"></i>`
        this.element = newCountry;
    }

    attach(cont) {
        cont.appendChild(this.element);
    }
}
function render(countries) {
    container.innerHTML = ''
    for (let i = 0; i < countries.length; i++) {
        let country = new Country(`${countries[i].name}`, `${countries[i].icon}`);
        country.attach(container);
    }
};
render(countryItems)
