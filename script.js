// script.js (ไฟล์นี้จะอยู่ที่เดียวกับ registration.html)

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const submitBtn = document.getElementById('submitBtn');
    
    // Form Controls (ตรวจสอบว่า ID ตรงกับ HTML)
    const fullname = document.getElementById('fullname'); // ID ถูกต้อง
    const email = document.getElementById('email');       // ต้องเพิ่ม ID นี้ใน HTML
    const phone = document.getElementById('phone');
    const participantType = document.getElementById('participantType');
    const date = document.getElementById('date');
    const occupation = document.getElementById('occupation'); // Field ใหม่
    const agreeCheck = document.getElementById('agreeCheck');
    
    // Error Elements
    const errorFullname = document.getElementById('errorFullName'); // HTML ใช้ errorFullName (ตัว F ใหญ่)
    const errorEmail = document.getElementById('errorEmail');
    const errorPhone = document.getElementById('errorPhone');
    const errorParticipantType = document.getElementById('errorParticipantType');
    const errorDate = document.getElementById('errorDate');
    const errorOccupation = document.getElementById('errorOccupation'); // Field ใหม่
    const errorAgree = document.getElementById('errorAgree');
    
    /**
     * b.i. ตรวจสอบข้อมูลนำเข้า (Input Data Validation)
     */
    
    function displayError(inputElement, errorElement, isValid, message = '') {
        if (isValid) {
            inputElement.classList.remove('is-invalid');
            if (errorElement) errorElement.style.display = 'none'; // เพิ่มการตรวจสอบ errorElement
        } else {
            inputElement.classList.add('is-invalid');
            if (errorElement) {
                errorElement.textContent = message || errorElement.textContent;
                errorElement.style.display = 'block';
            }
        }
    }

    function validateFullname() {
        const value = fullname.value.trim();
        const isValid = value.length >= 5;
        displayError(fullname, errorFullname, isValid, "กรุณากรอกชื่อ-นามสกุลอย่างน้อย 5 ตัวอักษร");
        return isValid;
    }

    function validateEmail() {
        const value = email.value.trim();
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const isValid = regex.test(value);
        displayError(email, errorEmail, isValid);
        return isValid;
    }

    function validatePhone() {
        const value = phone.value.trim();
        const regex = /^\d{9,10}$/; 
        const isValid = regex.test(value);
        displayError(phone, errorPhone, isValid);
        return isValid;
    }

    function validateParticipantType() {
        const isValid = participantType.value !== "";
        displayError(participantType, errorParticipantType, isValid);
        return isValid;
    }
    
    function validateOccupation() {
        const isValid = occupation.value !== "";
        displayError(occupation, errorOccupation, isValid, "กรุณาเลือกอาชีพ");
        return isValid;
    }

    function validateDate() {
        const value = date.value.trim();
        const currentDate = new Date().toISOString().split('T')[0];
        const isValid = value !== "" && value >= currentDate;
        displayError(date, errorDate, isValid, isValid ? '' : 'กรุณาเลือกวันที่ปัจจุบันหรืออนาคต');
        return isValid;
    }

    function validateAgreement() {
        const isValid = agreeCheck.checked;
        if (!isValid) {
            errorAgree.style.display = 'block';
        } else {
            errorAgree.style.display = 'none';
        }
        return isValid;
    }

    function runAllValidation() {
        const results = [
            validateFullname(),
            validateEmail(),
            validatePhone(),
            validateParticipantType(),
            validateOccupation(), // เพิ่มการตรวจสอบอาชีพ
            validateDate(),
            validateAgreement()
        ];
        return results.every(res => res === true); 
    }

    // -------------------------------------------------------------
    
    /**
     * b. Event Handling และ C. Submit Logic
     */

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        if (runAllValidation()) {
            const interests = Array.from(document.querySelectorAll('input[name="interests"]:checked'))
                .map(cb => cb.value);

            const formData = {
                fullname: fullname.value.trim(),
                email: email.value.trim(),
                phone: phone.value.trim(),
                participantType: participantType.value,
                occupation: occupation.value,
                date: date.value,
                interests: interests.join(', '),
                timestamp: new Date().toLocaleString('th-TH')
            };

            // c. จัดเก็บข้อมูลและเปลี่ยนหน้าเพื่อแสดงสรุป
            saveRegistration(formData);
            
            // นำไปยังหน้าสรุป (summary.html)
            window.location.href = 'summary.html';
        } else {
            alert('กรุณาตรวจสอบข้อมูลที่ยังไม่สมบูรณ์และข้อความ Error สีแดง');
        }
    });
    
    // Event: Blur/Change สำหรับการตรวจสอบข้อมูลทันที
    fullname.addEventListener('blur', validateFullname);
    email.addEventListener('blur', validateEmail);
    phone.addEventListener('blur', validatePhone);
    date.addEventListener('blur', validateDate);
    participantType.addEventListener('change', validateParticipantType);
    occupation.addEventListener('change', validateOccupation); // Event สำหรับ Field อาชีพ
    agreeCheck.addEventListener('change', validateAgreement);
    
    /**
     * b.ii. สร้างลูกเล่น
     */

    // ลูกเล่น: ปุ่ม Submit มีแสงเรืองรอง (Glow effect) เมื่อ Mouse เข้า/ออก
    submitBtn.addEventListener('mouseenter', () => {
        submitBtn.classList.add('btn-submit-glow');
    });

    submitBtn.addEventListener('mouseleave', () => {
        submitBtn.classList.remove('btn-submit-glow');
    });

    // ลูกเล่น: เปลี่ยนสีพื้นหลังของช่องกรอกเมื่อได้รับ Focus
    const formControls = document.querySelectorAll('.form-control, .form-select');
    formControls.forEach(control => {
        control.addEventListener('focus', () => {
            control.style.backgroundColor = '#f8f9fa';
            control.style.transition = 'background-color 0.3s';
        });
        control.addEventListener('blur', () => {
            control.style.backgroundColor = '#ffffff'; 
        });
    });

    // c. ฟังก์ชันสำหรับจัดเก็บข้อมูลผู้เข้าเยี่ยมชมทั้งหมด
    function saveRegistration(data) {
        const existingData = localStorage.getItem('fairVisitors');
        let visitors = existingData ? JSON.parse(existingData) : [];
        visitors.push(data);
        localStorage.setItem('fairVisitors', JSON.stringify(visitors));
    }
});