// 🧭 แสดงข้อความใน console ให้ตรวจว่าเชื่อม JS สำเร็จ
console.log("Main.js loaded successfully!");

// 🔧 ตัวอย่างโค้ดเสริม (optional)
document.addEventListener("DOMContentLoaded", () => {
  // highlight เมนูหน้าปัจจุบัน
  const links = document.querySelectorAll(".nav-link");
  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });
});
