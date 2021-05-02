import * as Yup from "yup";

class ClientValidations {
  authSchemaValidation = () => {
    return Yup.object({
      clientName: Yup.string()
        .required("Required!")
        .min(2)
        .max(50),
      companyName: Yup.string()
        .required()
        .max(100, "company name must be less than 100 character"),
      Email: Yup.string()
        .required()
        .max(100, "Email Required"),
      Address: Yup.string()
        .required()
        .max(1000, "Required"),
      contactNum: Yup.string()
        .required()
        .max(100, "Required"),
      otherContact: Yup.string().max(100, ""),
      URL: Yup.string().max(1000, ""),
      country: Yup.string().required("Required!"),
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
const ClientValidation = new ClientValidations();
export default ClientValidations;
