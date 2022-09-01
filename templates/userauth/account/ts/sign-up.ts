/// <reference lib="es2015"/>
/*
* Variables for the component
*/

const correctClass: string = 'text-correct'
const incorrectClass: string = 'text-incorrect'


/*
* Methods for the component
*/


/*only if the email input field is 5+ chars we send request to django to check if it's valid.*/
function emailLength(textInput: string) {
    return textInput.length >= 5
}


function nameLength(): boolean {
    const inputValue: string = (<HTMLInputElement>document.getElementById("display-input")).value;
    let result: boolean = false
    if (inputValue.length < 2) {
        const nameFeedback: HTMLElement | null = document.getElementById("name-feedback")
        if (nameFeedback != null) {
            nameFeedback.innerText = "Please enter a name at least 2 characters long."
            nameFeedback.classList.value = incorrectClass
        }
        result = false
    } else {
        result = true
    }
    //TODO: Button can be evaluated before the response from the server arrives
    setTimeout(() => {
        evaluateButton()
    }, 500)
    return result
}

//CHECK EMAILS
function compareEmails() {
    setTimeout(() => {
        const emailFeedback: HTMLElement | null = document.getElementById("email-feedback")
        const emailFeedback2: HTMLElement | null = document.getElementById("email-feedback2")

        const emailOne = (<HTMLInputElement>document.getElementById("email-input")).value
        const emailTwo = (<HTMLInputElement>document.getElementById("email-input2")).value


        if (emailOne.length !== 0 && emailTwo.length !== 0) {

            if (emailFeedback != null && emailFeedback2 != null) {
                const emailFeedbackClasses: DOMTokenList = emailFeedback.classList
                let emailFeedbackClasses2: DOMTokenList = emailFeedback2.classList

                // check if the first email is correct
                if (/^text-incorrect$/.test(String(emailFeedbackClasses))) {
                    emailFeedback2.innerText = "Please enter a correct email above first."
                    emailFeedback2.classList.value = incorrectClass
                }
                // compare email input values
                else if (emailOne !== emailTwo) {
                    emailFeedback2.classList.value = incorrectClass
                    emailFeedback2.innerText = "Sorry, e-mails do not match."

                } else {
                    emailFeedbackClasses2.value = correctClass
                    emailFeedback2.innerText = "Thank you for entering matching emails."
                }
            }
        }
        evaluateButton()
    }, 750)
}


// CHECK PASSWORDS
function comparePasswords() {
    setTimeout(() => {

        const passwordFeedback: HTMLElement | null = document.getElementById("password-feedback1")
        const passwordFeedback2: HTMLElement | null = document.getElementById("password-feedback2")

        const passwordOne: string = (<HTMLInputElement>document.getElementById("password-input1")).value
        const passwordTwo: string = (<HTMLInputElement>document.getElementById("password-input2")).value

        // check if one of the passwords is not empty
        if (passwordOne.length !== 0 && passwordTwo.length !== 0) {


            if (passwordFeedback != null && passwordFeedback2 != null) {

                const passwordFeedbackClasses: DOMTokenList = passwordFeedback.classList
                let passwordFeedbackClasses2: DOMTokenList = passwordFeedback2.classList

                // check if the first email is correct
                if (checkIfIncorrect(passwordFeedbackClasses)) {
                    passwordFeedbackClasses2.value = incorrectClass
                    passwordFeedback2.innerText = "Please enter a secure password above first."
                }
                // compare email input values
                else if (passwordOne !== passwordTwo) {
                    passwordFeedbackClasses2.value = incorrectClass
                    passwordFeedback2.innerText = "Sorry, passwords do not match."
                } else {
                    passwordFeedbackClasses2.value = correctClass
                    passwordFeedback2.innerText = "Thank you, passwords do match."
                }
            }
        }
        evaluateButton()
    }, 500)
}

function passwordFeedback() {

    let passwordFeedback: HTMLElement | null = document.getElementById("password-feedback1")
    const passwordEntered: string = (<HTMLInputElement>document.getElementById("password-input1")).value

    if (passwordEntered.length < 1)
        return


    const passwordQuality = checkPasswordQuality(passwordEntered)

    if (passwordFeedback == null)
        return

    if (passwordQuality.includes("Secure")) {
        passwordFeedback.innerText = `${passwordQuality} password, well done!`
        passwordFeedback.classList.value = correctClass
    } else if (passwordQuality.includes("Good")) {
        passwordFeedback.innerText = `${passwordQuality} password, thank you.`
        passwordFeedback.classList.value = correctClass

    } else if (passwordQuality.includes("Weak")) {
        passwordFeedback.innerText = `${passwordQuality} password, spicy it up please!`
        passwordFeedback.classList.value = incorrectClass

    } else {
        passwordFeedback.innerText = `${passwordQuality} password, improve it please!`
        passwordFeedback.classList.value = incorrectClass
    }

    comparePasswords()

}

function evaluateButton() {
    let feedbacks: Array<String> = []
    const emailClasses1: HTMLElement | null = document.getElementById("email-feedback")
    const emailClasses2: HTMLElement | null = document.getElementById("email-feedback2")
    const nameClasses: HTMLElement | null = document.getElementById("name-feedback")
    const passClasses1: HTMLElement | null = document.getElementById("password-feedback1")
    const passClasses2: HTMLElement | null = document.getElementById("password-feedback2")

    if (emailClasses1 != null && emailClasses2 != null && nameClasses != null && passClasses1 != null && passClasses2 != null) {
        feedbacks.push(
            String(emailClasses1.classList),
            String(emailClasses2.classList),
            String(nameClasses.classList),
            String(passClasses1.classList),
            String(passClasses2.classList),
        )

    }

    const incorrectFields = feedbacks.filter(checkIfIncorrect)
    const signUpButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("signup-button")
    if (incorrectFields.length === 0) {
        if (signUpButton != null) {

            signUpButton.disabled = false
            signUpButton.classList.remove('cursor-not-allowed')
        }

    } else {
        signUpButton.disabled = true
        signUpButton.classList.add('cursor-not-allowed')
    }
}

/*
* Helper functions
*
*/

// returns true if incorrect matches  / : string
function checkIfIncorrect(textValue: any) {
    return /^text-incorrect$/.test(textValue)
}


function checkPasswordQuality(pass: string) {

    const score = scorePassword(pass);

    if (score > 80)
        return "Secure"
    else if (score > 60)
        return "Good"
    else if (score >= 30)
        return "Weak"
    else
        return "Tragic"
}


/*
* Used
* https://stackoverflow.com/questions/948172/password-strength-meter#comment120524342_11268104
* */
function scorePassword(pass: string) {
    let score = 0;

    // variation range
    score += new Set(pass.split("")).size;

    // shuffle score - bonus for messing things up. 0 score for playing with upper/lowercase.
    const charCodes = pass.split('').map(x => x.toLowerCase().charCodeAt(0));
    for (let i = 1; i < charCodes.length; i++) {
        const dist = Math.abs(charCodes[i - 1] - charCodes[i]);
        if (dist > 60)
            score += 15;
        else if (dist > 1)
            score += 5;
    }

    // bonus for length
    score += (pass.length - 6) * 3;

    return parseInt(String(score));
}