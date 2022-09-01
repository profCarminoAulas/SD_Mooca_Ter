function calculoRapidinho(numero) {
    //if(numero >= 0){
    //    return Promise.resolve((numero * (numero + 1)) / 2);
    //} else {
    //    return Promise.reject("Somente valores positivos, por favor");
    //}
    //<condição> ? <verdade> : <falso>



    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log("um segundo");
        }, "5000")
        resolve(setTimeout(() => {
            console.log("um segundo");
            (numero * (numero + 1)) / 2;
        }, "5000")

        ).catch((err) => {
            reject("Somente valores positivos, por favor");
        });
    });

    return numero >= 0
        ? Promise.resolve((numero * (numero + 1)) / 2)
        : Promise.reject("Somente valores positivos, por favor");
}

calculoRapidinho(10)
    .then((resultado) => {
        console.log(resultado);
    })
    .catch((err) => {
        console.log(err);
    });

calculoRapidinho(-1)
    .then((resultado) => {
        console.log(resultado);
    })
    .catch((err) => {
        console.log(err);
    });



console.log("esperando...");