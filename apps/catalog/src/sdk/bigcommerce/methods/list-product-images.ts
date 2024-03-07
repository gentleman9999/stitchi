import makeBigCommerceRepository, {
  BigCommerceRepository,
} from "../repository";
import { BigCommerceProductImage } from "../types";

export interface ListProductImagesFnInput {
  productId: number;
  filter: {
    limit: number;
    page: number;
  };
}

export type ListProductImagesFn = (input: ListProductImagesFnInput) => Promise<{
  images: BigCommerceProductImage[];
  pagination: { hasNextPage: boolean };
}>;

interface Config {
  repository: BigCommerceRepository;
}

const makeListProductImagesFn = (
  { repository }: Config = { repository: makeBigCommerceRepository() }
): ListProductImagesFn =>
  async function list(input) {
    let response;

    try {
      response = await repository.listProductImages(input);
    } catch (error) {
      console.error("Error listing product images", {
        context: { error },
      });

      throw error;
    }

    return response;
  };

export default makeListProductImagesFn;
