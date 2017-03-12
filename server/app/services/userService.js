const User = require('../models/User');

const userService = () => {
    const getUsers = () => {
        // @TODO: add the possibility to sort and limit the results
        return User.find({}).exec();
    };

    const getNextBirthDays = () => {
        // @TODO: add the possibility to limit the results
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        return User.find({
                nextBirthDay: { $gte: currentDate },
            })
            .sort({ nextBirthDay: 1 })
            .exec();
    };

    const getShamedUsers = () => {
        // @TODO: add the possibility to sort and limit the results
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        currentDate.setHours(0, 0, 0, 0);


        return User.find({
            $and: [
                { nextBirthDay: { $lt: currentDate } },
                {
                    previousYears: {
                        $not: {
                            $elemMatch: { year: currentYear }
                        }
                    },
                },
            ]
        }).exec();
    };

    const getBirthDayList = () => {
        // @TODO: add the possibility to limit the results
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        currentDate.setHours(0, 0, 0, 0);

        return User.find({
                $or: [
                    { nextBirthDay: { $gte: currentDate } },
                    {
                        $and: [
                            { nextBirthDay: { $lt: currentDate } },
                            {
                                previousYears: {
                                    $not: {
                                        $elemMatch: { year: currentYear }
                                    }
                                },
                            },
                        ]
                    }
                ]
            })
            .sort({ nextBirthDay: 1 })
            .exec();
    };

    return {
        getUsers,
        getNextBirthDays,
        getShamedUsers,
        getBirthDayList,
    };
};

module.exports = userService();