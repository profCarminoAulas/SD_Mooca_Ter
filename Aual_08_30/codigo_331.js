function calculoDemorado(numero) {
    return new Promise(function (resolve, reject) {
        let res = 0;
        for (let i = 1; i <= numero; i++) {
            res += i;
        }
        resolve(res);
    });
}

j = 10;
calculoDemorado(10)
    .then((resultado) => {
        j = j + resultado;
        console.log(resultado);
        console.log(j);
    })

console.log("estou na linha 14 ===> " + j);
console.log("estou na linha 14 ===> ");