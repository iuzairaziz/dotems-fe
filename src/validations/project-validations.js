import * as Yup from "yup";
import moment from "moment";

class ProjectValidation {
  newProjectValidation = () => {
    return Yup.object({
      projectName: Yup.string()
        .required("Required!")
        .min(2)
        .max(100),
      clientName: Yup.object().required("Required!"),
      status: Yup.object().required("Required!"),
      cost: Yup.number().required("Required!"),
      clientHours: Yup.number().when("projectType", (projectType, schema) => {
        if (projectType && projectType.label === "Fixed") {
          return schema;
        } else {
          return schema.required("Required!");
        }
      }),
      hourlyCost: Yup.number().when("projectType", (projectType, schema) => {
        if (projectType && projectType.label === "Fixed") {
          return schema;
        } else {
          return schema.required("Required!");
        }
      }),
      projectType: Yup.object().required("Required!"),
      platform: Yup.object().required("Required!"),
      technology: Yup.array()
        .min(1, "Pick At Least One Technology")
        .of(
          Yup.object().shape({
            label: Yup.string().required(),
            value: Yup.string().required(),
          })
        ),
      serviceType: Yup.object().required("Required!"),
      nature: Yup.object().required("Required!"),
      cStartDate: Yup.date().required("Required!"),
      cEndDate: Yup.date()
        .required("Required!")
        .min(
          Yup.ref("cStartDate"),
          "Client End Date Must Be Greater Than Client Start Date"
        ),
      pmStartDate: Yup.date().min(Yup.ref("cStartDate")),
      pmEndDate: Yup.date()
        .min(Yup.ref("pmStartDate"))
        .max(Yup.ref("cEndDate")),
      projectManager: Yup.object().required("Required!"),
      teamMembers: Yup.array()
        .min(1, "Pick at least one team member")
        .of(
          Yup.object().shape({
            label: Yup.string().required(),
            value: Yup.string().required(),
          })
        ),
      orderNum: Yup.string().required("Required!"),
      Rprofit: Yup.number(),
      Pdeduction: Yup.number(),
      // percentage: Yup.string(),
      // fCost: Yup.string(),
      // currency: Yup.object().required("Required!"),
      otherDeduction: Yup.number(),
      phase: Yup.object(),
    });
  };

  handleError(error) {
    console.log(error.message);
  }
}
const projectValidation = new ProjectValidation();
export default projectValidation;
