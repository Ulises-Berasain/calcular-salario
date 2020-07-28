const $form = document.querySelector("#salario");
const $totalSalarios = document.querySelector("#total-salarios");
const $salarioUsuario = document.querySelector("#salario-usuario");
const $salarioAnual = document.querySelector("#total-salario-anual");
const $salarioMensual = document.querySelector("#total-salario-mensual");
const $salarioSemanal = document.querySelector("#total-salario-semanal");
const $salarioDiario = document.querySelector("#total-salario-diario");
const $salarioPorHora = document.querySelector("#total-salario-hora");
const $salarioPorMinuto = document.querySelector("#total-salario-minuto");
const $salarioPorSegundo = document.querySelector("#total-salario-segundo");
const salarios = {
    "total-salario-anual": $salarioAnual,
    "total-salario-mensual": $salarioMensual,
    "total-salario-semanal": $salarioSemanal,
    "total-salario-diario": $salarioDiario,
    "total-salario-hora": $salarioPorHora,
    "total-salario-minuto": $salarioPorMinuto,
    "total-salario-segundo": $salarioPorSegundo,
}

document.querySelector("#boton-calcular").onclick = function(event){
    event.preventDefault();

    const errorSalario = validarSalario($salarioUsuario.value);
    const errores = {
        "salario-usuario": errorSalario,
    }

    const esExito = manejarErrores(errores)===0;

    if(esExito){
       calcularResultado();
       mostrarSalarioEnVerde();
       resetearInput()
    }
}

document.querySelector("#boton-limpiar").onclick = function(event){
    event.preventDefault();
    limpiarPagina();
    limpiarError();
    resetearInput()
}

function calcularSalarioMensual(salarioAnual){
    const mesesEnUnAnio = 12;
    const salarioMensual = salarioAnual / mesesEnUnAnio;
    return salarioMensual;
}

function calcularSalarioSemanal(salarioMensual){
    const semanasEnUnMes = 4;
    const salarioSemanal = salarioMensual / semanasEnUnMes;
    return salarioSemanal;
}

function calcularSalarioDiario(salarioSemanal){
    const diasEnUnaSemana = 7;
    const salarioDiario = salarioSemanal / diasEnUnaSemana;
    return salarioDiario;
}

function calcularSalarioPorHora(salarioDiario){
    const horasEnUnDia = 24;
    const salarioPorHora = salarioDiario/horasEnUnDia;
    return salarioPorHora;
}

function calcularSalarioPorMinuto(salarioPorHora){
    const minutosEnUnaHora = 60;
    const salarioPorMinuto = salarioPorHora/minutosEnUnaHora;
    return salarioPorMinuto;
}

function calcularSalarioPorSegundo(salarioPorMinuto){
    const segundosEnUnMinuto = 60;
    const salarioPorSegundo = salarioPorMinuto / segundosEnUnMinuto;
    return salarioPorSegundo;
}

function limpiarPagina(){
    mostrarSalarioEnRojo();
    $salarioAnual.innerText = 0;
    $salarioMensual.innerText = 0;
    $salarioSemanal.innerText = 0;
    $salarioDiario.innerText = 0;
    $salarioPorHora.innerText = 0;
    $salarioPorMinuto.innerText = 0;
    $salarioPorSegundo.innerText = 0;
}

function validarSalario(salarioUsuario){
    if(!/^[0-9]+$/.test(salarioUsuario)){
        return "El campo solo puede tener numeros";
    }
     return "";
}
function calcularResultado(){
    $salarioAnual.innerText = $salarioUsuario.value;
    $salarioMensual.innerText = calcularSalarioMensual($salarioAnual.innerText);
    $salarioSemanal.innerText = calcularSalarioSemanal($salarioMensual.innerText);
    $salarioDiario.innerText = calcularSalarioDiario($salarioSemanal.innerText);
    $salarioPorHora.innerText = calcularSalarioPorHora($salarioDiario.innerText);
    $salarioPorMinuto.innerText = calcularSalarioPorMinuto($salarioPorHora.innerText);
    $salarioPorSegundo.innerText = calcularSalarioPorSegundo($salarioPorMinuto.innerText);
}

function mostrarSalarioEnVerde(){
    const keys = Object.keys(salarios);

    keys.forEach(function(key){
        const salariosTotales = salarios[key];

        salariosTotales.classList.remove('badge-danger');
        salariosTotales.classList.add('badge-success');
    })
}

function mostrarSalarioEnRojo(){
    const keys = Object.keys(salarios);

    keys.forEach(function(key){
        const salariosTotales = salarios[key];

        salariosTotales.classList.remove('badge-success');
        salariosTotales.classList.add('badge-danger');
    })
}
function limpiarError(){
    const $error = document.querySelectorAll(".error-salario")
    for(let i = 0; i< $error.length ; i++){
        $error[i].remove();
    }
}

function manejarErrores(errores){
    const keys = Object.keys(errores);
    const $errores = document.querySelector("#errores");
    let cantidadErrores = 0;

    keys.forEach(function(key){
        const error = errores[key];
        if(error){
            cantidadErrores++;

            $form[key].className = "error";

            const $error = document.createElement("li");
            $error.className = "error-salario";
            $error.innerText = error;

            $errores.appendChild($error);
            $errores.firstChild.remove();
            
        }else{
            limpiarError();
            $form[key].className = "";
        }
    })
    return cantidadErrores
}

function resetearInput(){
    const input = document.querySelector("#salario-usuario");

    input.value = "";
}
