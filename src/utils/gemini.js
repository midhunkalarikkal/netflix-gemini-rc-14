const { GoogleGenerativeAI } = require("@google/generative-ai");

console.log(process.env.REACT_APP_GEMINI_API)
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default model;