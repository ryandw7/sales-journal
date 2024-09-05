//MOCK USER DATA - userdata.rows.push(<user object to add>)
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

/*
MOCK INTERACTION DATA

create new table for user - interactions[<id>] = []

insert new interaction for user - interactions[<id>].push

 */
const interactions = {1: [{pn: 9893299054, fn: 'cody', dt: 'today', in: 'Cx be doing the cx thang', id: 1}, {pn: 9893099004, fn: 'deez', dt: 'today', in: 'Cx be doing the cx thang', id: 2}]}

//For files that require db, import db from db/dbDeterminer.js and destructure functions as variables

const db = {
//Utility functions for managing users

    users: {
        //help! I've fallen and I don't know when a function requires async
        findByUsernameMock: (username) => {
            console.log('mock find started')
            const user = userData.rows.filter(item => item.un == username)
            //returns: {id: <ID>, fn: <FIRST_NAME>, ln: <LAST_NAME>, un: <USERNAME>, pw: <PASSWORD>}
            try {
                console.log(user[0])
                if (user.length > 0) {
                    return {ok: true, data: user[0]};
                    //returns: {ok: true, data: {id: <ID>, fn: <FIRST_NAME>, ln: <LAST_NAME>, un: <USERNAME>, pw: <PASSWORD>}}
                }
                throw new Error('No user with that userName');
            } catch (err) {
                return {ok: false, err}
            }
        },

        registerUserMock: async (firstName, lastName, username, password) => {
            //for registerUser to run their NEEDS to be at least one user 
            try {
                console.log('register try block initiated...')
                const unQuery = userData.rows.filter(item => item.un === username)
                if (unQuery.length > 0) {
                    throw new Error('That userName is already taken.')
                }



                const id = userData.rows.length + 1;
                userData.rows.push({id: id, fn: firstName, ln: lastName, un: username, pw: password})
                interactions[id] = [];
                return { ok: true }
            } catch (error) {
                return { ok: false, error: error.message }
            };



        },
        //Currently no bcrpyt in password compare for mocks
        comparePasswordsMock: (storedPassword, enteredPassword) => {
         if(storedPassword === enteredPassword){
            return true
         }else{
            return false
         }
        },
        
        getInteractionsMock: (id) => {
         const userInteractions = interactions[id];
         return userInteractions.rows;
        },
        
        addNewInteractionMock: (id, firstName, lastName, phoneNumber, interaction) => {
            let intId = interactions[id].length + 1;
            const interactionObj = {        
               id: intId,
               firstName,
               lastName,
               phoneNumber,
               interaction
            }
            interactions[id].push(interactionObj)
            return {ok: true, data: interactionObj}
        }
    }
};
module.exports = {
    findByUsernameMock: db.users.findByUsernameMock,
    registerUserMock: db.users.registerUserMock,
    comparePasswordsMock: db.users.comparePasswordsMock,
    getInteractionsMock: db.users.getInteractionsMock,
    addNewInteractionMock: db.users.addNewInteractionMock
};