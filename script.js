const scriptURL = "https://script.google.com/macros/s/AKfycbxYpdEGool6VLQ_A2N43Pw5ech2Ya1UG1Q9fXYU8CuHTVCYj3VJ73BiVLn1dsuv0wxu/exec";

function register() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const submitBtn = document.getElementById("submitBtn");

    // ✅ ตรวจสอบว่าทุกช่องต้องกรอกครบ
    if (!email || !password || !confirmPassword) {
        alert("กรุณากรอกข้อมูลให้ครบทุกช่อง");
        return;
    }

    // ✅ ตรวจสอบ Password format (อย่างน้อย 8 ตัวอักษร, A-Z a-z 0-9 _)
    const passwordRegex = /^[A-Za-z0-9_]{8,}$/;
    if (!passwordRegex.test(password)) {
        alert("Password ต้องมีอย่างน้อย 8 ตัวอักษร และประกอบด้วย A-Z, a-z, 0-9 และ _");
        return;
    }

    // ✅ ตรวจสอบ Password ตรงกัน
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // ✅ ปิดปุ่ม 5 วินาทีเพื่อกันการกดซ้ำ
    submitBtn.disabled = true;
    setTimeout(() => {
        submitBtn.disabled = false;
    }, 5000);

    // ✅ ส่งข้อมูลไป Apps Script
    fetch(scriptURL, {
        method: "POST",
        body: new URLSearchParams({
            action: "register",
            email: email,
            password: password
        })
    })
    .then(res => res.text())
    .then(text => {
        if (text === "EMAIL_ALREADY_REGISTERED") {
            alert("อีเมลนี้เคยสมัครแล้ว");
        } else if (text === "REGISTER_SUCCESS") {
            alert("สมัครสมาชิกสำเร็จ");
            window.location.href = "Page_one.html?email=" + encodeURIComponent(email);
        } else if (text === "PASSWORD_INVALID") {
            alert("Password ไม่ถูกต้องตามเกณฑ์");
        } else {
            alert(text);
        }
    })
    .catch(err => {
        alert("Error: " + err);
    });
}
