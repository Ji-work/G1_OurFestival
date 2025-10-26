document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("feedbackForm");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const rating = document.querySelector('input[name="rating"]:checked');
    const comment = document.getElementById("comment").value.trim();
    const returnChoice = document.getElementById("return").value;
    const publicOK = document.getElementById("public").checked ? "ยินยอม" : "ไม่ยินยอม";

    if (!rating) {
      alert("กรุณาให้คะแนนความพึงพอใจก่อนส่ง");
      return;
    }
    if (comment === "") {
      alert("กรุณาเขียนความคิดเห็นเพิ่มเติม");
      return;
    }
    if (returnChoice === "") {
      alert("กรุณาเลือกคำตอบว่าคุณอยากกลับมาร่วมงานอีกไหม");
      return;
    }

    // ดึงข้อมูลเก่าจาก localStorage (ถ้ามี)
    const oldData = JSON.parse(localStorage.getItem("feedbackDataAll")) || [];

    // เพิ่มข้อมูลใหม่
    oldData.push({
      rating: rating.value,
      comment: comment,
      returning: returnChoice,
      publicOK: publicOK,
      date: new Date().toLocaleString("th-TH")
    });

    // บันทึกกลับลง localStorage
    localStorage.setItem("feedbackDataAll", JSON.stringify(oldData));

    // ไปหน้า summary
    window.location.href = "feedback_summary.html";
  });
});
