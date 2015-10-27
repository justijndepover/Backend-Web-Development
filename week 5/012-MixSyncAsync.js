/*
 * 012-Mixen van sync en async zorgt voor problemen (wordt later opgelost)
 * 
 */

for (var i = process.argv.length-1; i >= 0 ; i--) {
    console.log(process.argv[i]);  //synchroon
    setTimeout(function () { console.log(i);}, 0); //asynchroon => blijft -1 !
}

setTimeout(function () { process.exit() }, 25000);