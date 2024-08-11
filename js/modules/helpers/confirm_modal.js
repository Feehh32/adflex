export default function confirmModal(message) {
  return new Promise((resolve) => {
    const template = document.querySelector(".confirm_modal");
    const modalContent = document.importNode(template.content, true);
    const confirmBtn = modalContent.querySelector("[data-confirmOs]");
    const cancelBtn = modalContent.querySelector("[data-cancelOs]");
    const modalWrapper = modalContent.querySelector(".confirm_modal--wrapper");

    modalContent.querySelector("[data-modalMsg]").textContent = message;

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
