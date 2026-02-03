import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.VITE_GOOGLE_AI_KEY;

if (!apiKey) {
  console.error("No API key found in .env");
  process.exit(1);
}

async function listModels() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  
  console.log(`Fetching models from: ${url.replace(apiKey, 'HIDDEN_KEY')}`);

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.models) {
      console.log("✅ API Connection Successful! Available Models:");
      data.models.forEach(m => {
        if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
            console.log(`- ${m.name.replace('models/', '')}`);
        }
      });
    } else {
      console.log("❌ API Connection Failed or No Models Found");
      console.log(JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error("Fetch Error:", error);
  }
}

listModels();
