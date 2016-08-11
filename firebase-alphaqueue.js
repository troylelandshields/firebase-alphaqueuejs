function AlphaQueue(firebaseRef, tasks) {
    var q = this

    q.tasksRef = firebaseRef.child("queue").child("tasks")

    tasks.forEach(function (t) {
        q[t] = sendToQueueTask(q.tasksRef, t)
    })
}

function sendToQueueTask(tasksRef, taskName) {
    return function (data) {
        console.log("pushing to queue", data)
        resultPromise = new Promise(function (resolve, reject) {
            data._state = startStateName(taskName)
            taskRef = tasksRef.push(data)

            console.log("awaiting results")
            tasksRef.child(taskRef.key).child("_state").on('value', function (dataSnapshot) {
                if (dataSnapshot.exists()) {
                    if (dataSnapshot.val() == endStateName(taskName)) {
                        resolve(dataSnapshot.val())
                    } else if (dataSnapshot.val() == errorStateName(taskName)) {
                        reject(dataSnapshot.val())
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

module.exports = AlphaQueue