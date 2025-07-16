function logStatus(message, color = "black") {
  document.body.style.background = color;
  const log = document.getElementById("status-log");
  log.textContent = message;
  log.style.color = color === "black" ? "white" : color;
}




// Set initial color
document.body.style.background = "lightyellow";

// When "Pay" is clicked
document.getElementById("pay-btn").addEventListener("click", pay);

async function pay() {
    // Step 1: Clicked → turn red
  logStatus("🟢 Button clicked", "pink");

    const email = document.getElementById("email").value;
    const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;

    if (!emailPattern.test(email)) {
        alert("Enter a valid email address (e.g. you@example.com)");
        document.body.style.background = "orange";
        return;
    }


    try {
        // Step 2: Fetch sent → turn blue
logStatus("📡 Initializing payment...", "deepskyblue");
        const res = await fetch("https://paystack-backend-nmo3.onrender.com/api/initialize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, amount: 2000 })
        });

        const data = await res.json();
        console.log(data)

        if (!data.status || !data.data.access_code) {
            alert("❌ Failed to initialize payment");
            document.body.style.background = "crimson";
            return;
        }
const amount=500000
        //-----------------------------------------

        // Step 3: Access code received → green
logStatus("✅ Payment popup ready", "limegreen");
        const handler = PaystackPop.setup({
            key: "pk_test_0a738015897d0b207670c83da9c5b68ec1a488e3", // ✅ Replace with your public key
            access_code: data.data.access_code,
email: email,
currency: "NGN",
amount:amount *100,

            callback: function (response) {
                // Step 4: Verifying → purple
              logStatus("🔄 Verifying transaction...", "mediumpurple");
                console.log(response)
                fetch(`https://paystack-backend-nmo3.onrender.com/api/verify/${response.reference}`)
                    .then(res => res.json())
                    .then(verifyData => {
                        if (verifyData.data.status === "success") {
                            logStatus("✅ Payment successful!", "lightgreen");
                          alert("✅ Payment successful!");
                        } else {
                            logStatus("❌ Payment verification failed.", "firebrick");
                          alert("❌ Payment verification failed.");
                        }
                    })
                    .catch(error => {
                        console.error("Verification error:", error);
                      logStatus("⚠️ Unexpected error occurred", "black");
                        alert("An error occurred during verification.");
                    });
            }

            ,
            onClose: function () {
              logStatus("❌ User closed the payment window", "gray");
                alert("❌ Transaction was closed");
            }
        });

        handler.openIframe();


    } catch (err) {
        document.body.style.background = "black"; // error indicator
        console.error("Unexpected error:", err);
      const msg=(err.message || JSON.stringify(err))
logStatus(msg, "black");
        // 👇 New: Try to show error in an alert as well
        alert("An error occurred:\n" + msg);
    }
}
