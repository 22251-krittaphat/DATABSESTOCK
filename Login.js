const scriptURL = "https://script.google.com/macros/s/AKfycbxYpdEGool6VLQ_A2N43Pw5ech2Ya1UG1Q9fXYU8CuHTVCYj3VJ73BiVLn1dsuv0wxu/exec"; // ใส่ URL ของ Apps Script

function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const submitBtn = document.getElementById("loginBtn");

    if (!email || !password) {
        alert("กรุณากรอกข้อมูลให้ครบ");
        return;
    }

    submitBtn.disabled = true;
    setTimeout(() => {
        submitBtn.disabled = false;
    }, 5000);

    fetch(scriptURL, {
        method: "POST",
        body: new URLSearchParams({
            action: "login",
            email: email,
            password: password
        })
    })
    .then(res => res.text())
    .then(text => {
        if (text === "LOGIN_SUCCESS") {
            // ✅ ไปหน้าถัดไป
            alert("เข้าสู่ระบบสำเร็จ");
            window.location.href = "Page_one.html?email=" + encodeURIComponent(email);
        } else {
            // ❌ แจ้งเตือนถ้าไม่ตรง
            alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        }
    })
    .catch(err => {
        alert("Error: " + err);
    });
}
