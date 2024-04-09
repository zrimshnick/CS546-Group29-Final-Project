function checkString(param, name){
    if (param === undefined || typeof param !== 'string'){
        throw `${name} cannot be undefined and must be a string`;
    }

    if (param.trim() === ''){
        throw `${name} cannot be an empty string`;
    }

    return param;
}

function checkArray(param, name){
    if (param === undefined || !Array.isArray(param)){
        throw `${name} cannot be undefined and must be a string`;
    }

    return param;
}

function checkValidEmail(email, name){
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)){
        throw `${name} cannot be a valid email.`;
    }

    return email;
}

function checkValidPassword(password, name){
    if (password.length <= 7){
        throw `${name} must be at leas eight characters long.`;
    }

    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    if (!uppercaseRegex.test(password)){
        throw `${name} must contain at least one capital letter.`;
    }

    if (!digitRegex.test(password)){
        throw `${name} must contain at least one digit.`;
    }

    if (!specialCharRegex.test(password)){
        throw `${name} must contain at least one special character.`;
    }

    return password;
}

function checkGender(gender, name){
    if (gender !== 'm' && gender !== 'f' && gender !== 'o'){
        throw `${name} must be either male (m), female (f) or other (o).`
    }

    return gender;
}


export { checkString, checkArray, checkValidEmail, checkValidPassword, checkGender }