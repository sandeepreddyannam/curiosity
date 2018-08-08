// interface SquareConfig {
//     color?: string;
//     width?: number;
//     [propName: string]: any;
// }
function printLabel(labelledObj) {
    console.log(labelledObj.size);
}
var myObj = { size: 10 };
printLabel(myObj);
