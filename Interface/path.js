import Constants from "expo-constants";

const { manifest } = Constants;
export const url = "http://localhost:5001";
export const backendUrl = `http://${manifest.debuggerHost.split(':').shift()}:5001`;
export const wikipedia = "https://en.wikipedia.org/api/rest_v1/page/summary/";


