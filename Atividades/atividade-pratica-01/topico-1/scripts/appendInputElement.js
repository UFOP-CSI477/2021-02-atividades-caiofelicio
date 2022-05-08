const keysInput = document.getElementById('key-type');

keysInput.addEventListener('change', () => {
    if(keysInput.selectedIndex !== 0) {
        appendInputElement();
        return
    }

    deleteInputElement();

});


function appendInputElement() {
    const input = document.querySelector('#key-value');

    if(!input) {
        const label = document.createElement('label');
        const input = document.createElement('input');
        const target = document.getElementsByClassName('input-key')[0];

        label.setAttribute('for', 'key-value');
        label.innerHTML = 'Valor da chave';
        label.className = 'key-label';
        
        input.setAttribute('id', 'key-value');
        
        personalizeInputElement(input, keysInput.value);
        
        target.appendChild(label);
        target.appendChild(input);
        return
    }
    personalizeInputElement(input, keysInput.value);
    return
}

function deleteInputElement() {
    const input = document.querySelector('#key-value');
    const label = document.querySelector('.key-label');

    if(input) {
        input.parentNode.removeChild(input);
        label.parentNode.removeChild(label);
    }

    return

}

function personalizeInputElement(input, key) {
    switch(key) {
        case 'cpf':
            input.setAttribute('placeholder', 'Digite seu CPF');
            break;
        case 'cnpj':
            input.setAttribute('placeholder', 'Digite seu CNPJ');
            break;
        case 'email':
            input.setAttribute('placeholder', 'Digite seu E-mail');
            input.setAttribute('type', 'email');
            break;
        case 'phone':
            input.setAttribute('placeholder', 'Digite seu Telefone');
            input.setAttribute('type', 'tel');
            break;
        case 'random':
            input.setAttribute('placeholder', 'Digite o valor da chave');
            break;
    }
}