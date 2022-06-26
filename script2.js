let random = (min, max) => Math.floor(Math.random() * (max - min) + min);

const PASSWORDS_LENGTH = prompt("Введите длину паролей:");
const NUMBER_OF_PASSWORDS = prompt("Введите количество паролей:");

const QUESTIONS = ["Включить буквы в нижнем регистре?", "Включить буквы в верхнем регистре?", "Включить цифры?", `Включить специальные символы ?`]
const CHARS = ["qwertyuiopasdfghjklzxcvbnm", "QWERTYUIOPASDFGHJKLZXCVBNM", "0123456789", "!@#$%&*()"];

let setOfChars = "";

for (let i in QUESTIONS) {
    if (confirm(`${QUESTIONS[i]}`)) {
        setOfChars += CHARS[i];
    }
}

for (let i = 0; i < NUMBER_OF_PASSWORDS; i++) {
    let password = "";

    for (let j = 0; j <= PASSWORDS_LENGTH; j++) {
        password += setOfChars[random(0, setOfChars.length)];
    }

    console.log(password);
}