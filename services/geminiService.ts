
import { GoogleGenAI } from "@google/genai";
import { products } from '../data/products';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIRecommendation = async (userInput: string) => {
  const modelName = 'gemini-3-flash-preview';
  
  const systemInstruction = `
    أنت خبير مبيعات حواسيب ذكي في متجر TechNova.
    مهمتك هي مساعدة العميل في اختيار الحاسوب المناسب بناءً على احتياجاته.
    لدينا المنتجات التالية: ${JSON.stringify(products.map(p => ({ name: p.name, price: p.price, specs: p.specs })))}.
    تحدث باللغة العربية الودودة. ركز على الفوائد التقنية.
    إذا سألك العميل عن شيء غير متوفر، اقترح أقرب بديل لدينا.
    اجعل إجاباتك مختصرة ومفيدة.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: userInput,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "عذراً، لم أستطع معالجة طلبك حالياً. كيف يمكنني مساعدتك في شيء آخر؟";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "حدث خطأ في الاتصال بالذكاء الاصطناعي. يرجى المحاولة لاحقاً.";
  }
};
