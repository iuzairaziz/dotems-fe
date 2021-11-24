import * as Yup from "yup";

class ShortValidations {
  leaveTypeValidation = () => {
    return Yup.object({
      name: Yup.string()
        .required("Required!")
        .min(2)
        .max(20),
      number: Yup.number().required("Required!"),
    });
  };
  natureValidation = () => {
    return Yup.object({
      title: Yup.string()
        .required("Required!")
        .min(2)
        .max(20),
    });
  };
  requestTypeValidation = () => {
    return Yup.object({
      title: Yup.string()
        .required("Required!")
        .min(2)
        .max(20),
    });
  };
  employeeTypeValidation = () => {
    return Yup.object({
      title: Yup.string()
        .required("Required!")
        .min(2)
        .max(20),
    });
  };
  departmentValidation = () => {
    return Yup.object({
      title: Yup.string()
        .required("Required!")
        .min(2)
        .max(20),
    });
  };
  requestValidation = () => {
    return Yup.object({
      requestType: Yup.object().required("Required!"),
      description: Yup.object().required("Required!"),
    });
  };

  technologyValidation = () => {
    return Yup.object({
      title: Yup.string()
        .required("Required!")
        .min(2)
        .max(20),
    });
  };

  serviceValidation = () => {
    return Yup.object({
      title: Yup.string()
        .required("Required!")
        .min(2)
        .max(20),
    });
  };
  platformValidation = () => {
    return Yup.object({
      title: Yup.string()
        .required("Required!")
        .min(2)
        .max(20),
    });
  };

  countryValidation = () => {
    return Yup.object({
      title: Yup.string()
        .required("Required!")
        .min(2)
        .max(20),
    });
  };

  clientLabelValidation = () => {
    return Yup.object({
      title: Yup.string()
        .required("Required!")
        .min(2)
        .max(20),
    });
  };

  accessoryValidation = () => {
    return Yup.object({
      title: Yup.string()
        .required("Required!")
        .min(2)
        .max(20),
    });
  };

  statusValidation = () => {
    return Yup.object({
      status: Yup.string()
        .required("Required!")
        .min(2)
        .max(20),
    });
  };

  CurrencyValidation = () => {
    return Yup.object({
      name: Yup.string().required("Required!"),
      exchangeRate: Yup.string(),
    });
  };

  RoleValidation = () => {
    return Yup.object({
      title: Yup.string()
        .required("Required!")
        .min(2)
        .max(20),
    });
  };
  workingDayValidation = () => {
    return Yup.object({
      title: Yup.string()
        .required("Required!")
        .min(2)
        .max(20),
    });
  };
  workingHoursValidation = () => {
    return Yup.object({
      title: Yup.string()
        .required("Required!")
        .min(2)
        .max(20),
      hours: Yup.number().required("Required!"),
    });
  };
  resourceCostValidation = () => {
    return Yup.object({
      title: Yup.string()
        .required("Required!")
        .min(2)
        .max(20),
      cost: Yup.number().required("Required!"),
    });
  };

  workingShiftValidation = () => {
    return Yup.object({
      title: Yup.string()
        .required("Required!")
        .min(2)
        .max(20),

      startTime: Yup.string().required("Required!"),
      endTime: Yup.string().required("Required!"),
      startBreakTime: Yup.string().required("Required!"),
      EndBreakTime: Yup.string().required("Required!"),
    });
  };

  attendanceValidation = () => {
    return Yup.object({
      name: Yup.string()
        .required("Required!")
        .min(2)
        .max(20),
      time: Yup.string().required("Required!"),
      date: Yup.string().required("Required!"),
      //   latitude: Yup.string().required("Required!"),
      //   longitude: Yup.string().required("Required!"),
    });
  };

  handleError(error) {
    console.log(error.message);
  }
}
const shortValidations = new ShortValidations();
export default shortValidations;
