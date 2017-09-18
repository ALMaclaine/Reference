// The abhorent recursive definition
function fibRec(x) {
   if(x === 0) return 0;
   if(x === 1) return 1;
   return fibRec(x-1) + fibRec(x-2);
}

// for loop version
function fibFor(num) {
   let n   = 0;
   let n1  = 1;
   let tmp = 0;
   for(let i = 0; i <= num; i++) {
      tmp = n;
      n   = n1;
      n1  = n1 + tmp;
   }
   return tmp;
}

// while loop version
function fibWhile(num) {
   let n   = 0;
   let n1  = 1;
   let tmp = 0;
   while(num >= 0) {
      tmp = n;
      n   = n1;
      n1  = n1 + tmp;
      num--;
   }
   return tmp;
}

// Fibonacci using generators
function* fib() {
   n  = 0;
   n1 = 1;
   while(true) {
      let tmp = n;
      n = n1;
      n1 = n1 + tmp;
      yield tmp;
    }
}

let fibGen = fib();
for(let i = 0; i < 20; i++) {
   console.log(fibGen.next().value);
}

// Simple memoer, everything inside one function, since
// objects are passed by reference, memo is shared between all
// recursive calls
function fibMemo(num, memo) {
   memo = memo || {};

   if(memo[num]) return memo[num];
   if(num <= 1) return 1;

   return memo[num] = fibMemo(num - 1, memo) + fibMemo(num - 2, memo);
}

// Basic memo version, sucks because it doesn't store intermediate values
// that is, calling fib(11) will not memoize fib(10), fib(9)... even though they
// must be calculated
let memoizerMaker = function() {
   this.memoStore = {};
}

memoizerMaker.prototype.apply = function(target, thisValue, args) {
   let argsKey = args.toString();
   if(this.memoStore[argsKey] !== undefined) {
      console.log(2);
      return this.memoStore[argsKey];
   } else {
      let value = target.apply(thisValue, args);
      this.memoStore[argsKey] = value;
      return value;
   }
}

let fibMemo = new Proxy(fibRec, new memoizerMaker());

// Fib formula
// Loses accuracy at 75 because of rounding
function fibFormula(n) {
   const Phi = (1 + Math.sqrt(5));
   const phi = (1 - Math.sqrt(5));
   return Math.round((Math.pow(Phi, n) - Math.pow(phi, n)) / (Math.pow(2, n) * Math.sqrt(5)));
}

let i = 0;
while(fibFor(i) === fibFormula(i)) i++

