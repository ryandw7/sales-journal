
const bcrypt = require("bcrypt");

const userData = {
    rows: [{
        id: 1,
        fn: 'Ryan',
        ln: 'Wilson',
        un: 'Ryandw7',
        pw: 'Password!'
    }, {
        id: 2,
        fn: 'Tony',
        ln: 'Deez',
        un: 'deez',
        pw: 'Password!'
    }]
}
const db = {

    users: {
        findByUsernameMock: async (userName, callback) => {
            const user = userData.rows.filter(item => item.un == userName)

            try {

                if (user.length > 0) {
                    return callback(null, data);
                }
                throw new Error('No user with that userName');
            } catch (err) {
                return callback(err, null)
            }
        },
        registerUserMock: async (firstName, lastName, userName, password) => {
            //for registerUser to run their NEEDS to be at least one user 
            try {
                console.log('register try block initiated...')
                const unQuery = userData.rows.filter(item => item.un === userName)
                if (unQuery.length > 0) {
                    throw new Error('That userName is already taken.')
                }



                const id = userData.rows.length + 1;
                userData.rows.push({id: id, fn: firstName, ln: lastName, un: userName, pw: password})
                return { ok: true }
            } catch (error) {
                return { ok: false, error: error.message }
            };



        },
        loginUserMock: async (userName, password) => {
            const unSearch = userData.rows.filter(item => item.un === userName)
            if (unSearch.length < 1) {
                throw new Error('userName or password is incorrect.');
            } else if (unSearch.rows.length > 0) {
                let user = unSearch.rows[0];
                if (user.pw != password) {
                    console.log(user, password)
                    throw new Error('userName or password is incorrect.')
                } else if (user.pw === password) {
                    console.log(user.id)
                    return user;
                }
            }
        }

    }
};
module.exports = {
    findByUsernameMock: db.users.findByUsernameMock,
    registerUserMock: db.users.registerUserMock
};