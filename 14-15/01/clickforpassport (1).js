function find_edit() {
    const surnameNod = document.getElementById('surname')
    surnameNod.innerHTML = "<b>Alferiev</b>"

    const nameNod = document.getElementById('name')
    nameNod.innerHTML= "<b>Peter</b>"
}

const node_for_click = document.getElementById("for_click")
node_for_click.addEventListener("click", find_edit)

