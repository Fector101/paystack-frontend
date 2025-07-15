async function pay() {
  
document.querySelector("body").style.background="red"
  const email = document.getElementById('email').value;
  if (!email) return alert('Enter a valid email');

  // 1. Call your backend to initialize the payment
  const res = await fetch('https://paystack-backend-nmo3.onrender.com/api/initialize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      amount: 2000 // Naira (will be converted to kobo in backend)
    })
  });

  const data = await res.json();
  const access_code = data.data.access_code;

  // 2. Use the access_code to open Paystack popup
  const handler = PaystackPop.setup({
    key: 'pk_test_0a738015897d0b207670c83da9c5b68ec1a488e3', // ✅ Your public key
    access_code: access_code,
    callback: async function (response) {
      console.log('Payment reference:', response.reference);

      // 3. Call backend to verify the transaction
      const verifyRes = await fetch(`https://your-backend.onrender.com/api/verify/${response.reference}`);
      const verifyData = await verifyRes.json();

      if (verifyData.data.status === 'success') {
        alert('✅ Payment successful!');
      } else {
        alert('❌ Payment failed.');
      }
    },
    onClose: function () {
      alert('❌ Transaction closed by user');
    }
  });

  handler.openIframe();
}

document.querySelector("button").addEventListener('click',pay)
