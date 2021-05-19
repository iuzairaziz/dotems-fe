import * as Yup from "yup";

class UserValidation {
  newUserValidation = () => {
    return Yup.object({
      name: Yup.string()
        .required("Required!")
        .min(2)
        .max(100),
      userName: Yup.string()
        .email("User Name Must be A Valid Email Address")
        .required("Required!"),
      gender: Yup.object().required(),
      joiningDate: Yup.string().required("Required!"),
      status: Yup.object().required("Required!"),
      salary: Yup.string().required("Required!"),
      password: Yup.string()
        .required("Required!")
        .min(6)
        .max(20),
    });
  };

  // loginSchemaValidation = () => {
  //   return Yup.object({
  //     username: Yup.string()
  //       .required("Required!")
  //       .min(6)
  //       .max(20),
  //     password: Yup.string().required("Required"),
  //   });
  // };

  handleError(error) {
    console.log(error.message);
  }
}
const userValidation = new UserValidation();
export default userValidation;
