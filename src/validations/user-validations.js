import { yupToFormErrors } from "formik";
import * as Yup from "yup";

class UserValidation {
  newUserValidation = () => {
    return Yup.object({
      firstName: Yup.string()
        .required("Required!")
        .min(2)
        .max(100),
      lastName: Yup.string()
        .required("Required!")
        .min(2)
        .max(100),
      email: Yup.string()
        .email("User Name Must be A Valid Email Address")
        .required("Required!"),
      password: Yup.string()
        .required("Required!")
        .min(8)
        .max(200),
      userRole: Yup.object().required(),
      // userRole: Yup.array()
      //   .min(1, "Pick At Least One")
      //   .of(
      //     Yup.object().shape({
      //       label: Yup.string().required(),
      //       value: Yup.string().required(),
      //     })
      //   ),
      jobTitle: Yup.string()
        .required("Required!")
        .min(2)
        .max(100),
      designation: Yup.object().required(),
      employeeType: Yup.object().required(),
      employeeManager: Yup.object().required(),
      department: Yup.object().required(),
      employeeStatus: Yup.object().required(),
      workingDays: Yup.object().required(),
      workingHours: Yup.object().required(),
      salary: Yup.number().required("Required!"),
      gender: Yup.object().required(),
      joiningDate: Yup.string().required("Required!"),
      status: Yup.object().required("Required!"),
      machineNo: Yup.object().required(),
      resourceCost: Yup.object().required(),
      technology: Yup.array(),
      contactNo: Yup.number(),
      otherContactNo: Yup.number(),
      personalEmail: Yup.string().email(
        "Personal Email Must be A Valid Email Address"
      ),

      address: Yup.string(),
      guardianName: Yup.string(),
      guardianContact: Yup.number(),
      status: Yup.object(),
      gender: Yup.object(),
      city: Yup.string(),
      country: Yup.string(),
      bankName: Yup.string(),
      bankAccNo: Yup.string(),
      joiningDate: Yup.date().required("Required!"),
      terminationDate: Yup.date(),
      dateOfBirth: Yup.date(),
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
      confirmPassword: Yup.string()
        .required("Please Enter To Confirm Password")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
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
