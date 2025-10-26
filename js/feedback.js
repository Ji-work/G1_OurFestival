document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("feedbackForm");

  form.addEventListener("submit", function(event) {
    const rating = document.querySelector('input[name="rating"]:checked');
    const comment = document.getElementById("comment").value.trim();
    const returnChoice = document.getElementById("return").value;

    if (!rating) {
      alert("กรุณาให้คะแนนความพึงพอใจก่อนส่ง");
      event.preventDefault();
    } 
    else if (comment === "") {
      alert("กรุณาเขียนความคิดเห็นเพิ่มเติม");
      event.preventDefault();
    } 
    else if (returnChoice === "") {
      alert("กรุณาเลือกคำตอบว่าคุณอยากกลับมาร่วมงานอีกไหม");
      event.preventDefault();
    } 
    else {
      alert("ขอบคุณสำหรับความคิดเห็นของคุณ 💖");
    }
  });
});
