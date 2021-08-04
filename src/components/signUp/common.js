export function check(signUpDetails) {
  let check = Object.keys(signUpDetails).reduce((state, action) => {
    if (signUpDetails[action].length > 0) {
      return state + 1;
    } else {
      return state + 0;
    }
  }, 0);

  return check !== Object.keys(signUpDetails).length;
}

export const successSignUp = (
  {
    signUpDetails,
    signUpDetailsSetter,
    signInDetailsSetter,
    currentUserSetter,
    toast,
  },
  message
) => {
  signInDetailsSetter({
    password: signUpDetails.password,
    email: signUpDetails.email,
  });
  currentUserSetter((value) => !value);
  signUpDetailsSetter({
    userName: "",
    password: "",
    email: "",
    pronouns: "",
    sex: "",
  });

  toast.success(message);
};
