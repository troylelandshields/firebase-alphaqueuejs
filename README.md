# firebase-alphaqueuejs
Helps you interact with your firebase data in a more uniform way.


Usage:

```js

//instantiate a new Alpha Queue service with the names of your tasks
animalSvc := new AlphaQueue([
    "createAnimal",
    "feedAnimal",
    "petAnimal"
])

//interact with your tasks in an intuitive and easy-to-use way.
dogPromise = animalSvc.createAnimal({
    name: "dog",
    slogan: "man's best friend"
});


dogPromise.then(function(dog){

    catPromise = animalSvc.createAnimal({
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