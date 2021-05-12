import * as Yup from "yup";

class TimesheetValidations {
  timesheetValidation = () => {
    return Yup.object({
      task: Yup.object().required("Required Field!"),
      project: Yup.object().required("Required!"),
      remarks: Yup.string().required("Required Field!"),
      workedHrs: Yup.number().required("Required Field!"),
      date: Yup.date().required("Required Field!"),
    });
  };

  handleError(error) {
    console.log(error.message);
  }
}
const timesheetValidations = new TimesheetValidations();
export default timesheetValidations;
