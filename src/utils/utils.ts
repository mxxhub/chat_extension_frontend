import axios from "axios";

export const toShortAddress = (text: string) => {
  if (!text) return "";
  const first = text.slice(0, 4);
  const last = text.slice(-4);
  return `${first}...${last}`;
};

export const getTokenInfo = async (tokenAddress: string, chainId: string) => {
  console.log("Getting token info for: ", tokenAddress, "on chain: ", chainId);
  try {
    const response = await axios.get(
      `https://api.dexscreener.io/latest/dex/pairs/${chainId}/${tokenAddress}`
    );
    console.log("Token Info: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching token info:", error);
    return null;
  }
};

export const getCurrentTabUrl = async () => {
  try {
    const url = await chrome.runtime.sendMessage({
      type: "GET_CURRENT_TAB_URL",
    });
    if (!url || !url.url) return null;

    console.log("URL: ", url.url);
    const parts = url.url.split("/");
    console.log("Parts: ", parts);

    const chain = parts[3];
    const address = parts[4];
    console.log("Chain: ", chain, "Address: ", address);

    if (!chain || !address) return null;

    if (address.startsWith("0x")) {
      console.log("Address is a contract address");
      // Note: I removed the alert() as it wasn't clear why it was there

      const tokenInfo = await getTokenInfo(address, chain);
      if (!tokenInfo || !tokenInfo.pair) return null;

      console.log("Token Info: ", tokenInfo);

      return {
        name: tokenInfo.pair?.baseToken?.name,
        image: tokenInfo.pair?.info?.imageUrl,
        banner: tokenInfo.pair?.info?.header,
        address: address,
        symbol: tokenInfo.pair?.baseToken?.symbol,
        chainId: chain,
      };
    }
    return null;
  } catch (error) {
    console.error("Error in getCurrentTabUrl:", error);
    return null;
  }
};
