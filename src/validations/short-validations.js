import * as Yup from "yup";

class ShortValidations {
  natureValidation = () => {
    return Yup.object({
      title: Yup.string()
        .required("Required!")
        .min(2)
        .max(20),
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

  handleError(error) {
    console.log(error.message);
  }
}
const shortValidations = new ShortValidations();
export default shortValidations;
