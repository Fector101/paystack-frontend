// Set initial color
document.body.style.background = "lightyellow";

// When "Pay" is clicked
document.getElementById("pay-btn").addEventListener("click", pay);

async function pay() {
  // Step 1: Clicked → turn red
  document.body.style.background = "tomato";
  
  const email = document.getElementById("email").value;
  if (!email) {
    alert("Enter a valid email");
    document.body.style.background = "orange"; // warning color
    return;
  }
  
  try {
    // Step 2: Fetch sent → turn blue
    document.body.style.background = "deepskyblue";
    
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
    
    // Step 3: Access code received → green
    document.body.style.background = "limegreen";
    
    const handler = PaystackPop.setup({
      key: "pk_test_0a738015897d0b207670c83da9c5b68ec1a488e3", // ✅ Replace with your public key
      access_code: data.data.access_code,
      callback: function (response) {
  // Step 4: Verifying → purple
  document.body.style.background = "mediumpurple";
  console.log(response)
  fetch(`https://paystack-backend-nmo3.onrender.com/api/verify/${response.reference}`)
    .then(res => res.json())
    .then(verifyData => {
      if (verifyData.data.status === "success") {
        document.body.style.background = "lightgreen"; // ✅ success
        alert("✅ Payment successful!");
      } else {
        document.body.style.background = "firebrick"; // ❌ verification failed
        alert("❌ Payment verification failed.");
      }
    })
    .catch(error => {
      console.error("Verification error:", error);
      document.body.style.background = "black";
      alert("An error occurred during verification.");
    });
}

      ,
      onClose: function() {
        document.body.style.background = "gray"; // user closed popup
        alert("❌ Transaction was closed");
      }
    });
    
    handler.openIframe();
 

} catch (err) {
  document.body.style.background = "black"; // error indicator
  console.error("Unexpected error:", err);

  // 👇 New: Try to show error in an alert as well
  alert("An error occurred:\n" + (err.message || JSON.stringify(err)));
}}
