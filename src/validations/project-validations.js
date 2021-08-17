import * as Yup from "yup";

class ProjectValidation {
  newProjectValidation = () => {
    return Yup.object({
      projectName: Yup.string()
        .required("Required!")
        .min(2)
        .max(100),
      clientName: Yup.object().required("Required!"),
      status: Yup.object(),
      cost: Yup.string().required("Required!"),
      clientHours: Yup.string(),
      hourlyCost: Yup.string(),
      projectType: Yup.string(),
      platform: Yup.object().required("Required!"),
      technology: Yup.object().required("Required!"),
      serviceType: Yup.object().required("Required!"),
      nature: Yup.object().required("Required!"),
      cStartDate: Yup.date().required("Required!"),
      cEndDate: Yup.date()
        .required("Required!")
        .min(
          Yup.ref("cStartDate"),
          "Client End date must be greater than Client start date"
        ),
      pmStartDate: Yup.date().min(
        Yup.ref("cStartDate"),
        "PM start date must be greater then Client Start date"
      ),
      pmEndDate: Yup.date()
        .min(
          Yup.ref("pmStartDate"),
          "PM End date must be greater than PM start date"
        )
        .max(
          Yup.ref("cEndDate"),
          "PM end date must be greater then Client's Deadline"
        ),
      projectManager: Yup.object().required("Required!"),
      teamMembers: Yup.array(),
      orderNum: Yup.string().required("Required!"),
      Rprofit: Yup.number().required("Required!"),
      Pdeduction: Yup.number().required("Required!"),
      // percentage: Yup.string(),
      // fCost: Yup.string(),
      currency: Yup.object().required("Required!"),
      otherDeduction: Yup.number().required("Required!"),
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
