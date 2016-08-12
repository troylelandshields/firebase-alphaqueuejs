# firebase-alphaqueuejs
Helps you interact with your firebase data in a more uniform way.

## Install it:

`npm install --save firebase-alphaqueuejs`

or

`bower install --save firebase-alphaqueuejs`

## Include it:

### Node
```js
var AlphaQueue = require('firebase-alphaqueuejs')
```

### Browser
```js
<script src="path/to/firebase-alphaqueue.js"></script>
```


## Use it:
```js
//Get a ref to the task child of your firebsae database
var firebaseTaskRef = rootFirebaseRef.child("queue").child("tasks")

//instantiate a new Alpha Queue service with the names of your tasks
//AlphaQueue assumes your specs define states in the following way:
//      starting state = taskName_start
//      error state = taskName_error
//      finished state = taskName_finished
var animalSvc := new AlphaQueue(firebaseTaskRef, [
    "createAnimal",
    "feedAnimal",
    "petAnimal"
]);

//Push data to the queue and get a promise back
var dogPromise = animalSvc.createAnimal({
    name: "dog",
    slogan: "man's best friend"
});

//The promise is resolved when the task is finished (or rejected on error)
var dogPromise.then(function(dog){

    var catPromise = animalSvc.createAnimal({
        name: "cat",
        slogan: "alpha queue up",
        hates: {
            dog.id: true
        }
    });

    catPromise.then(function(cat){
        animalSvc.feedAnimal(cat.id)
    });
});

```
