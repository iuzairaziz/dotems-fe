import * as Yup from "yup";

class TasksValidations {
  newTaskValidation = () => {
    return Yup.object({
      title: Yup.string()
        .required("Required!")
        .min(2)
        .max(20),
      teamLead: Yup.object().required("Required!"),
      assignedTo: Yup.array().required("Required!"),
      project: Yup.object().required("Required!"),
      description: Yup.object().required("Required!"),
      // .max(20, "Your lastname must be less than 20 character"),
      estimatedHrs: Yup.number("Please enter a valid number!").required(
        "Required!"
      ).max(Yup.ref("maxEstHrs", "Max Estimate Hours reached")),
      projectRatio: Yup.number("Please enter a valid number!")
        .required("Required!")
        .min(1),
      startTime: Yup.date().required("Required!").min(Yup.ref("pmStartDate"), "Task start date must be greater then Project Start date"),
      endTime: Yup.date()
        .required("Required!")
        .min(Yup.ref("startTime"), "End date must be grater than start date").max(Yup.ref("pmEndDate"), "Task end date must be lesser then Project's Deadline" ),
      //   projectRatio: Yup.number("Please enter a valid number!").required(
      //     "Required!"
      //   ),
      // parentTask: Yup.required("Required!"),
    });
  };

  handleError(error) {
    console.log(error.message);
  }
}
const tasksValidations = new TasksValidations();
export default tasksValidations;
