// Validações do formulário de clientes
export const fieldValidation = (field, msgErr, errorsType, msgField) => {
  let msg = "";

  if (field && field.validity) {
    field.setCustomValidity("");

    errorsType.forEach((error) => {
      if (field.validity[error]) {
        msg = msgErr[field.name][error];
      }
    });

    const errorMsgField = field.parentNode.querySelector(msgField);
    const verifyInput = field.checkValidity();

    if (!verifyInput) {
      errorMsgField.textContent = msg;
      field.style.border = "2px solid #e70a0a";
    } else {
      errorMsgField.textContent = "";
      field.style.border = "2px solid var(--color-4)";
    }
  } else {
    console.error("Field or field.validity is undefined");
  }
};

// mensagem de envio de formulário bem sucedido
export const showMessage = (form, textMessage, classMsg) => {
  const msg = document.querySelector("[data-msg]");
  msg.classList.add(classMsg);
  msg.innerText = textMessage;
  msg.scrollIntoView({ behavior: "smooth" });

  setTimeout(() => {
    msg.classList.remove(classMsg);
    form.reset();
  }, 3000);
};
