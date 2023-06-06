import { detectNFT } from "../api/google";

const moralisApi = 'https://deep-index.moralis.io/api/v2/nft/';
const apiKey = '9jb0MX37P02tT2LMTQKvdeVM06p7WFHqE78XZZdXVX536uLmcZCnSpPNwUM6w263';
const fetchNFTInfo = async (contractAddress, tokenID) => {
  const apiUrl = `${moralisApi}${contractAddress}/${tokenID}`;
  const res = await fetch(apiUrl, {
    headers: {
      'X-API-Key': apiKey,
    },
  });

  // Log the response status and the raw text response
  console.log("Server response status:", res.status);
  const rawTextResponse = await res.text();
  console.log("Raw text response:", rawTextResponse);

  // If the response is not ok, throw an error
  if (!res.ok) {
    throw new Error(`Error fetching NFT info: ${res.status}`);
  }

  // Parse the response as JSON
  const nftInfos = JSON.parse(rawTextResponse);
  return nftInfos;
};


export const useNFTInfo = async (base64) => {
  const { tokenID, contractAddress } = await detectNFT(base64);
  console.log('Detected NFT with tokenID:', tokenID, 'and contractAddress:', contractAddress);

  const nftInfoss = await fetchNFTInfo(contractAddress, tokenID);

  return nftInfoss;
};
