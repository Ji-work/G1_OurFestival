<?php
echo "<h2>ผลการส่งแบบฟอร์ม Feedback (จาก Server)</h2>";

if (!empty($_POST)) {
    echo "<ul>";
    foreach ($_POST as $key => $value) {
        echo "<li><b>" . htmlspecialchars($key) . ":</b> "
             . htmlspecialchars($value) . "</li>";
    }
    echo "</ul>";
} else {
    echo "<p>ไม่มีข้อมูลที่ส่งมา</p>";
}
?>

<p class="mt-4">
    <a href="Feedback.html" class="btn btn-primary">กลับไปกรอกแบบฟอร์ม</a>
    <a href="feedback_summary.html" class="btn btn-secondary ms-2">ไปหน้าสรุปความคิดเห็นทั้งหมด</a>
</p>
