const password=document.getElementById("password");
const output = document.querySelector('output');
const input = document.getElementById('pass-input');
const closeGenPass = document.getElementById('password-close');
const GenPaspopup = document.querySelector('.password-app');

const numbersInput = document.getElementById('numbers');
const charactersInput = document.getElementById('characters');
const symbolsInput = document.getElementById('symbols');

const chars = {
    characters: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    symbols:"!@#$%^&_-*",
    numbers:"0123456789"

} 
let charsOptions;


const handleOptions = () => {
    charsOptions = '';
    if(numbersInput.checked == true) charsOptions= charsOptions+ chars.numbers;
    if(charactersInput.checked == true) charsOptions= charsOptions+ chars.characters;
    if(symbolsInput.checked == true) charsOptions= charsOptions+ chars.symbols;
}


closeGenPass.onclick = function(){
    GenPaspopup.classList.remove('active');
}



const chanheLength = (event) => {
	const { value, min, max, step, parentElement: parent } = event.target;
	const decimals = step && step.includes('.') ? step.split('.')[1] : 1;
	const percent = `${((value - min)/(max - min) * 100).toFixed(decimals)}%`;
	parent.style.setProperty('--p', percent);
	output.value = ` ${value}`;
}


function generatePassword(){
    handleOptions();
    let passwordLength = input.value;
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
        let randomNumber = Math.floor(Math.random()*charsOptions.length);
        password +=charsOptions.substring(randomNumber, randomNumber+1);
    }
    document.getElementById("password").value = password;

}
function copyPassword() {
    let copyText = document.getElementById("password");
    copyText.select();
}

