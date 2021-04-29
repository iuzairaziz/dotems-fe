import * as Yup from "yup";

class AuthValidations {
  authSchemaValidation = () => {
    return Yup.object({
      firstName: Yup.string()
        .required("Required!")
        .min(2)
        .max(20),
      lastName: Yup.string()
        .required()
        .max(20, "Your lastname must be less than 20 character"),
    });
  };

  loginSchemaValidation = () => {
    return Yup.object({
      username: Yup.string()
        .required("Required!")
        .min(6)
        .max(20),
      password: Yup.string().required("Required"),
    });
  };

  handleError(error) {
    console.log(error.message);
  }
}
const authValidation = new AuthValidations();
export default authValidation;
