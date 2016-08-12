# firebase-alphaqueuejs
Helps you interact with your firebase data in a more uniform way.


Usage:

```js

var firebaseTaskRef = rootFirebaseRef.child("queue").child("tasks")

//instantiate a new Alpha Queue service with the names of your tasks
var animalSvc := new AlphaQueue(firebaseTaskRef, [
    "createAnimal",
    "feedAnimal",
    "petAnimal"
])

//interact with your tasks in an intuitive and easy-to-use way.
var dogPromise = animalSvc.createAnimal({
    name: "dog",
    slogan: "man's best friend"
});


var dogPromise.then(function(dog){

    var catPromise = animalSvc.createAnimal({
        name: "cat",
        slogan: "alpha queue up",
        hates: [
            dog.id
        ]
    });

    catPromise.then(function(cat){
        animalSvc.feedAnimal(cat.id)
    });
})


```