const button = document.querySelector('.finish-button');
let saldo = 0;

button.addEventListener("click", (event) => {
    event.preventDefault()

    showResume();
})

function formIsValid() {
    if(document.querySelector("#key-value") === null)
        return false

    const pixKeyValue = document.querySelector("#key-value");
    const transferValue = document.querySelector('#value').value;
    const bank = document.querySelector('#bank');
    const date = document.querySelector('#date').value;

    if( pixKeyValue === '' || transferValue === '' || bank.value === '' || date === '') {
        return false
    }

    return true

}

function showResume() {
    if(!formIsValid()){
        alert('Preencha todos os campos');
        return
    }

    console.log(formIsValid())

    const display = document.querySelector('.right-side');
    
    let pixKey = document.querySelector('#key-value').value;
    let transferValue = Number(document.querySelector('#value').value);
    let opType = document.querySelector('#operation');
    let bank = document.querySelector('#bank');

    let transferValueFormated = transferValue.toLocaleString(
        'pt-BR',
        {
            style: 'currency',
            currency: 'BRL'
        }
    );

    const saldoFormatado = calculaSaldo(transferValue, opType.value);

    document.getElementsByClassName('op-key')[0].innerHTML = "Chave: " + `<strong>${pixKey} </strong>` 

    document.getElementsByClassName('op-value')[0].innerHTML = "Valor: " + `<strong>${transferValueFormated} </strong>` 

    document.getElementsByClassName('op-type')[0].innerHTML = "Tipo de operação: " + `<strong>${opType.options[opType.selectedIndex].text} </strong>` 

    document.getElementsByClassName('op-bank')[0].innerHTML = "Banco: " + `<strong>${bank.options[bank.selectedIndex].text} </strong>` 

    if(saldoFormatado.includes("-")){
        document.getElementsByClassName('op-balance')[0].innerHTML = "Saldo: " + `<strong style="color: red">${saldoFormatado} </strong>` 
    }else {
        document.getElementsByClassName('op-balance')[0].innerHTML = "Saldo: " + `<strong style="color: #22c55f">${saldoFormatado} </strong>` 
    }


    display.style.display = 'block';

}

function calculaSaldo(saldoAntigo, opType) {
    if(opType === 'send')
        saldo -= saldoAntigo;
    else
        saldo += saldoAntigo;

    const saldoFormatado = saldo.toLocaleString( 'pt-BR', { style: "currency", currency: "BRL" } )
    return saldoFormatado;
}