// object constructor function
function Dog(name, age, color){
    this.name = name;
    this.age = age;
    this.color = color;
}

class Cat {
    constructor(name, age){
        this.name = name;
        this.age = age;

        roar(){
            console.log("I'm roarrrrrring!");
        }
    }


}

function test1 (){
    // ways to create objects on javascript

    // 1 -object literal
    let lola = {
        name: "lola",
        age: "2",
    };
    console.log(lola);
    
    // 2 - object constructor
    let fido = new Dog("Riley", "11", "black");
    let another = new Dog("Loki", "5", "grey");
    console.log(fido, another);

    //3 - class
    let a = new Cat("Ruca", "4" );
    console.log(a);

    

}




test1 ();