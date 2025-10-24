console.log("Validation.js loaded");

// ตัวอย่างฟังก์ชัน validate ฟอร์ม (แต่ละคนจะเขียนต่อเองได้)
function showError(input, message) {
  const errorSpan = input.parentElement.querySelector(".error-message");
  if (errorSpan) errorSpan.textContent = message;
  input.classList.add("is-invalid");
}

function clearError(input) {
  const errorSpan = input.parentElement.querySelector(".error-message");
  if (errorSpan) errorSpan.textContent = "";
  input.classList.remove("is-invalid");
}
