import * as Yup from "yup";

class ExpenseValidation {
  newExpenseValidation = () => {
    return Yup.object({
      name: Yup.string()
        .required("Required!")
        .min(2)
        .max(100),
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
const expenseValidation = new ExpenseValidation();
export default expenseValidation;
