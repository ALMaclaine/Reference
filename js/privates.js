//Private Objects
//----------------
function test() {
   var tet = "Private Objects";
   var tmpFunc = {
      get tet() {
         return tet;
      }
   };
   tmpFunc.tet;
   return tmpFunc;
}

var tes = test();
console.log(tes.tet);
tes.tet = 23;
console.log(tes.tet);

//Private Classes
//-----------------
function fact() {
   var foo = "Private Classes";
   class Rectangle {
      constructor() {
         this.height = 12;
         this.width = 13;
      }

      get test() {
         return foo;
      }
   }
   return Rectangle;
}

var test = new (fact());
console.log(test.test);
test.test = 525;
console.log(test.test);