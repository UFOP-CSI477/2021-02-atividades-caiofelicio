function loadBanks() {
  fetch("https://brasilapi.com.br/api/banks/v1")
    .then((response) => response.json())
    .then((data) => {
      const banksSelect = document.querySelector("#bank");
      data.forEach((bank) => {
        const option = document.createElement("option");
        option.value = bank.code;
        option.text = bank.fullName;
        banksSelect.add(option);
      });
    });
}

loadBanks();
