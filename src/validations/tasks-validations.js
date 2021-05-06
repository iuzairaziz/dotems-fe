import * as Yup from "yup";

class TasksValidations {
  newTaskValidation = () => {
    return Yup.object({
      title: Yup.string()
        .required("Required!")
        .min(2)
        .max(20),
      project: Yup.string().required(),
      // .max(20, "Your lastname must be less than 20 character"),
      estimatedHrs: Yup.number("Please enter a valid number!").required(
        "Required!"
      ),
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
