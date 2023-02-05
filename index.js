const lengthSlider = document.querySelector('.pass-lenght input'),
    options = document.querySelectorAll('.options input'),
    passwordInput = document.querySelector('.input-box input'),
    copyIcon = document.querySelector('.input-box span'),
    megCopy = document.querySelector('.input-box span.msg-copied'),
    passIndicator = document.querySelector('.pass-inficator'),
    generateBtn = document.querySelector('.generate-btn');

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!£$%&/()=?_+*#-.,;:<>|@~{}[]",

}
const generatePassword = () => {
    let staticPassword = "",
        randowPassword = "",
        excludeDuplate = false,
        passLength = lengthSlider.value;

    options.forEach(option => {
        if (option.checked) {
            if(option.id !== "exc-duplicate" && option.id !== "spaces") {
                staticPassword += characters[option.id];
            }
            if(option.id === "spaces") {
                staticPassword += `  ${staticPassword}  `;
            }
            if(option.id === "exc-duplicate") {
                excludeDuplate = true;
            }
        }
    })

    for (let i = 0; i < passLength; i++) {
        let randomChart = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if(excludeDuplate) {
            !randowPassword.includes(randomChart) ? randowPassword += randomChart : i--;
        }
        if(!excludeDuplate) {
            randowPassword += randomChart;
        }
    }
    passwordInput.value = randowPassword;
}

const updatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 12 ? "medium" : lengthSlider.value <=20 ? "strong" : "very-strong";
}

const updatedSleder = () => {
    document.querySelector('.details span').innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}

updatedSleder()

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.classList.add('copied');
    megCopy.classList.remove('hide-msg');
    copyIcon.innerText = "check";
    setTimeout(() => {
        copyIcon.classList.remove('copied');
        megCopy.classList.add('hide-msg');
        copyIcon.innerText = "content_copy";
    }, 1000);
}
copyIcon.addEventListener('click', copyPassword)
lengthSlider.addEventListener('input', updatedSleder)
generateBtn.addEventListener('click', generatePassword)
