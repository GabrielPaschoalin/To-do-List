import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '/imports/db/TasksCollection';
import { ServiceConfiguration } from 'meteor/service-configuration';
import '/imports/api/tasksMethods';


const SEED_USERNAME = 'admin';
const SEED_PASSWORD = '123';

const insertTask = (taskText, user) =>
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) { //Verifica se admin já existe
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);


  ServiceConfiguration.configurations.upsert(
    { service: 'github' },
    {
      $set: {
        loginStyle: 'popup',
        clientId: '51ce8cee7c9f51db605f',
        secret: 'b7dded66009560bdf03337ca3f4eae4e3011968b'
      },
    }
  );

  if (TasksCollection.find().count() === 0) {
    [].forEach(taskText => insertTask(taskText, user));
  }
});