import React from "react";
import axios from "axios";

function apiErrorHandler(error) {
  if (axios.isAxiosError(error)) {
    if (error && error.response) {
      return { success: false, message: error.response.data.message };
    }
  }

  return { success: false, message: "Sorry Couldn't full fill your Request" };
}

export async function apiCall(type, endPoint, body) {
  
  switch (type) {
    case "GET":
      try {
        let { status, data } = await axios.get(
          `https://social-media.piyushsingh6.repl.co/${endPoint}`
        );
        if (status === 200) {
          return { success: true, data: data };
        } else {
          return { success: false, message: data.message };
        }
      } catch (error) {
        return apiErrorHandler(error);
      }
    case "POST":
      try {
        let { status, data } = await axios.post(
          `https://social-media.piyushsingh6.repl.co/${endPoint}`,
          body
        );

        if (status === 200) {
          return { success: true, data: data };
        } else {
          return { success: false, message: data.message };
        }
      } catch (error) {
        return apiErrorHandler(error);
      }
    case "DELETE":
      try {
        let { status, data } = await axios.delete(
          `https://social-media.piyushsingh6.repl.co/${endPoint}`,
          {
            data: body,
          }
        );
        if (status === 200) {
          return { success: true, data: data };
        } else {
          return { success: false, message: data.message };
        }
      } catch (error) {
        return apiErrorHandler(error);
      }

    default:
      return {
        success: false,
        message: "Sorry Couldn't full fill your Request",
      };
  }
}
