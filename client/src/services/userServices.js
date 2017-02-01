const users = [
    {
        id: 0,
        firstName: 'Guillaume',
        lastName: 'Kinif',
        birthdate: new Date('1985-08-02'),
        email: 'test@test.com',
        profilePic: 'http://lorempixel.com/200/200/',
        previousYears: [
            {
                year: 2016,
                cakeDate: new Date('2016-08-02'),
                infos: 'King\'s cake',
            },
        ],
        votes: [
            {
                id: 0,
                dateCreation: new Date('2016-01-25'),
                dateUpdate: new Date('2016-01-25'),
                value: 1,
                author: { id: 1, firstName: 'Dummy', lastName: 'User' },
            },
        ],
    },
    {
        id: 1,
        firstName: 'Dummy',
        lastName: 'User',
        birthdate: new Date('1990-05-15'),
        email: 'test@test.com',
        profilePic: 'http://lorempixel.com/200/200/',
        previousYears: [
            {
                year: 2016,
                cakeDate: new Date('2016-08-02'),
                infos: 'King\'s cake',
            },
        ],
        votes: [
            {
                id: 0,
                dateCreation: new Date('2016-01-25'),
                dateUpdate: new Date('2016-01-25'),
                value: 1,
                author: { id: 1, firstName: 'Dummy', lastName: 'User' },
            },
        ],
    },
    {
        id: 2,
        firstName: 'Damned',
        lastName: 'Boy',
        birthdate: new Date('1995-01-15'),
        email: 'test@test.com',
        profilePic: 'http://lorempixel.com/200/200/',
        previousYears: [
            {
                year: 2016,
                cakeDate: new Date('2016-08-02'),
                infos: 'King\'s cake',
            },
        ],
        votes: [
            {
                id: 0,
                dateCreation: new Date('2016-01-25'),
                dateUpdate: new Date('2016-01-25'),
                value: 1,
                author: { id: 1, firstName: 'Dummy', lastName: 'User' },
            },
        ],
    },
];

function isUserBirthCakeOk(user) {
    const currentDate = new Date();
    const isBirthdateAlreadyPassed = user.birthdate.getMonth() < currentDate.getMonth() ||
        (
            user.birthdate.getDate() <= currentDate.getDate() &&
            user.birthdate.getMonth() <= currentDate.getMonth()
        );
    const lastBirthdayCake = Math.max(...user.previousYears.map(year => year.year));

    return !isBirthdateAlreadyPassed ||
        currentDate.getFullYear() <= Number(lastBirthdayCake);
}

export default {
    getUsers() {
        return Promise.resolve(users);
    },
    getShamedUsers() {
        const shamedUsers = users.filter(user => !isUserBirthCakeOk(user));

        return Promise.resolve(shamedUsers);
    },
    getGoodUsers() {
        const goodUsers = users.filter(user => isUserBirthCakeOk(user));

        return Promise.resolve(goodUsers);
    },
};
