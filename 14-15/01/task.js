let result;
let check = false;


const elementS = document.getElementById("s");
const elementR = document.getElementById("r");
const elementK = document.getElementById("k");
const elementResult = document.getElementById("result");


function verify() {
    console.log("Проверка задачи...");

    let s = parseFloat(elementS.value);
    let r = parseFloat(elementR.value);
    let k = parseFloat(elementK.value);

    console.log("Значения:", s, r, k);

   
    if (s <= 0 || r <= 0 || k < 0 || isNaN(s) || isNaN(r) || isNaN(k)) {
        result = "неправильно";
        check = false;
        elementResult.value = result;
        return;
    }

    

    const hallSide = Math.sqrt(s);
    const requiredSpace = 2 * r + 2 * k;

    if (requiredSpace <= hallSide) {
        result = "правильно";
        check = true;
    } else {
        result = "неправильно";
        check = false;
    }

    elementResult.value = result;
}


function send() {
    if (check) {
        
        const s = parseFloat(elementS.value);
        const r = parseFloat(elementR.value);
        const k = parseFloat(elementK.value);
        const searchQuery = encodeURIComponent(`S=${s}, R=${r}, K=${k}`);
        window.open('https://www.bing.com/search?q=' + searchQuery, '_blank');
    } else {
        
        alert("Ответ неправильный. Проверьте решение и попробуйте снова.");
    }
}


const elementVerify = document.getElementById("verify");
if (elementVerify) {
    elementVerify.addEventListener('click', verify);
}

const elementSend = document.getElementById("send");
if (elementSend) {
    elementSend.addEventListener('click', send);
}
