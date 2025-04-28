import axios from "axios";

export const toShortAddress = (text: string) => {
  if (!text) return "";
  const first = text.slice(0, 4);
  const last = text.slice(-4);
  return `${first}...${last}`;
};

export const getTokenInfo = async (chainId: string, tokenAddress: string) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${chainId}/contract/${tokenAddress}`
  );
  console.log("Token Info: ", response.data);
  return response.data;
};

export const getTokenAdd = (url: string) => {
  if (!url) return;
  const chainId = url.split("/")[3];
  const tokenAdd = url.split("/")[4];
  if (!tokenAdd || !chainId) return;
  if (tokenAdd.startsWith("0x")) {
    console.log("I got token address: ", tokenAdd);
  }
  return { chainId, tokenAdd };
};
