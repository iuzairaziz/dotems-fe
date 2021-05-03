import * as Yup from "yup";

class ProjectValidations {
  authSchemaValidation = () => {
    return Yup.object({
      projectName: Yup.string()
        .required("Required!")
        .min(2)
        .max(100),
      clientName: Yup.string().required(),
      orderNum: Yup.string()
        .required()
        .max(100, "Required"),
      status: Yup.string().required("Required!"),
      cost: Yup.number()
        .required()
        .max(1000000, "Required"),
      platform: Yup.string().required("Required!"),
      technology: Yup.string().required("Required!"),
      serviceType: Yup.string().required("Required!"),
      projectNature: Yup.string().required("Required!"),
      startDate: Yup.string().required("Required!"),
      endDate: Yup.string().required("Required!"),
      projectManager: Yup.string().required("Required!"),
      teamMembers: Yup.string().required("Required!"),
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
const ProjectValidation = new ProjectValidations();
export default ProjectValidations;
