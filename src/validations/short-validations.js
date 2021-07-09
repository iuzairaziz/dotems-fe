import * as Yup from "yup";

class ShortValidations {
  leaveTypeValidation = () => {
    return Yup.object({
      name: Yup.string()
        .required("Required!")
        .min(2)
        .max(20),
      number: Yup.number().required("Required!"),
    });
  };
  natureValidation = () => {
    return Yup.object({
      title: Yup.string()
        .required("Required!")
        .min(2)
        .max(20),
    });
  };
  requestTypeValidation = () => {
    return Yup.object({
      title: Yup.string()
        .required("Required!")
        .min(2)
        .max(20),
    });
  };
  requestValidation = () => {
    return Yup.object({
      requestType: Yup.object().required("Required!"),
      description: Yup.object().required("Required!"),
    });
  };

  technologyValidation = () => {
    return Yup.object({
      title: Yup.string()
        .required("Required!")
        .min(2)
        .max(20),
    });
  };

  serviceValidation = () => {
    return Yup.object({
      title: Yup.string()
        .required("Required!")
        .min(2)
        .max(20),
    });
  };
  platformValidation = () => {
    return Yup.object({
      title: Yup.string()
        .required("Required!")
        .min(2)
        .max(20),
    });
  };

  countryValidation = () => {
    return Yup.object({
      title: Yup.string()
        .required("Required!")
        .min(2)
        .max(20),
    });
  };
  accessoryValidation = () => {
    return Yup.object({
      title: Yup.string()
        .required("Required!")
        .min(2)
        .max(20),
    });
  };

  statusValidation = () => {
    return Yup.object({
      status: Yup.string()
        .required("Required!")
        .min(2)
        .max(20),
    });
  };

  CurrencyValidation = () => {
    return Yup.object({
      name: Yup.string().required("Required!"),
      exchangeRate: Yup.string(),
    });
  };

  handleError(error) {
    console.log(error.message);
  }
}
const shortValidations = new ShortValidations();
export default shortValidations;
