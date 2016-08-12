"use strict";

(function () {
    var root = this

    function AlphaQueue(firebaseTasksRef, tasks) {
        var q = this

        //Store reference to tasks in firebase queue
        q.tasksRef = firebaseTasksRef;

        //Create a function for pushing and receiving to each task in the queue
        tasks.forEach(function (t) {
            q[t] = sendToQueueTask(q.tasksRef, t)
        })
    }

    //TODO clean this up
    function sendToQueueTask(tasksRef, taskName) {
        return function (data) {
            //Create promise that will be resolved or rejected when the task enters a final state
            var resultPromise = new Promise(function (resolve, reject) {
                //Start the task in the starting state and push it onto the queue
                data._state = startStateName(taskName)
                var taskRef = tasksRef.push(data)

                //Watch for the state to change--when it is either error or finished then resolve or reject the promise with the appropriate data
                tasksRef.child(taskRef.key).child("_state").on('value', function (dataSnapshot) {

                    if (dataSnapshot.exists()) {
                        if (dataSnapshot.val() == endStateName(taskName)) {
                            tasksRef.child(taskRef.key).once('value', function (taskSnapshot) {
                                var taskData = taskSnapshot.val()
                                resolve(taskData);
                            });
                        } else if (dataSnapshot.val() == errorStateName(taskName)) {
                            tasksRef.child(taskRef.key).once('value', function (taskSnapshot) {
                                var taskData = taskSnapshot.val()
                                reject(taskData._error_details);
                            });
                        }

                    }
                });
            });

            return resultPromise
        }
    }

    function startStateName(taskName) {
        return taskName + "_start"
    }

    function endStateName(taskName) {
        return taskName + "_finished"
    }

    function errorStateName(taskName) {
        return taskName + "_error"
    }

    //Magic to export this for node or make it available on the window for browser
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = AlphaQueue
        }
        exports.AlphaQueue = AlphaQueue
    }
    else {
        root.AlphaQueue = AlphaQueue
    }


}).call(this);
