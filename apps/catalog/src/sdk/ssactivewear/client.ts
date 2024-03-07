import * as yup from "yup";
import env from "../../environment";

const token = Buffer.from(
  `${env.SSA_ACCOUNT_NUMBER}:${env.SSA_API_KEY}`
).toString("base64");

interface MakeClientConfig {
  accessToken: string;
}

const makeClient = (
  { accessToken }: MakeClientConfig = {
    accessToken: token,
  }
) => {
  return {
    call: async <T>(
      url: string,
      schema: yup.Schema<T>,
      init?: RequestInit
    ): Promise<T> => {
      const res = await fetch(`https://api.ssactivewear.com/v2${url}`, {
        ...init,
        headers: {
          ...init?.headers,
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Basic ${accessToken}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      try {
        const json = await res.json();
        return await schema.validate(json);
      } catch (error) {
        console.error("Error validating SS Activewear response", { error });
        throw error;
      }
    },
  };
};

export default makeClient;
