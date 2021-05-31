import { getToken } from "./sessionServices";

const axios = require("axios");


const debugMode = true;

const logRequest = (endpoint, request, config) => {
  if (debugMode) {
    console.log("--Request--");
    console.log({
      endpoint: endpoint,
      request: request,
      config: config,
    });
  }
};

const logResponse = (endpoint, response) => {
  if (debugMode) {
    console.log("--Response--");
    console.log({
      endpoint: endpoint,
      response: response?.data,
      status: response?.status,
      statusText: response?.statusText,
    });
  }
};

const logErrorResponse = (endpoint, errorResponse) => {
  if (debugMode) {
    console.log("--Response Exception--");
    console.log({
      endpoint: endpoint,
      response: errorResponse?.response?.data,
      status: errorResponse?.response?.status,
      statusText: errorResponse?.response?.statusText,
    });
  }
};

export const post = async (endpoint, request) => {

    try {

      var authorizationConfig = { headers: { Authorization: "Bearer " + getToken() }};

      logRequest(endpoint, request, authorizationConfig);

      var response = await axios.post(endpoint, request, authorizationConfig);

      logResponse(endpoint, response);

      return response?.data;
    } catch (error) {
      logErrorResponse(endpoint, error);
      return error?.response?.data;
    }
};


export const postToken = async (endpoint, request, token) => {

  try {

    var authorizationConfig = { headers: { Authorization: "Bearer " + token }};

    logRequest(endpoint, request, authorizationConfig);

    var response = await axios.post(endpoint, request, authorizationConfig);

    logResponse(endpoint, response);

    return response?.data;
  } catch (error) {
    logErrorResponse(endpoint, error);
    return error?.response?.data;
  }
};

export const get = async (endpoint) => {
  
    try {

      var authorizationConfig = { headers: { Authorization: "Bearer " + getToken() }};

      logRequest(endpoint, null, authorizationConfig);

      var response = await axios.get(endpoint, authorizationConfig);

      logResponse(endpoint, response);

      return response;
    } catch (error) {
      logErrorResponse(endpoint, error);
      return error?.response?.data;
    }
};

export const getById = async (endpoint, id) => {  
  return await get(endpoint + "?idUsuario=" + id);
};
export const getByIdAt = async (endpoint, id,atribute) => {  
  return await get(endpoint + "?"+atribute+"=" + id);
};

export const deleteById = async (endpoint, request) => {

  try {

    var authorizationConfig = { headers: { Authorization: "Bearer " + getToken() }};

    logRequest(endpoint, request, authorizationConfig);
    console.log(request);
    var response = await axios.delete(endpoint, request, authorizationConfig);

    logResponse(endpoint, response);
    
    return response;
  } catch (error) {
    logErrorResponse(endpoint, error);
    return error?.response?.data;
  }
};