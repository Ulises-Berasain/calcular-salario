function pruebaValidarSalario(){
    console.assert(validarSalario("asfafasfas")=== "El campo solo puede tener numeros", "La validacion no valido que el campo solo tenga numeros");

    console.assert(validarSalario("123")=== "", "No se valido correctamente con un numero");
}

pruebaValidarSalario();
