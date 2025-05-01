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

export const getCurrentTabUrl = async () => {
  const url = await chrome.runtime.sendMessage({ type: "GET_CURRENT_TAB_URL" });
  if (!url) return null;
  const parts = url.split("/");
  const chain = parts[4];
  const address = parts[5];
  if (!chain || !address) return null;
  if (address.startsWith("0x")) {
    const tokenInfo = await getTokenInfo(address, chain);
    if (!tokenInfo) return null;
    // Fix this part regarding to fetching token info.
    return {
      name: tokenInfo.name,
      image: tokenInfo.image.large,
      address: tokenInfo.address,
      symbol: tokenInfo.symbol,
      chainId: tokenInfo.chainId,
    };
  }
  return null;
};
