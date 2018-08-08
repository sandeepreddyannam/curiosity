interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}







// interface SquareConfig {
//     color?: string;
//     width?: number;
//     [propName: string]: any;
// }

// function createSquare(config: SquareConfig): {color: string; area: number} {
//     let newSquare = {color: "white", area: 100};
//     if (config.color) {
//         newSquare.color = config.color;
//     }
//     if (config.width) {
//         newSquare.area = config.width * config.width;
//     }
//     return newSquare;
// }

// let mySquare = createSquare({colour: "black"});






// class Student {
//     fullName: string;
//     constructor(public firstName: string, public middleInitial: string, public lastName: string) {
//         this.fullName = firstName + " " + middleInitial + " " + lastName;
//     }
// }

// interface Person {
//     firstName: string;
//     lastName: string;
// }

// function greeter(person : Person) {
//     let someValue: any = "this is a string";
//     let strLength: number = someValue.length;
//     let o: any = {a:'hi', b: 1};
//     let { a, b } : {a: string, b: string} = o;

//     return "Hello, " + person.firstName + " " + person.lastName;
// }

// //let user = new Student("Jane", "M.", "User");
// let user = {firstName: 'jane', lastName: 'hi'};

// document.body.innerHTML = greeter(user);

// interface LabelledValue {
//     label: string;
// }

// function printLabel(labelledObj: LabelledValue) {
//     console.log(labelledObj.label);
// }

// let myObj = {size: 10, label: "Size 10 Object"};
// printLabel(myObj);