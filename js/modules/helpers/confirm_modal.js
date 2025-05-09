export default function confirmModal(message, formContent = null) {
  return new Promise((resolve) => {
    const template = document.querySelector(".confirm_modal");
    const modalContent = document.importNode(template.content, true);
    const confirmBtn = modalContent.querySelector("[data-confirmOs]");
    const cancelBtn = modalContent.querySelector("[data-cancelOs]");
    const modalWrapper = modalContent.querySelector(".confirm_modal--wrapper");

    modalContent.querySelector("[data-modalMsg]").textContent = message;

    if (formContent) {
      const formWrapper = modalContent.querySelector("[data-modalForm]");
      if (formWrapper) {
        formWrapper.innerHTML = ""; // Limpa conteúdo anterior, se houver
        formWrapper.appendChild(formContent);
      }
    }

    document.body.appendChild(modalWrapper);

    const removeModal = () => {
      if (document.body.contains(modalWrapper)) {
        document.body.removeChild(modalWrapper);
      }
    };

    confirmBtn.addEventListener("click", () => {
      removeModal();
      resolve(true);
    });

    cancelBtn.addEventListener("click", () => {
      removeModal();
      resolve(false);
    });
  });
}
