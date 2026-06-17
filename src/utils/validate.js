const validateForm = (name, email, password, checkNameValidation) => {
  const nameRegex = /^[a-zA-Z ]{3,50}$/;
  const emailRegexValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (checkNameValidation && !nameRegex.test(name)) {
    return "Invalid user name, Please enter correct user name";
  } else if (!emailRegexValid.test(email)) {
    return "Invalid email id, Please enter correct email id";
  } else if (!passwordRegex.test(password)) {
    return "Invalid password, Please enter correct password";
  } else {
    return;
  }
};

export default validateForm;
