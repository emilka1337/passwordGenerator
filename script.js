//#region Checkboxes and sliders

document.querySelectorAll('.custom-checkbox').forEach(item => {
    item.addEventListener("click", function () {
        this.classList.toggle("checked");
    });
});

document.querySelectorAll('input[type="range"]').forEach(item => {
    item.addEventListener("input", function () {
        document.querySelector(`#${this.id}Counter`).innerHTML = this.value;
    })
});

//#endregion

let random = (min, max) => Math.floor(Math.random() * (max - min) + min);


function generatePasswords() {
    const CHECKBOXES_VALUES = [
        document.querySelector('#lowercase').checked,
        document.querySelector('#uppercase').checked,
        document.querySelector('#numbers').checked,
        document.querySelector('#special').checked,
    ];

    const CHARS = ["qwertyuiopasdfghjklzxcvbnm", "QWERTYUIOPASDFGHJKLZXCVBNM", "0123456789", "!@#$%&*()"];
    let charset = "";

    const PASSWORDS_LENGTH = +document.querySelector('#passwordsLength').value;
    const NUMBER_OF_PASSWORDS = +document.querySelector('#numberOfPasswords').value;

    if (!validateCheckboxes(CHECKBOXES_VALUES)) {
        alert("Please, check at least 1 checkbox in settings");
        return;
    }

    document.querySelector('.result').innerHTML = "";

    for (let i in CHECKBOXES_VALUES) {
        if (CHECKBOXES_VALUES[i]) {
            charset += CHARS[i];
        }
    }

    for (let i = 0; i < NUMBER_OF_PASSWORDS; i++) {
        let password = "";

        for (let j = 0; j < PASSWORDS_LENGTH; j++) {
            password += charset[random(0, charset.length)];
        }

        document.querySelector('.result').append(createPasswordContainer(password));
    }
}

function validateCheckboxes(array) {
    for (let value of array) {
        if (value) return true;
    }

    return false;
}

function createPasswordContainer(passwordText) {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.innerHTML = passwordText;

    let copyButton = document.createElement("button");
    copyButton.title = "Copy";
    copyButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg>`

    copyButton.addEventListener("click", function () {
        copyPassword(copyButton, passwordText);
    });

    li.append(span);
    li.append(copyButton);
    return li;
}

function copyPassword(copyButton, passwordText) {
    navigator.clipboard.writeText(passwordText).then(() => {
        copyButton.title = "Copied";
        copyButton.classList.add("animate");
        copyButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/</svg>`;
    });
}

document.querySelector('.generate').addEventListener("click", generatePasswords);