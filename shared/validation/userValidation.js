function userValidation() {
    return {
        isEmailValid(email) {
            const re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
            return re.test(email);
        },
        isPasswordValid(password) {
            return typeof password === 'string' && password.length > 3;
        },
        isRoleValid(role) {
            return ['user', 'moderator', 'admin'].indexOf(role) > -1;
        },
        isFirstNameValid(firstName) {
            return typeof firstName === 'string' && firstName.length > 1;
        },
        isLastNameValid(lastName) {
            return typeof lastName === 'string' && lastName.length > 1;
        },
        isBirthDateValid(birthDate) {
            return isFinite(new Date(birthDate).getTime());
        },
        isProfilePicNameValid() {
            // @TODO: validate image extension from image name
            return true;
        },
        isProfilePicValid() {
            // @TODO: validate incoming image server side
            return true;
        },
    };
}

export default userValidation();