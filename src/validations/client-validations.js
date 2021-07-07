import * as Yup from "yup";

class ClientValidation {
  authSchemaValidation = () => {
    return Yup.object({
      title: Yup.string()
        .required("Required!")
        .min(2)
        .max(50),
      compName: Yup.string()
        .required()
        .max(100, "company name must be less than 100 character"),
      email: Yup.string()
        .required()
        .max(100, "Email Required")
        .email(),
      adrs: Yup.string()
        .required()
        .max(1000, "Required"),
      conNum: Yup.string()
        .required()
        .max(100, "Required"),
      // otherContact: Yup.string().max(100, ""),
      ul: Yup.string()
        .max(1000, "")
        .url(),
      country: Yup.object().required("Required!"),
      // dateOfJoin: Yup.date().required("Required!"),
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
const clientValidation = new ClientValidation();
export default clientValidation;
