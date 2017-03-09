const User = require('../app/models/User');

const users = [
    {
        email: 'test@test.com',
        password: 'test',
        role: 'admin',
        firstName: 'Guillaume',
        lastName: 'Kinif',
        birthDate: new Date('1985-08-02'),
        nextBirthDay: new Date('2017-08-02'),
        profilePic: 'http://lorempixel.com/200/200/',
        previousYears: [
            {
                year: 2016,
                cakeDate: new Date('2016-08-02'),
            },
        ],
        votes: [],
    },
    {
        email: 'dummy@test.com',
        password: 'test',
        firstName: 'Dummy',
        lastName: 'User',
        birthDate: new Date('1990-05-15'),
        nextBirthDay: new Date('2017-05-15'),
        profilePic: 'http://lorempixel.com/200/200/',
        previousYears: [
            {
                year: 2016,
                cakeDate: new Date('2016-08-02'),
            },
        ],
        votes: [],
    },
    {
        email: 'damned@test.com',
        password: 'test',
        firstName: 'Damned',
        lastName: 'Boy',
        birthDate: new Date('1995-01-15'),
        nextBirthDay: new Date('2017-01-15'),
        profilePic: 'http://lorempixel.com/200/200/',
        previousYears: [
            {
                year: 2016,
                cakeDate: new Date('2016-08-02'),
            },
        ],
        votes: [],
    }
];

module.exports = usersFixtures = {
    addSamplesToDB() {
        console.log('Add users to DB');
        for (const user of users) {
            // create a sample user
            const userInstance = new User(user);

            // save the sample user
            userInstance.save(function(err) {
                if (err) throw err;
                console.log(
                    `User saved successfully: ${userInstance.firstName} ${userInstance.lastName}`
                );
            });
        }
    }
};
