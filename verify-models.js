import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.VITE_GOOGLE_AI_KEY;

if (!apiKey) {
  console.error("No API key found in .env");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

const candidates = [
  "gemini-1.5-flash",
  "gemini-1.5-flash-001",
  "gemini-1.5-flash-8b",
  "gemini-2.0-flash",
  "gemini-2.0-flash-exp",
  "gemini-1.5-pro",
  "gemini-1.5-pro-001",
  "gemini-1.0-pro",
  "gemini-pro"
];

async function testModels() {
  console.log(`Testing models with key: ${apiKey.substring(0, 10)}...`);
  let workingModel = null;

  for (const modelName of candidates) {
    try {
      process.stdout.write(`Testing: ${modelName.padEnd(25)} ... `);
      const m = genAI.getGenerativeModel({ model: modelName });
      // Short prompt to minimize token usage
      const result = await m.generateContent("Hi"); 
      const response = await result.response;
      const text = response.text();
      
      console.error(`✅ SUCCESS! Response: "${text.trim().substring(0, 20)}..."`);
      workingModel = modelName;
      // We found one! Stop here to save quota.
      break; 
    } catch (e) {
      if (e.message.includes("404")) {
        console.error(`❌ ${modelName}: Not Found (404)`);
      } else if (e.message.includes("429")) {
        console.error(`⚠️ ${modelName}: Quota Exceeded (429)`);
      } else {
        console.error(`❌ ${modelName}: Error: ${e.message.split(' ').slice(0, 5).join(' ')}...`);
      }
    }
  }

  if (workingModel) {
    console.error(`\n🎉 RECOMMENDATION: Use model "${workingModel}"`);
  } else {
    console.error(`\n💔 No working models found. All are either missing or rate limited.`);
  }
}

testModels();
