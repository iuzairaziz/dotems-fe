import * as Yup from "yup";

class ClientValidation {
  authSchemaValidation = () => {
    return Yup.object({
      title: Yup.string()
        .required("Required!")
        .min(2)
        .max(50),
      compName: Yup.string().max(
        100,
        "company name must be less than 100 character"
      ),
      email: Yup.string()
        .max(100)
        .email(),
      adrs: Yup.string().max(1000, "Required"),
      conNum: Yup.string().max(100, "Required"),
      // otherContact: Yup.string().max(100, ""),
      ul: Yup.string()
        .max(1000, "")
        .url(),
      country: Yup.string().required(),
      platform: Yup.object().required(),
      dateOfJoin: Yup.date().required("Required!"),
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
