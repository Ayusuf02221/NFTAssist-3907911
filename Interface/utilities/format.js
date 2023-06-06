import _ from 'lodash';

export const formatGoogleTextData = data => {
  const text = _.get(data, "responses[0].fullTextAnnotation.text", null);
  if (!text) {
    return [];
  }
  const lines = text.split("\n").map(line => line.trim());
  let tokenID;
  let contractAddress;
  if (lines) {
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith("Token ID:")) {
        tokenID = lines[i].substring(9).trim();
      } else if (lines[i].startsWith("Contract Address:")) {
        contractAddress = lines[i].substring(18).trim();
      }
    }
  }

  return {tokenID,contractAddress};
};
