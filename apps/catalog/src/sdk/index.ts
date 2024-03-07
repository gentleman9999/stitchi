import { makeAiSdk } from "./ai";
import { makeBigCommerceSdk } from "./bigcommerce";
import { makeSsActivewearSdk } from "./ssactivewear";

export type {
  SsActivewearSdk,
  SsActivewearCategory,
  SsActivewearProduct,
  SsActivewearProductVariant,
  SsActivewearWarehouse,
} from "./ssactivewear";

export type {
  BigCommerceSdk,
  BigCommerceCategory,
  BigCommerceProduct,
  BigCommerceProductVariant,
  BigCommerceProductVariantOptionValue,
} from "./bigcommerce";

export { BigCommerceProductOptionType } from "./bigcommerce";

interface MakeSdksConfig {
  bigCommerceSdk: ReturnType<typeof makeBigCommerceSdk>;
  ssActivewearSdk: ReturnType<typeof makeSsActivewearSdk>;
  aiSdk: ReturnType<typeof makeAiSdk>;
}

interface Sdks {
  bigCommerce: ReturnType<typeof makeBigCommerceSdk>;
  ssactivewear: ReturnType<typeof makeSsActivewearSdk>;
  ai: ReturnType<typeof makeAiSdk>;
}

const makeSdks = (
  { bigCommerceSdk, ssActivewearSdk, aiSdk }: MakeSdksConfig = {
    bigCommerceSdk: makeBigCommerceSdk(),
    ssActivewearSdk: makeSsActivewearSdk(),
    aiSdk: makeAiSdk(),
  }
): Sdks => {
  return {
    ssactivewear: ssActivewearSdk,
    bigCommerce: bigCommerceSdk,
    ai: aiSdk,
  };
};

export default makeSdks;
