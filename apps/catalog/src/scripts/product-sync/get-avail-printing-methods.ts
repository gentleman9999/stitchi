import axios from 'axios';
import env from '../../environment'

export enum EmbellishmentType {
    SCREENPRINTING = 'screen printing',
    EMBROIDERY = 'embroidery',
    HEATTRANSFER = 'heattransfer',
}

interface GPTResponse {
    screen_print: string;
    embroidery: string;
    heat_transfer: string;
}

// Function to query ChatGPT-4
async function queryChatGPT(prompt: string): Promise<GPTResponse> {
  const apiKey = env.OPEN_AI_API_KEY;
  const url = 'https://api.openai.com/v1/chat/completions';

  const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
  };

  const data = {
      model: "gpt-4-turbo-preview",
      messages: [{ role: "user", content: prompt }]
  };

  try {
        const response = await axios.post(url, data, { headers: headers });
        const results = response.data.choices[0].message.content;
        return JSON.parse(results);
  } catch (error) {
        console.error('Error making API request:', error);
        return {
            screen_print: "no",
            embroidery: "no",
            heat_transfer: "no"
        }
  }
}

export const getAvailPrintingMethods = async (categoryIds: number[], productTitle: string) => {
    const APPAREL = 24
    let availPrintingMethods:EmbellishmentType[] = [];

    if(categoryIds.includes(APPAREL)) {
        availPrintingMethods = [ EmbellishmentType.SCREENPRINTING, EmbellishmentType.EMBROIDERY, EmbellishmentType.HEATTRANSFER];
    } else {
        // TODO: Use OpenAI to determine this product's availPrintingMethods.
        const prompt = `we have three methods; Screen Print, Embroidery, and Heat Transfer.\nPlease tell me which are available for the products I give you. i need only answers in json format like screen_print: yes or no, embroidery: yes or no, heat_transfer: yes or no. ${productTitle}`;
        const response = await queryChatGPT(prompt);
        if (response) {
            if (response.screen_print === "yes")
                availPrintingMethods.push(EmbellishmentType.SCREENPRINTING);
            if (response.embroidery === "yes")
                availPrintingMethods.push(EmbellishmentType.EMBROIDERY);
            if (response.heat_transfer === "yes")
                availPrintingMethods.push(EmbellishmentType.HEATTRANSFER);
        }
    }

    return availPrintingMethods;
}
  