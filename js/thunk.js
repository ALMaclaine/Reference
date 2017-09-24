function addAsync(x, y, cb) {
   setTimeout(function() {
      cb(x + y);
   }, 1000);
}

let thunk = function(a, b, cb) {
   addAsync(a, b, cb);
}

thunk(1, 2, function(sum) {
   console.log(sum);
});