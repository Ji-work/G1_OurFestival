<?php
echo "<h2>ผลการลงทะเบียนจาก Server</h2>";

if (!empty($_REQUEST)) {
    echo "<ul>";
    foreach ($_REQUEST as $key => $value) {
        // ถ้า interests เป็น array (จาก checkbox) ให้ join เป็น string
        if (is_array($value)) {
            $value = implode(", ", $value);
        }
        echo "<li><b>" . htmlspecialchars($key) . ":</b> "
             . htmlspecialchars($value) . "</li>";
    }
    echo "</ul>";
} else {
    echo "<p>ไม่มีข้อมูลที่ส่งมา</p>";
}
?>

<p><a href="Registration.html">← กลับไปหน้าลงทะเบียน</a></p>
<p><a href="Registration_summary.html">ดูสรุปข้อมูลจาก localStorage</a></p>
