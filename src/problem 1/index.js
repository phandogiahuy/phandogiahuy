
//Using Loop
var sum_to_n_a = function(n) {
    let sum = 0
    for(let i=1;i<=n;i++){
       sum=sum+i
    }
    return sum
};
console.log(sum_to_n_a(5))


// using Recursion
/* Asummed n = 5 => 
5 + sum_to_n_b(4) 
    4 + sum_to_n_b(3)
        3 + sum_to_n_b(2) 
           2 + sum_to_n_b(1)
                  1
   5+4+3+2+1 ` */
var sum_to_n_b = function(n) {
    if(n==1) {
        return 1
    }
    return n + sum_to_n_b(n-1)
};
console.log(sum_to_n_b(5))



//Using reduce method
/* Created a arary like [1,2,..n] 
by Array.from with first Parameter is length of array 
and second parametter is arrow function give current element 
and index starting from 0
then using reduce to sum from 1 to n */
var sum_to_n_c = function(n) {
    const arrayFrom1toN = Array.from({length: n}, (_,i) => i + 1);
    const sum = arrayFrom1toN.reduce((sum, num) => sum + num, 0);
    return sum
};
console.log(sum_to_n_c(5))





    