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
        "Company name must be less than 100 character"
      ),
      email: Yup.string()
        .max(100)
        .email(),
      adrs: Yup.string().max(1000),
      conNum: Yup.string().max(100),
      socialContact: Yup.string(),
      otherContact: Yup.string(),
      ul: Yup.string()
        .max(1000, "")
        .url(),
      country: Yup.object().required(),
      platform: Yup.object().required(),
      dateOfJoin: Yup.date().required("Required!"),
      clientLabel: Yup.object(),
      status: Yup.object(),
      clientType: Yup.object(),
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
