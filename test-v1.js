import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.VITE_GOOGLE_AI_KEY;

async function testV1() {
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  console.error(`Testing v1 Endpoint: ${url.replace(apiKey, 'KEY')} ...`);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "Hello" }] }]
      })
    });
    
    const data = await response.json();
    
    if (response.ok) {
        console.error("✅ SUCCESS! v1 API works.");
        console.error(JSON.stringify(data, null, 2));
    } else {
        console.error(`❌ FAILED: ${response.status} ${response.statusText}`);
        console.error(JSON.stringify(data, null, 2));
    }
  } catch (e) {
    console.error("Error:", e);
  }
}

testV1();
