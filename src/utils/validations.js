export const checkValidateData = (email, password, name) => {
  const isEmailValid = /^[a-zA-Z0-9-_%.+]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
    password
  );
  const isNameValid = /^[a-zA-Z ]{15,}$/.test(name);

  if (!isEmailValid) return "Email ID is not valid.";
  if (!isPasswordValid) return "Password is not valid.";
  if (!isNameValid) return "Name is not valid.";
  return null;
};
