/*setTimeout(function(){
    console.log( process.argv[0].toString());
}, 0);

console.log("Hello world");
console.log("Welkom ", process.argv[2]);
*/

//MIX NIET sunchroon (for lus) met asynchroon (setTImeout)
for (var i = process.argv.length - 1; i>=0; i--){
    console.log(process.argv[i]);
    setTimeout(function(){ console.log(i)}, 0);
}

//for asynchroon? =>
//process.argv.forEach(el, function() { });
