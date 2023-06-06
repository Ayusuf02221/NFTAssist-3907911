import config from "../config.json";
import { formatGoogleTextData } from "../utilities/format";

// This function uses Google's OCR (Optical Character Recognition) to detect and extract text from a base64 encoded image
export const detectNFT = async base64 => {
  try {
    // This fetch function sends a POST request to Google Cloud Vision API for text detection
    const res = await fetch(
      config.googleCloud.api + config.googleCloud.apiKey,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: base64, // The base64 encoded image is added to the request body
              },
              features: [
                {
                  type: "TEXT_DETECTION", // The type of detection we want to perform is text detection
                  maxResults: 1,
                },
              ],
            },
          ],
        }),
      }
    );
    // The response from the API call is parsed into a JSON object
    const data = await res.json();

    console.log("data returned from fetch:", data);
      
    // The parsed data is then passed to a formatting function which extracts the tokenID and contractAddress
    let {tokenID,contractAddress} = formatGoogleTextData(data);

    console.log("tokenID returned from formatGoogleTextData", tokenID)
    console.log("contractAddress returned from formatGoogleTextData", contractAddress)

    // The function returns the formatted data which includes the tokenID and contractAddress
    return formatGoogleTextData(data);
  } catch (error) {
    // If there are any errors during the process, they are caught here and logged to the console
    console.error(error);
    throw error; // The error is then re-thrown to be caught and handled by the calling function
  }
};
