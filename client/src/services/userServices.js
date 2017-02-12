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

export default {
    getUsers() {
        return Promise.resolve(users);
    },
};
