//Variables contendoras de caracteres(se convertirán en array por el .split) que se van a incluir en el array.
const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz".split("");
const numbers = "0123456789".split("");
const specialCharacters = "~`!@#$%^&*()-_+=[]{}|:;<>.,?/".split("");

let textEl = document.querySelector("#password-text"); //Variable textEl para acceder al password generado en el DOM
let currentPasswordLenght = 15; // Variable que obtiene la longitud del password.

function generatePassword() {
  let allowedCharacters = [];  //allowedCharacters es el array que contenerá los caracteres de las variables de diferentes tipos.

  if (document.querySelector("#use-upper").checked)
    allowedCharacters = allowedCharacters.concat(upperCaseLetters); //el (if) concatenará dentro del array principal (allowedCharacters) los arrays definidos por las variables con los caracterés (Ej: hasUpper)

  if (document.querySelector("#use-lower").checked)
    allowedCharacters = allowedCharacters.concat(lowerCaseLetters);

  if (document.querySelector("#use-numbers").checked)
    allowedCharacters = allowedCharacters.concat(numbers);

  if (document.querySelector("#use-special").checked)
    allowedCharacters = allowedCharacters.concat(specialCharacters);

  if (allowedCharacters.length === 0) return alert("Must select an option");

  textEl.textContent = ""; 
  for (let i = 0; i < currentPasswordLenght; i++) { // El loop (for) generará en base al valor de (currentPasswordLenght) la cantidad de caracteres que generará
    
    let randomNumber = Math.floor(Math.random() * allowedCharacters.length); // La variable (randomNumber) generá números random abarcando todas los posibles caracteres del array (allowedCharacters)
    textEl.textContent += allowedCharacters[randomNumber]; // Luego hace que el contenido del password sea igual a los valores que coincidan de los numeros de (randomNumber) con su posicion del valor del array(allowedCharacters)
  } 

  document.querySelector("#copy-icon").classList.add("enable"); 

  evaluatePassword(textEl.textContent); 
}


function copy() {
  let passwordCopy = document.querySelector("#password-text").textContent;

  navigator.clipboard.writeText(passwordCopy);

  let tooltip = document.querySelector("#tooltip");

  tooltip.style.visibility = "visible";

  setTimeout(function () {
    tooltip.style.visibility = "hidden";
  }, 550);
}


const slider = document.querySelector("#password-length");
const lengthDisplay = document.querySelector("#length-display");

slider.oninput = function () {
  lengthDisplay.textContent = this.value;
  currentPasswordLenght = this.value;
};

//La función (evaluatePassword) tiene un parametro denominado (password) su finalidad sera que el parametro password sea remplazado por el valor de text.El ( o sea el contenido del texto deL PASSWORD generado)
function evaluatePassword(password) {
  const strengthIndicator = document.querySelector("#password-strength");
  const passwordStrengthBar = document.querySelector("#password-strength-bar");
  

  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecial = /[~`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const size = password.length;
  let barWidth, barColor;

  if (size < 8) {
    barWidth = 10; // Representa un 10% del ancho de la barra
    barColor = "#ff3e3e"; // Rojo, débil
    strengthIndicator.textContent = "Even a Stormtrooper could hit this target.";
  } else if (size >= 8 && size <= 11) {
    barWidth = 40; // Representa un 40% del ancho de la barra
    barColor = "#ffae00"; // Naranja, moderado
    strengthIndicator.textContent = "Moderate";
  } else if (size >= 12 && size <= 14) {
    barWidth = 70; // Representa un 70% del ancho de la barra
    barColor = "#ffff3e"; // Amarillo, bueno
    strengthIndicator.textContent = "This password is the One Ring of passwords — hard to find and harder to break.";
  } else if (size >= 15) {
    barWidth = 100; // Representa un 100% del ancho de la barra
    barColor = "#3eff3e"; // Verde, fuerte
    strengthIndicator.textContent = "As unbreakable as adamantium.";
  }

  passwordStrengthBar.style.width = `${barWidth}%`;
  passwordStrengthBar.style.backgroundColor = barColor;
}
