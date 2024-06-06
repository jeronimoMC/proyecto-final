const formRegister = document.querySelector(".form-register");
const inputUser = document.querySelector('.form-register input[type="text"]');
const inputPass = document.querySelector('.form-register input[type="password"]');
const inputEmail = document.querySelector('.form-register input[type="email"]');
const alertaError = document.querySelector(".form-register .alerta-error");
const alertaExito = document.querySelector(".form-register .alerta-exito");

/*Expresiones regulares patrones que nos permite validar algo 
si un campo no es evaluado como true en la expresion regular nos tira un false*/

const userNameRegex = /^[a-zA-Z0-9\_\-]{4,16}$/;
export const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
export const passwordRegex = /^.{8,24}$/;

export const estadoValidacionCampos = {
    userName: false,
    userEmail: false,
    userPassword: false,
  };

  document.addEventListener("DOMContentLoaded", () => {
    formRegister.addEventListener("submit", (e) => {
      e.preventDefault();
      enviarFormulario(formRegister,alertaError,alertaExito);
    });
  
    inputUser.addEventListener("input", () => {
      validarCampo(userNameRegex,inputUser,"El usuario tiene que ser de 4 a 16 dígitos y solo puede contener, letras y guión bajo.");
    });
  
    inputEmail.addEventListener("input", () => {
      validarCampo(emailRegex,inputEmail,"El correo solo puede contener letras, números, puntos, guiones y guíon bajo.");
    });
  
    inputPass.addEventListener("input", () => {
      validarCampo(passwordRegex,inputPass,"La contraseña tiene que ser de 8 a 24 dígitos");
    });
  });
  
//valida los campos para comparar si es true o false loa informacion dentro de nuestros parametros
export function validarCampo(regularExpresion, campo, mensaje) {
    const validarCampo= regularExpresion.test(campo.value);
    if (validarCampo) {
      eliminarAlerta(campo.parentElement.parentElement);
      estadoValidacionCampos[campo.name] = true;
      campo.parentElement.classList.remove("error");
      return;
    }
    estadoValidacionCampos[campo.name] = false;
    campo.parentElement.classList.add("error");
    mostrarAlerta(campo.parentElement.parentElement,mensaje);
  }
//organizacion alertas
function mostrarAlerta(referencia,mensaje) {
    eliminarAlerta(referencia);
    const alertaDiv = document.createElement("div");
    alertaDiv.classList.add("alerta");
    alertaDiv.textContent = mensaje;
    referencia.appendChild(alertaDiv);
}
//esta funcion es para que si identifica que si ya hay alerta no agregue mas
function eliminarAlerta(referencia) {
    const alerta = referencia.querySelector(".alerta");
  
    if (alerta) alerta.remove();
  }


  export function enviarFormulario(form, alertaError,alertaExito) {
    //VALIDAMOS EL ENVIO DE NUESTRO FORMULARIO
  
    if (estadoValidacionCampos.userName && estadoValidacionCampos.userEmail && estadoValidacionCampos.userPassword) {
      //si todo es true se envia el formulario
      estadoValidacionCampos.userName = false;
      estadoValidacionCampos.userEmail = false;
      estadoValidacionCampos.userPassword = false;
  
      form.reset();
      alertaExito.classList.add("alertaExito");
      alertaError.classList.remove("alertaError");
      setTimeout(() => {
        alertaExito.classList.remove("alertaExito");
      }, 3000); 
      return;
    }
    
    alertaExito.classList.remove("alertaExito");
    alertaError.classList.add("alertaError");
    setTimeout(() => {
      alertaError.classList.remove("alertaError");
    }, 3000);
  }