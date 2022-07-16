var searchSpan = document.getElementById('search-span');
var historySpan = document.querySelector('#history-span');
var searchBtn = document.querySelector('#search-button');
var citySearch = document.getElementById('city-search');

var searchHistory = [];

// Q: why does this function not automatically run on page load/reload?
function renderHistory() {
    historySpan.innerHTML = '';

    for (var i = 0; i < searchHistory.length; i++) {
        var searchList = searchHistory[i];

        var btn = document.createElement('button');
        btn.textContent = searchList;
        btn.setAttribute('data-index', i);
        historySpan.appendChild(btn);

    }
}

function init() {
    var storedSearch = JSON.parse(localStorage.getItem('history'));

    if (storedSearch !== null) {
        searchList = storedSearch;
    }

    renderHistory();

    console.log(storedSearch);
}

function storeHistory() {
    localStorage.setItem("history", JSON.stringify(searchHistory));
}

function search() {
    var cityInput = citySearch.value.trim();

    if (cityInput === "") {
        return;
    }

    searchHistory.push(cityInput);
    citySearch.value = "";

    storeHistory();
    renderHistory();

    console.log(cityInput);
}

searchBtn.addEventListener('click', function(event) {
    event.preventDefault();

    search();
});

init();