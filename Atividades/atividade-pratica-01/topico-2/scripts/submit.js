const submitButton = document.getElementById('submit-button');
const result = document.getElementsByClassName('result')[0];
const [srcCurrencySelect, fromCurrencySelect] = document.querySelectorAll('select');

submitButton.addEventListener('click', function (event) {
    event.preventDefault();

    if(srcCurrencySelect.selectedIndex == 0) {
        result.style.color = "red";
        result.innerHTML = "Por favor, selecione uma moeda de origem.";
        return
    }

    if(fromCurrencySelect.selectedIndex == 0) {
        result.style.color = "red";
        result.innerHTML = "Por favor, selecione uma moeda de destino.";
        return
    }
    
    let input = document.getElementById("amount");

    if(verifyInput(input)){
        const amount = input.value;
        input.value = input.value.replace(".", ",");
        request(amount);
    }
})

function verifyInput(field) {
    let value = field.value;

    if (value.includes(",")) {
        value = value.replace(",", ".");
    }

    // check if is numeric
    if (isNaN(value)) {
        field.style.border = "1px solid red";
        result.style.color = "red";
        result.innerHTML = "Por favor, digite um número válido.";
        return false;
    }

    // check if amoutn is greater than 0
    if (value <= 0) {
        field.style.border = "1px solid red";
        result.style.color = "red";
        result.innerHTML = "Digite um valor maior que zero para ser convertido.";
        return false;
    }

    value = Number(value).toFixed(2);
    field.value = value;
    field.style.border = "1px solid green";
    return true
}

function request(amount) {
    const apiKey = "ab4d6fbcbc0e238eeb52ac6f1873e149b6f5b043"
    const srcCurrency = srcCurrencySelect.options[srcCurrencySelect.selectedIndex].text.substring(0, 3)
    const fromCurrency = fromCurrencySelect.options[fromCurrencySelect.selectedIndex].text.substring(0, 3)

    const baseURL = `https://api.getgeoapi.com/v2/currency/convert?api_key=${apiKey}&from=${srcCurrency}&to=${fromCurrency}&amount=${amount}`;

    fetch(baseURL).then(response => response.json()).then(data => {
        let fromValue = Number(data.rates[fromCurrency].rate_for_amount).toFixed(2).replace(".", ",");
        const srcValue = amount.replace(".", ",");

        result.style.color = "green";
        result.innerHTML = ` ${srcValue} ${srcCurrency} = ${fromValue} ${fromCurrency}`;

    }).catch(error => {
        const result = document.getElementsByClassName('result')[0];
        result.innerHTML = `${error}`;
    })
}