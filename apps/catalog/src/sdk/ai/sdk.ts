import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

interface Product {
  name: string;
  brand: string;
  description: string;
  categories: string[];
}

interface AiSdk {
  generateProductDescription: (product: Product) => Promise<string>;
}

interface MakeAiSdkConfig {}

const makeSdk = ({}: MakeAiSdkConfig = {}): AiSdk => {
  return {
    generateProductDescription: async (product) => {
      const model = new ChatOpenAI({
        maxTokens: 2000,
        temperature: 0,
        modelName: "gpt-4",
        openAIApiKey: "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",
        timeout: 45_000, // 45 seconds
        maxRetries: 3,
      });

      const outputParser = new StringOutputParser();

      const prompt = new PromptTemplate<Product>({
        inputVariables: ["name", "brand", "description", "categories"],
        template: `Task: You will be given details about a product (including a basic description). Your job is to take the provided product information and craft an irresistible rich text product description that highlights the benefits of {name}. First, include at least 3-5 product features and corresponding benefits. Second, include a single paragraph describing the product. Ensure that the benefits are clear and persuasive. Be sure the description is SEO optimized for the product, and also includes general keywords such as "merch", "swag" or "promotional products. Below are 3 example quality outputs for the given sample input. Use HTML only to format your a single HTML description for the product. Do not use H1.".


        Example Input:
        {{ name: "Gildan Softstyle® T-Shirt [G64000]", gtin: "00821780075840", brand: "Gildan", description: "Item #: 00660 4.5 oz./yd² (US) 7.5 oz./L yd (CA), 100% ring-spun cotton, 30 singles Antique colors & Sport Grey are 90/10 cotton/polyester Dark Heather & Heather colors are 65/35 polyester/cotton Graphite Heather is 50/50 cotton/ polyester Modern classic fit Narrow width, rib collar Taped neck and shoulders for comfort and durability Tear away label Gildan partners with Better Cotton to improve cotton farming globally Made with OEKO-TEX certified low-impact dyes This product meets the following Sustainable Style subcategories: Sustainable Manufacturing Socially Conscious Manufacturing Natural is not a dyed fabric, the specks that you see are fibers and cotton seeds.", categories: ["apparel", "tops", "t-shirts", "short-sleeve t-shirts"], }}
        
        Example Output 1:
        
        <h2>Step Up Your T-Shirt Game with the <em>Softstyle® T-Shirt</em> from Gildan</h2>
        <p>With its soft feel and updated classic fit, this t-shirt will quickly become your new favorite for casual wear. The <em>Softstyle®</em> fabric is gentle on sensitive skin while the ribbed collar adds subtle style. Perfect for layering or wearing on its own, this tee offers comfort and quality at a great value. Give your t-shirt drawer a refresh!</p>
        <ul>
            <li><strong>Made from ultra-soft 100% ring-spun cotton</strong> that feels great against your skin</li>
            <li><strong>Modern classic fit</strong> is flattering without being too tight</li>
            <li><strong>Tear-away label</strong> prevents itchiness and discomfort</li>
            <li><strong>OEKO-TEX certified low-impact dyes</strong> are better for the environment</li>
            <li><strong>Gildan partners with Better Cotton Initiative</strong> for more sustainable cotton farming</li>
        </ul>

        Example Output 2:
        
        <h2>Softstyle® T-Shirts - Your New Go-To for Casual Comfort</h2>
        <p>Few things feel better than a soft, comfortable t-shirt you can't wait to wear again and again. With its silky-smooth ring-spun cotton and slim, flattering fit, this tee checks all the boxes. The ribbed collar adds subtle style while the tear-away label prevents itchiness. Perfect for layering or wearing solo during your downtime, this responsibly-made tee will be your new favorite. Upgrade your t-shirt collection today!</p>
        <ul>
            <li><strong>Ultra-soft 100% ring-spun cotton</strong> feels great against your skin</li>
            <li><strong>Flattering slim fit</strong> flatters without clinging</li>
            <li><strong>Tear-away label</strong> prevents irritation</li>
            <li><strong>Made sustainably with OEKO-TEX low-impact dyes</strong></li>
            <li><strong>Gildan partners with Better Cotton Initiative</strong> for responsible cotton sourcing</li>
        </ul>

        Example Output 3:
        <h2>Treat Yourself to the <em>Softstyle® Tee</em> from Gildan - Sustainably Made for Casual Comfort</h2>
        <p>You deserve t-shirts that combine incredible softness with casual style. This <em>Softstyle®</em> tee delivers with its silky ring-spun cotton and flattering slim fit. The ribbed collar provides subtle detailing while the tear-away label prevents itchiness. And it's made using low-impact dyes and cotton from sustainable farming initiatives. Treat yourself to comfort that feels good in more ways than one. Make this tee your new go-to for laidback wear.</p>
        <ul>
          <li><strong>Silky soft 100% ring-spun cotton</strong> feels gentle against skin</li>
          <li><strong>Modern classic fit</strong> flatters without clinging</li>
          <li><strong>Tear-away label</strong> prevents irritation</li>
          <li><strong>OEKO-TEX certified dyes</strong> better for the environment</li>
          <li><strong>Gildan partners</strong> for more sustainable cotton farming</li>
        </ul>
      
        Actual Input:
        {{ name: "{name}", brand: "{brand}", description: "{description}", categories: "{categories}" }}
        `,
      });

      const chain = RunnableSequence.from([prompt, model, outputParser]);

      const result = await chain.invoke(product);

      return result;
    },
  };
};

export default makeSdk;
