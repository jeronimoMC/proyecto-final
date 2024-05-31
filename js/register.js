const formRegister = document.querySelector(".form-register");
const inputUser = document.querySelector(".form-register input[type='text']");
const inputEmail = document.querySelector(".form-register input[type='email']");
const inputPass = document.querySelector(".form-register input[type='password']");
const alertaError = document.querySelector(".alerta-error")
const alertaExito = document.querySelector(".alerta-exito")

/*Expresiones regulares patrones que nos permite validar algo 
si un campo no es evaluado como true en la expresion regular nos tira un false*/

const userNameRegex = /^[a-zA-Z0-9\_\-]{4,16}$/; //Acepta carecteres de a-z minusculas y mayusculas de 0 al 9 y de 4 a 16 caracteres
const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;//valida el gmail
const passwordRegex = /^.{8,24}$/;//valida la contraseña

const estadoValidarCampos = {
    userName: false,
    userEmail: false,
    userPassword: false,
}

document.addEventListener("DOMContentLoaded", () => { //es un evento que le decimos que cuando el documento haya cargado ejecute formRegister
    formRegister.addEventListener("submit", e => {
        e.preventDefault();
        enviarFormulario()
    });
    //evaluar el capo

    inputUser.addEventListener("input", () => {
        validarCampo(userNameRegex,inputUser, "El usuario tiene que ser de 4 a 16 dígitos y solo puede contener, letras y guión bajo.")
    })
    inputEmail.addEventListener("input", () => {
        validarCampo(emailRegex,inputEmail,"El correo tiene que ser valido, este solo puede contener, letras, números, puntos y guiónes")
    })
    inputPass.addEventListener("input", () => {
        validarCampo(passwordRegex,inputPass,"Contraseña invalida, esta tiene que ser de 8 a 24 digitos")
    })

})
//valida los campos para comparar si es true o false loa informacion dentro de nuestros parametros
function validarCampo(regularExpresion,campo,mensaje) {
    const validarCampo = regularExpresion.test(campo.value);
    if (validarCampo) {
        eliminarAlerta(campo.parentElement.parentElement)
        estadoValidarCampos[campo.name] = true;
        campo.parentElement.classList.remove("error");
        return;
    } 
    estadoValidarCampos[campo.name] = false;
    mostrarAlerta(campo.parentElement.parentElement,mensaje)
    campo.parentElement.classList.add("error");
    
}
//organizacion alertas
function mostrarAlerta(referencia,mensaje) {
    eliminarAlerta(referencia)
    const alertaDiv = document.createElement("div")
    alertaDiv.classList.add("alerta")
    alertaDiv.textContent = mensaje;
    referencia.appendChild(alertaDiv)
}
//esta funcion es para que si identifica que si ya hay alerta no agregue mas
function eliminarAlerta(referencia) {
    const alerta = referencia.querySelector(".alerta")
    
    if (alerta) {
        alerta.remove();
    }
}


function enviarFormulario() {
    //validamos el envio del formulario
    if (estadoValidarCampos.userName && estadoValidarCampos.userEmail && estadoValidarCampos.userPassword){
        alertaExito.classList.add("alertaExito")
        alertaError.classList.remove("alertaError")
        formRegister.reset();
        setTimeout(() => {
            alertaExito.classList.remove("alertaExito");
        }, 3000);
        return;
    } 
    alertaError.classList.add("alertaError") 
    alertaExito.classList.remove("alertaExito")
    setTimeout(() => {
        alertaError.classList.remove("alertaError");
    }, 3000);
} 