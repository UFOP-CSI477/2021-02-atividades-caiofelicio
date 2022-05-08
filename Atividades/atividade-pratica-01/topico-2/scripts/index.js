function getAllCurrencies() {
    fetch("https://openexchangerates.org/api/currencies.json")
    .then(response => response.json())
    .then(data => { 
        addOnSelect(data, "src-currency")
        addOnSelect(data, "from-currency")
    })
    .catch(error => { console.log(error) })
}


function addOnSelect(currencies, elementId) {
    let select = document.getElementById(elementId);
    
    Object.keys(currencies).forEach(key => {
        let option = document.createElement("option");
        option.value = key;
        option.text = key + " - " + currencies[key];
        select.add(option);
    })
}

getAllCurrencies()