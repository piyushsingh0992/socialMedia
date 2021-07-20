import axios from "axios";
function apiErrorHandler(error) {
 

  if (axios.isAxiosError(error)) {
   
    if (error && error.response) {
      return { success: false, message: error.response.data.message };
    }
  }
 
  return { success: false, message: "Sorry Couldn't full fill your Request" };
}

export async function signUpService(signInDetails) {
  try {
    return  await axios.post(
      `https://social-media.piyushsingh6.repl.co/auth`,
      signInDetails
    );

  } catch (error) {
    return error
  }
}
