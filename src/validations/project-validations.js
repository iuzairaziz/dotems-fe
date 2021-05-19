import * as Yup from "yup";

class ProjectValidation {
  newProjectValidation = () => {
    return Yup.object({
      projectName: Yup.string()
        .required("Required!")
        .min(2)
        .max(100),
      clientName: Yup.string().required(),
      orderNum: Yup.string()
        .required()
        .max(100, "Required"),
      // status: Yup.string(),
      cost: Yup.string(),
      platform: Yup.string().required("Required!"),
      technology: Yup.string().required("Required!"),
      serviceType: Yup.string().required("Required!"),
      projectNature: Yup.string().required("Required!"),
      startDate: Yup.string().required("Required!"),
      endDate: Yup.string().required("Required!"),
      projectManager: Yup.string().required("Required!"),
      teamMembers: Yup.array(),
      orderNum: Yup.string().required("Required!"),
      Rprofit: Yup.string(),
      Pdeduction: Yup.string(),
      percentage: Yup.string(),
      fCost: Yup.string(),
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
