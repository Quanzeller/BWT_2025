function changeToEnglish() {
    const surnameElement = document.getElementById('surname');
    const nameElement = document.getElementById('name');

    surnameElement.innerHTML = "<b>Alferiev</b>";
    nameElement.innerHTML = "<b>Petr</b>";
}

const passportButton = document.getElementById("for_click");
if (passportButton) {
    passportButton.addEventListener("click", changeToEnglish);
}
