import * as Yup from "yup";

class ProjectValidation {
  newProjectValidation = () => {
    return Yup.object({
      projectName: Yup.string()
        .required("Required!")
        .min(2)
        .max(100),
      clientName: Yup.string().required(),
      // status: Yup.string(),
      cost: Yup.string(),
      platform: Yup.string().required("Required!"),
      technology: Yup.string().required("Required!"),
      serviceType: Yup.string().required("Required!"),
      nature: Yup.string().required("Required!"),
      cStartDate: Yup.date().required("Required!"),
      cEndDate: Yup.date().required("Required!"),
      pmStartDate: Yup.date().required("Required!"),
      pmEndDate: Yup.date().required("Required!"),
      projectManager: Yup.string().required("Required!"),
      teamMembers: Yup.array(),
      orderNum: Yup.string().required("Required!"),
      Rprofit: Yup.number(),
      Pdeduction: Yup.number(),
      // percentage: Yup.string(),
      // fCost: Yup.string(),
      currency: Yup.string(),
      otherDeduction: Yup.number(),
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
const projectValidation = new ProjectValidation();
export default projectValidation;
