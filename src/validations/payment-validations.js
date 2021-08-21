import * as Yup from "yup";

class PaymentValidation {
  newPaymentValidation = () => {
    return Yup.object({
        recievedAmount: Yup.number().required("Required!"),
        exchangeRate: Yup.number().required("Required!"),
        PaymentRecievedDate: Yup.string().required("Required!"),
      PaymentDescription: Yup.object().required("Required!"),
    });
  };

  handleError(error) {
    console.log(error.message);
  }
}
const paymentValidation = new PaymentValidation();
export default paymentValidation;
