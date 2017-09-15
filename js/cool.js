// Faster float conversion
// "0.333" - 0 instead of parseFloat(0.333)
// 22 times faster to use first method

var times = [];
var reps = 100000000;

var t0 = performance.now();
for(var i = 0; i < reps; i++) {
   "0.3333" - 0;
}
var t1 = performance.now();

console.log((t1 - t0) / reps);




t0 = performance.now();
for(var i = 0; i < reps; i++) {
   parseFloat("0.333");
}
t1 = performance.now();


console.log((t1 - t0) / reps);




// This can be faster
function perf(val) {
   return val - 0;
}

t0 = performance.now();
for(var i = 0; i < reps; i++) {
   perf("0.333");
}
t1 = performance.now();
console.log((t1 - t0) / reps);