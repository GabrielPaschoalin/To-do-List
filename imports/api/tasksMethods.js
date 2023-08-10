import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from '/imports/db/TasksCollection';

Meteor.methods({

    'tasks.insert'(text) {
        check(text, String); //Conferir se o texto é uma string

        if (!this.userId) { //Verifica se o usuário é autorizado
            throw new Meteor.Error('Not authorized.');
        }

        TasksCollection.insert({ //Insere uma nova task
            text,
            createdAt: new Date,
            userId: this.userId,
        })
    },

    'tasks.remove'(taskId) {
        check(taskId, String);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        TasksCollection.remove(taskId);
    },

    'tasks.setIsChecked'(taskId, isChecked) {
        check(taskId, String);
        check(isChecked, Boolean);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        TasksCollection.update(taskId, {
            $set: {
                isChecked
            }
        });
    }


});