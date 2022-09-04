import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '../imports/api/TasksCollection';
import { Accounts } from 'meteor/accounts-base';
import { ServiceConfiguration } from 'meteor/service-configuration';
const insertTask = (taskText, user) =>
    TasksCollection.insert({
        txt: taskText,
        userId: user._id,
        createdAt: new Date(),
    });
const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
    if (!Accounts.findUserByUsername(SEED_USERNAME)) {
        Accounts.createUser({
            username: SEED_USERNAME,
            password: SEED_PASSWORD,
        });
    }
    TasksCollection.find().forEach((element, index) => {
        console.log(element)
        console.log(TasksCollection.remove(element))
    })
    const user = Accounts.findUserByUsername(SEED_USERNAME);
    console.log(user)
    if (TasksCollection.find().count() === 0) {
        [
            'First Task',
            'Second Task',
            'Third Task',
            'Fourth Task',
            'Fifth Task',
            'Sixth Task',
            'Seventh Task'
        ].forEach(taskText => insertTask(taskText, user));
    }

    ServiceConfiguration.configurations.upsert({ service: 'github' }, {
        $set: {
            loginStyle: 'popup',
            clientId: 'd849468976a7dcf325d6', // insert your clientId here
            secret: '068b86ba36b9e627e5ed905d8b338e662b4f9168', // insert your secret here
        },
    });

});