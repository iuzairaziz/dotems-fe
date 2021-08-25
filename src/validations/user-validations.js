import { yupToFormErrors } from "formik";
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
      salary: Yup.number().required("Required!"),
      password: Yup.string()
        .required("Required!")
        .min(6)
        .max(200),
      workingHrs: Yup.number(),
      machineNo: Yup.object(),
      designation: Yup.object(),
      workingDays: Yup.number(),
      userRole: Yup.array()
        .min(1, "Pick At Least One Technology")
        .of(
          Yup.object().shape({
            label: Yup.string().required(),
            value: Yup.string().required(),
          })
        ),
    });
  };

  UpdateProfile = () => {
    return Yup.object({
      contact: Yup.string(),
      otherContact: Yup.string(),
      emailPersonal: Yup.string(),
      address: Yup.string(),
      contactEmergency: Yup.string(),
      nameEmergency: Yup.string(),
      technology: Yup.array(),
    });
  };
  changePassword = () => {
    return Yup.object({
      oldPassword: Yup.string().required("Old Password is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    });
  };
  SignIn = () => {
    return Yup.object({
      email: Yup.string().required("Password is required"),
      password: Yup.string().required("Password is required"),
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
