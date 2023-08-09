import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '/imports/api/TasksCollection';

const SEED_USERNAME = 'admin';
const SEED_PASSWORD = '123';

const insertTask = (taskText, user) =>
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });

  Meteor.startup(() => {
    if (!Accounts.findUserByUsername(SEED_USERNAME)) {
      Accounts.createUser({
        username: SEED_USERNAME,
        password: SEED_PASSWORD,
      });
    }
  
    const user = Accounts.findUserByUsername(SEED_USERNAME) ;

    if (TasksCollection.find().count() === 0) {
      [
        'First Task',
        'Second Task',
        'Third Task',

      ].forEach(taskText => insertTask(taskText, user));
    }
  });