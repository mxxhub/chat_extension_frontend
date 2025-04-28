import axios from "axios";

export const toShortAddress = (text: string) => {
  if (!text) return "";
  const first = text.slice(0, 4);
  const last = text.slice(-4);
  return `${first}...${last}`;
};

export const getTokenInfo = async (tokenAddress: string, chainId: string) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${chainId}/contract/${tokenAddress}`
  );
  console.log("Token Info: ", response.data);
  return response.data;
};
