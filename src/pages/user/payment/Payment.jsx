import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// Components
import { NavbarCourse } from "../../../assets/components/navbar/NavbarCourse";
import { CardPembayaran } from "../../../assets/components/cards/CardPayment";

// Icons
import { GoArrowLeft } from "react-icons/go";
import { HiArrowCircleRight } from "react-icons/hi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { IoMdInformationCircle } from "react-icons/io";

// Images
import MasterCard from "../../../assets/img/mastercard.webp";
import Visa from "../../../assets/img/visa.webp";
import Amex from "../../../assets/img/amex.webp";
import Paypal from "../../../assets/img/paypal.webp";
import Gopay from "../../../assets/img/Gopay.webp";
import Alfamart from "../../../assets/img/Alfamart.webp";
import Indomaret from "../../../assets/img/Indomaret.webp";
import BCA from "../../../assets/img/BCA.webp";
import BNI from "../../../assets/img/BNI.webp";
import BRI from "../../../assets/img/BRI.webp";
import Cimb from "../../../assets/img/Cimb.webp";
import MandiriBill from "../../../assets/img/MandiriBill.webp";
import Permata from "../../../assets/img/Permata.webp";
import Akulaku from "../../../assets/img/Akulaku.webp";

// Redux Actions
import { postPaymentMidtransAction } from "../../../redux/action/payments/PaymentsAction";
import { getAllCoursesAction } from "../../../redux/action/courses/CoursesAction";
import { getAllEnrollmentsAction } from "../../../redux/action/enrollments/EnrollmentsAction";

// Helper
import {
  showLoadingToast,
  showSuccessToast,
  showErrorToast,
} from "../../../helper/ToastHelper";

// Cookie
import { CookiesKeys, CookieStorage } from "../../../utils/cookie";

export const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { courseId } = useParams();

  const [isProcessing, setIsProcessing] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [virtualAccount, setVirtualAccount] = useState(null);
  const [billPayment, setBillPayment] = useState({
    billerCode: "",
    billKey: "",
  });
  const [paymentCounter, setPaymentCounter] = useState({
    paymentCode: "",
    merchantId: "",
  });
  const [paymentInput, setPaymentInput] = useState({
    methodPayment: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
    bankName: "bca",
    store: "indomaret",
    message: "",
  });
  const [timeRemaining, setTimeRemaining] = useState(null);

  const storeCourses = useSelector((state) => state.courses.courses.courses);
  const storeEnrollments = useSelector(
    (state) => state.enrollments.enrollments,
  );

  const foundEnrollment = storeEnrollments.find(
    (enrollCourse) => enrollCourse.courseId === Number(courseId),
  );

  const filteredCourses = storeCourses.find(
    (course) => Number(course.id) === Number(courseId),
  );

  useEffect(() => {
    getAllData();
    if (!filteredCourses || !filteredCourses.isPremium || foundEnrollment) {
      return navigate("/all-courses");
    }
  }, [dispatch]);

  const getAllData = () => {
    dispatch(getAllEnrollmentsAction());
    dispatch(getAllCoursesAction());
  };

  useEffect(() => {
    if (!location.state) return navigate(`/detail-course/${courseId}`);
    if (!timeRemaining) setTimeRemaining(location.state.time);
    const countdownInterval = setInterval(
      () => setTimeRemaining((prevTime) => prevTime - 1),
      1000,
    );

    return () => {
      clearInterval(countdownInterval);
      if (timeRemaining < 0) window.history.back();
    };
  }, [timeRemaining, setTimeRemaining]);

  const formatTime = (seconds) =>
    `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
      seconds % 60,
    ).padStart(2, "0")}`;

  const handlePaymentMethodClick = (method) => {
    setPaymentInput((prevPaymentInput) => ({
      ...prevPaymentInput,
      methodPayment: prevPaymentInput.methodPayment === method ? "" : method,
    }));
  };

  const handlePaymentInput = (e, field) => {
    const value = e.target.value;

    if (field === "cardNumber") {
      const maxLength = 16;
      const inputValue = value.replace(/\D/g, "");
      const formattedValue =
        inputValue
          .substring(0, maxLength)
          .match(/.{1,4}/g)
          ?.join(" ") || "";
      setPaymentInput((prevPaymentInput) => ({
        ...prevPaymentInput,
        cardNumber: formattedValue,
      }));
    }

    if (field === "cvv") {
      const inputValue = value.replace(/\D/g, "");
      setPaymentInput((prevPaymentInput) => ({
        ...prevPaymentInput,
        cvv: inputValue.substring(0, 3),
      }));
    }

    if (field === "expiryDate") {
      const maxLength = 4;
      const inputValue = value.replace(/\D/g, "");
      const formattedValue =
        inputValue
          .substring(0, maxLength)
          .match(/.{1,2}/g)
          ?.join("/") || "";
      setPaymentInput((prevPaymentInput) => ({
        ...prevPaymentInput,
        expiryDate: formattedValue,
      }));
    }
  };

  const handleInputChange = (e) => {
    setPaymentInput((prevPaymentInput) => ({
      ...prevPaymentInput,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePay = async () => {
    if (isProcessing || !paymentInput.methodPayment) return;
    setIsProcessing(true);

    const loadingToastId = showLoadingToast("Loading...");

    if (paymentInput.methodPayment === "Credit Card") {
      const payment = await dispatch(
        postPaymentMidtransAction(
          {
            methodPayment: paymentInput.methodPayment,
            cardNumber: paymentInput.cardNumber,
            cvv: paymentInput.cvv,
            expiryDate: paymentInput.expiryDate,
          },
          courseId,
        ),
      );
      toast.dismiss(loadingToastId);
      if (!payment) showErrorToast("Payment Failed");
      if (payment) {
        showSuccessToast("Payment Successful");
        CookieStorage.set(CookiesKeys.PaymentSuccess, courseId);
        setTimeout(() => {
          window.location.href = payment.transaction.redirect_url;
        }, 1000);
      }
    }

    if (paymentInput.methodPayment === "Cardless Credit") {
      const payment = await dispatch(
        postPaymentMidtransAction(
          {
            methodPayment: paymentInput.methodPayment,
          },
          courseId,
        ),
      );
      toast.dismiss(loadingToastId);
      if (!payment) showErrorToast("Payment Failed");
      if (payment) {
        showSuccessToast("Payment Successful");
        CookieStorage.set(CookiesKeys.PaymentSuccess, courseId);
        setTimeout(() => {
          window.location.href = payment.transaction.redirect_url;
        }, 1000);
      }
    }

    if (paymentInput.methodPayment === "Gopay") {
      const payment = await dispatch(
        postPaymentMidtransAction(
          {
            methodPayment: paymentInput.methodPayment,
          },
          courseId,
        ),
      );

      if (!payment) showErrorToast("Payment Failed");
      if (payment) {
        showSuccessToast("Payment Successful");
        CookieStorage.set(CookiesKeys.PaymentSuccess, courseId);
        document.body.style.overflow = "hidden";
        setQrCode(payment.transaction.actions[0].url);
      }
    }

    if (
      paymentInput.methodPayment === "Bank Transfer" ||
      paymentInput.methodPayment === "Permata"
    ) {
      const payment = await dispatch(
        postPaymentMidtransAction(
          {
            methodPayment: paymentInput.methodPayment,
          },
          courseId,
        ),
      );

      if (!payment) showErrorToast("Payment Failed");
      if (payment) {
        showSuccessToast("Payment Successful");
        CookieStorage.set(CookiesKeys.PaymentSuccess, courseId);
        document.body.style.overflow = "hidden";
        if (paymentInput.methodPayment === "Bank Transfer") {
          setVirtualAccount(payment.transaction.va_numbers[0].va_number);
        }
        if (paymentInput.methodPayment === "Permata") {
          setVirtualAccount(payment.transaction.permata_va_number);
        }
      }
    }

    if (paymentInput.methodPayment === "Mandiri Bill") {
      const payment = await dispatch(
        postPaymentMidtransAction(
          {
            methodPayment: paymentInput.methodPayment,
          },
          courseId,
        ),
      );

      if (!payment) showErrorToast("Payment Failed");
      if (payment) {
        showSuccessToast("Payment Successful");
        CookieStorage.set(CookiesKeys.PaymentSuccess, courseId);
        document.body.style.overflow = "hidden";
        setBillPayment({
          billerCode: payment.transaction.biller_code,
          billKey: payment.transaction.bill_key,
        });
      }
    }

    if (paymentInput.methodPayment === "Counter") {
      const payment = await dispatch(
        postPaymentMidtransAction(
          {
            methodPayment: paymentInput.methodPayment,
            store: paymentInput.store,
            message: paymentInput.message,
          },
          courseId,
        ),
      );

      if (!payment) showErrorToast("Payment Failed");
      if (payment) {
        showSuccessToast("Payment Successful");
        CookieStorage.set(CookiesKeys.PaymentSuccess, courseId);
        document.body.style.overflow = "hidden";
        setPaymentCounter({
          paymentCode: payment.transaction.payment_code,
          merchantId:
            paymentInput.store === "indomaret"
              ? payment.transaction.merchant_id
              : "",
        });
      }
    }
    setIsProcessing(false);
  };

  const renderBankTransfer = () => {
    if (paymentInput.bankName === "bca") {
      return (
        <>
          <li className="text-sm font-normal">
            Select <span className="font-bold">other transactions</span> on the
            main menu.
          </li>
          <li className="text-sm font-normal">
            Select <span className="font-bold">transfer</span>.
          </li>
          <li className="text-sm font-normal">
            Select to <span className="font-bold">BCA virtual account</span>.
          </li>
          <li className="text-sm font-normal">
            Insert <span className="font-bold">BCA Virtual account number</span>
            .
          </li>
          <li className="text-sm font-normal">
            Insert the <span className="font-bold">payable amount,</span> then{" "}
            <span className="font-bold">confirm</span>.
          </li>
          <li className="text-sm font-normal">Payment completed.</li>
        </>
      );
    }
    if (paymentInput.bankName === "bni") {
      return (
        <>
          <li className="text-sm font-normal">
            Select <span className="font-bold">other</span> on the main menu.
          </li>
          <li className="text-sm font-normal">
            Select <span className="font-bold">transfer</span>.
          </li>
          <li className="text-sm font-normal">
            Select to <span className="font-bold">BNI account</span>.
          </li>
          <li className="text-sm font-normal">
            Insert the <span className="font-bold">payment account number</span>
            .
          </li>
          <li className="text-sm font-normal">
            Insert the <span className="font-bold">payable amount</span> then{" "}
            <span className="font-bold">confirm</span>.
          </li>
          <li className="text-sm font-normal">Payment completed.</li>
        </>
      );
    }
    if (paymentInput.bankName === "bri") {
      return (
        <>
          <li className="text-sm font-normal">
            Select <span className="font-bold">other transactions</span> on the
            main menu.
          </li>
          <li className="text-sm font-normal">
            Select <span className="font-bold">payment</span>.
          </li>
          <li className="text-sm font-normal">
            Select to <span className="font-bold">other</span>.
          </li>
          <li className="text-sm font-normal">
            Insert the <span className="font-bold">BRIVA</span>.
          </li>
          <li className="text-sm font-normal">
            Insert the <span className="font-bold">BRIVA number,</span> then{" "}
            <span className="font-bold">confirm</span>.
          </li>
          <li className="text-sm font-normal">Payment completed.</li>
        </>
      );
    }
    if (paymentInput.bankName === "cimb") {
      return (
        <>
          <li className="text-sm font-normal">
            Select <span className="font-bold">other transactions</span> on the
            main menu.
          </li>
          <li className="text-sm font-normal">
            Select <span className="font-bold">payment</span>.
          </li>
          <li className="text-sm font-normal">
            Select to <span className="font-bold">other</span>.
          </li>
          <li className="text-sm font-normal">
            Insert the <span className="font-bold">Cimb virtual account</span>{" "}
            then <span className="font-bold">confirm</span>.
          </li>
          <li className="text-sm font-normal">Payment completed.</li>
        </>
      );
    }
  };

  const renderCounter = () => {
    if (paymentInput.store === "alfamart") {
      return (
        <>
          <li className="text-sm font-normal">
            Tap <span className="font-bold">Download payment info</span>to get a
            copy of your unique payment details.
          </li>
          <li className="text-sm font-normal">
            Go to the nearest
            <span className="font-bold">Alfamart</span> store near you and
            <span className="font-bold">
              show your barcode/payment code to the cashier
            </span>
            .
          </li>
          <li className="text-sm font-normal">
            The cashier will confirm your transaction details.
          </li>
          <li className="text-sm font-normal">
            Confirm your payment with the cashier.
          </li>
          <li className="text-sm font-normal">
            Once your transaction is successful you'll receive the payment
            confirmation e-mail.
          </li>
          <li className="text-sm font-normal">
            Please keep your Alfamart payment receipt in case you'll need
            further help via support.
          </li>
        </>
      );
    }
    if (paymentInput.store === "indomaret") {
      return (
        <>
          <li className="text-sm font-normal">
            Top <span className="font-bold">Download payment info</span> to get
            a copy of your unique payment details.
          </li>
          <li className="text-sm font-normal">
            If you're going to pay{" "}
            <span className="font-bold">on the counter</span> go to the nearest
            Indomarel store and{" "}
            <span className="font-bold">
              show your payment code/barcode to the cashier
            </span>
            .
          </li>
          <li className="text-sm font-normal">
            The cashier will confirm your transaction details. Once your
            transaction is successful. you'll receive the payment confirmation e
            mail
          </li>
          <li className="text-sm font-normal">
            if you're going to pay via Isaku, open the app and top{" "}
            <span className="font-bold">Bayar</span>.
          </li>
          <li className="text-sm font-normal">
            Choose the merchant you'd like to pay to and enter your{" "}
            <span className="font-bold">payment code</span>.
          </li>
          <li className="text-sm font-normal">
            Tap <span className="font-bold">Selanjutnya</span> and check your
            transaction details.
          </li>
          <li className="text-sm font-normal">
            Tap <span className="font-bold">Bayar sekarang</span> to confirm
            your payment.
          </li>
          <li className="text-sm font-normal">
            Please keep your Indomaret payment receipt in case you'll need
            further help via support
          </li>
        </>
      );
    }
  };

  return (
    <>
      <NavbarCourse />

      {/* First Container */}
      <div className="md:px-30 mt-[5rem] flex justify-center py-3 shadow-lg md:mt-[5rem] lg:mt-[5rem] lg:py-4">
        <div className="w-fit items-center rounded-xl bg-red-500 px-2 py-2 text-center text-base font-semibold text-white sm:px-10 md:px-20 md:text-xl lg:px-48">
          Complete the payment within {formatTime(timeRemaining)}
        </div>
      </div>

      <div className="relative mt-5 flex items-center px-8 text-lg font-bold lg:px-28">
        <GoArrowLeft
          size={30}
          className="absolute cursor-pointer "
          onClick={() => {
            navigate(window.history.back());
          }}
        />
        <p className="pl-10">Back</p>
      </div>

      <div className=" flex flex-col justify-center gap-4 px-8 py-10 pt-4  lg:flex-row lg:gap-0 lg:px-28">
        {/* Payment Method */}
        <div className="flex w-full flex-col gap-4 lg:w-[60%] lg:pr-6">
          {/* Credit Card */}
          <div className="flex flex-col gap-2">
            <button
              className={`${
                paymentInput.methodPayment === "Credit Card"
                  ? "bg-primary"
                  : "bg-slate-950"
              } flex w-full justify-between rounded px-5 py-4 text-xl font-medium text-white`}
              onClick={() => {
                handlePaymentMethodClick("Credit Card");
              }}
            >
              <p>Credit Card</p>
              {paymentInput.methodPayment === "Credit Card" ? (
                <MdKeyboardArrowUp size={25} />
              ) : (
                <MdKeyboardArrowDown size={25} />
              )}
            </button>
            {paymentInput.methodPayment === "Credit Card" && (
              <div className="flex flex-col items-center justify-center gap-5 pt-6">
                <div className="flex w-full justify-center gap-4">
                  <img
                    src={MasterCard}
                    alt="Master Card Logo"
                    width={1}
                    height={1}
                    className="w-[8%] object-contain"
                  />
                  <img
                    src={Visa}
                    alt="Visa Logo"
                    width={1}
                    height={1}
                    className="w-[8%] object-contain"
                  />
                  <img
                    src={Amex}
                    alt="American Express Logo"
                    width={1}
                    height={1}
                    className="w-[8%] object-contain"
                  />
                  <img
                    src={Paypal}
                    alt="Paypal Logo"
                    width={1}
                    height={1}
                    className="w-[8%] object-contain"
                  />
                </div>
                <div className="flex w-[70%] flex-col gap-2">
                  <label htmlFor="cardNumber" className="text-sm font-medium">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    placeholder="4480 0000 0000 0000"
                    className="border-b border-[#D0D0D0] px-1 py-1 outline-none"
                    value={paymentInput.cardNumber}
                    onChange={(e) => handlePaymentInput(e, "cardNumber")}
                  />
                </div>
                <div className="flex w-[70%] flex-col gap-2">
                  <label htmlFor="cardHolder" className="text-sm font-medium">
                    Card Holder Name
                  </label>
                  <input
                    type="text"
                    id="cardHolder"
                    placeholder="Budi Cahyono"
                    className="border-b border-[#D0D0D0] px-1 py-1 outline-none"
                  />
                </div>
                <div className="flex w-[70%] justify-between gap-2">
                  <div className="flex w-[47%] flex-col">
                    <label htmlFor="cvv" className="text-sm font-medium">
                      CVV
                    </label>
                    <input
                      type="number"
                      maxLength={3}
                      id="cvv"
                      placeholder="000"
                      className="border-b border-[#D0D0D0] px-1 py-1 outline-none"
                      onWheel={(e) => e.target.blur()}
                      value={paymentInput.cvv}
                      onChange={(e) => handlePaymentInput(e, "cvv")}
                    />
                  </div>
                  <div className="flex w-[47%] flex-col">
                    <label htmlFor="expiryDate" className="text-sm font-medium">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      placeholder="07/24"
                      className="border-b border-[#D0D0D0] px-1 py-1 outline-none"
                      value={paymentInput.expiryDate}
                      onChange={(e) => handlePaymentInput(e, "expiryDate")}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Gopay */}
          <div className="flex flex-col gap-2">
            <button
              className={`${
                paymentInput.methodPayment === "Gopay"
                  ? "bg-primary"
                  : "bg-slate-950"
              } flex w-full justify-between rounded px-5 py-4 text-xl font-medium text-white`}
              onClick={() => {
                handlePaymentMethodClick("Gopay");
              }}
            >
              <p>Gopay</p>
              {paymentInput.methodPayment === "Gopay" ? (
                <MdKeyboardArrowUp size={25} />
              ) : (
                <MdKeyboardArrowDown size={25} />
              )}
            </button>

            {paymentInput.methodPayment === "Gopay" && (
              <div className="flex flex-col items-center justify-center gap-5 pt-6">
                <div className="flex w-full justify-center gap-4">
                  <img
                    src={Gopay}
                    alt="Gopay Logo"
                    width={1}
                    height={1}
                    className="w-[20%] object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Bank Transfer */}
          <div className="flex flex-col gap-2">
            <button
              className={`${
                paymentInput.methodPayment === "Bank Transfer"
                  ? "bg-primary"
                  : "bg-slate-950"
              } flex w-full justify-between rounded px-5 py-4 text-xl font-medium text-white`}
              onClick={() => {
                handlePaymentMethodClick("Bank Transfer");
              }}
            >
              <p>Bank Transfer</p>
              {paymentInput.methodPayment === "Bank Transfer" ? (
                <MdKeyboardArrowUp size={25} />
              ) : (
                <MdKeyboardArrowDown size={25} />
              )}
            </button>

            {paymentInput.methodPayment === "Bank Transfer" && (
              <div className="flex flex-col items-center justify-center gap-5 pt-6">
                <div className="flex w-full justify-center gap-4">
                  <img
                    src={BCA}
                    alt="BCA Logo"
                    width={1}
                    height={1}
                    className="w-[8%] object-contain"
                  />
                  <img
                    src={BNI}
                    alt="BNI Logo"
                    width={1}
                    height={1}
                    className="w-[8%] object-contain"
                  />
                  <img
                    src={BRI}
                    alt="BRI Logo"
                    width={1}
                    height={1}
                    className="w-[8%] object-contain"
                  />
                  <img
                    src={Cimb}
                    alt="Cimb Logo"
                    width={1}
                    height={1}
                    className="w-[8%] object-contain"
                  />
                </div>
                <div className="flex w-[70%] flex-col gap-2">
                  <label htmlFor="bankName" className="text-[#151515]">
                    Bank Name
                  </label>
                  <select
                    name="bankName"
                    id="bankName"
                    value={paymentInput.bankName}
                    onChange={handleInputChange}
                    className="border-b border-[#D0D0D0] px-1 py-1 outline-none"
                  >
                    <option value="bca">BCA</option>
                    <option value="bni">BNI</option>
                    <option value="bri">BRI</option>
                    <option value="cimb">CIMB</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Mandiri Bill */}
          <div className="flex flex-col gap-2">
            <button
              className={`${
                paymentInput.methodPayment === "Mandiri Bill"
                  ? "bg-primary"
                  : "bg-slate-950"
              } flex w-full justify-between rounded px-5 py-4 text-xl font-medium text-white`}
              onClick={() => {
                handlePaymentMethodClick("Mandiri Bill");
              }}
            >
              <p>Mandiri Bill</p>
              {paymentInput.methodPayment === "Mandiri Bill" ? (
                <MdKeyboardArrowUp size={25} />
              ) : (
                <MdKeyboardArrowDown size={25} />
              )}
            </button>

            {paymentInput.methodPayment === "Mandiri Bill" && (
              <div className="flex flex-col items-center justify-center gap-5 pt-6">
                <div className="flex w-full justify-center gap-4">
                  <img
                    src={MandiriBill}
                    alt="Mandiri Bill Logo"
                    width={1}
                    height={1}
                    className="w-[20%] object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Permata */}
          <div className="flex flex-col gap-2">
            <button
              className={`${
                paymentInput.methodPayment === "Permata"
                  ? "bg-primary"
                  : "bg-slate-950"
              } flex w-full justify-between rounded px-5 py-4 text-xl font-medium text-white`}
              onClick={() => {
                handlePaymentMethodClick("Permata");
              }}
            >
              <p>Permata</p>
              {paymentInput.methodPayment === "Permata" ? (
                <MdKeyboardArrowUp size={25} />
              ) : (
                <MdKeyboardArrowDown size={25} />
              )}
            </button>

            {paymentInput.methodPayment === "Permata" && (
              <div className="flex flex-col items-center justify-center gap-5 pt-6">
                <div className="flex w-full justify-center gap-4">
                  <img
                    src={Permata}
                    alt="Permata Logo"
                    width={1}
                    height={1}
                    className="w-[20%] object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Counter */}
          <div className="flex flex-col gap-2">
            <button
              className={`${
                paymentInput.methodPayment === "Counter"
                  ? "bg-primary"
                  : "bg-slate-950"
              } flex w-full justify-between rounded px-5 py-4 text-xl font-medium text-white`}
              onClick={() => {
                handlePaymentMethodClick("Counter");
              }}
            >
              <p>Counter</p>
              {paymentInput.methodPayment === "Counter" ? (
                <MdKeyboardArrowUp size={25} />
              ) : (
                <MdKeyboardArrowDown size={25} />
              )}
            </button>

            {paymentInput.methodPayment === "Counter" && (
              <div className="flex flex-col items-center justify-center gap-5 pt-6">
                <div className="flex w-full justify-center gap-4">
                  <img
                    src={Indomaret}
                    alt="Indomaret Logo"
                    width={1}
                    height={1}
                    className="w-[15%] object-contain"
                  />
                  <img
                    src={Alfamart}
                    alt="Alfamart Logo"
                    width={1}
                    height={1}
                    className="w-[15%] object-contain"
                  />
                </div>
                <div className="flex w-[70%] flex-col gap-2">
                  <label htmlFor="store" className="text-[#151515]">
                    Store
                  </label>
                  <select
                    name="store"
                    id="store"
                    value={paymentInput.store}
                    onChange={handleInputChange}
                    className="border-b border-[#D0D0D0] px-1 py-1 outline-none"
                  >
                    <option value="indomaret">Indomaret</option>
                    <option value="alfamart">Alfamart</option>
                  </select>
                </div>
                <div className="flex w-[70%] flex-col gap-2">
                  <label htmlFor="message" className="text-[#151515]">
                    Message
                  </label>
                  <input
                    type="text"
                    id="message"
                    placeholder="Input Message Here"
                    className="border-b border-[#D0D0D0] px-1 py-1 outline-none"
                    value={paymentInput.message}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cardless Credit */}
          <div className="flex flex-col gap-2">
            <button
              className={`${
                paymentInput.methodPayment === "Cardless Credit"
                  ? "bg-primary"
                  : "bg-slate-950"
              } flex w-full justify-between rounded px-5 py-4 text-xl font-medium text-white`}
              onClick={() => {
                handlePaymentMethodClick("Cardless Credit");
              }}
            >
              <p>Cardless Credit</p>
              {paymentInput.methodPayment === "Cardless Credit" ? (
                <MdKeyboardArrowUp size={25} />
              ) : (
                <MdKeyboardArrowDown size={25} />
              )}
            </button>

            {paymentInput.methodPayment === "Cardless Credit" && (
              <div className="flex flex-col items-center justify-center gap-5 pt-6">
                <div className="flex w-full justify-center gap-4">
                  <img
                    src={Akulaku}
                    alt="Akulaku Logo"
                    width={1}
                    height={1}
                    className="w-[20%] object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex h-fit w-full flex-col gap-2 rounded-xl border-[1px] border-primary px-6 pb-6 pt-2 shadow-xl focus:outline-none  lg:w-[40%]">
          <div className="flex flex-col items-center text-2xl font-bold">
            Course Payment
          </div>

          {/* Main Content */}
          <div className="mx-auto w-full gap-6 px-0 sm:w-1/2 md:w-full md:px-44 lg:px-0">
            {/* Card Item */}
            <CardPembayaran
              image={filteredCourses?.courseImg}
              category={filteredCourses?.category?.categoryName}
              title={filteredCourses?.courseName}
              author={filteredCourses?.mentor}
            />
          </div>

          {/* Detail Harga */}
          <div className="flex items-center justify-center gap-4 py-3 md:gap-10 lg:gap-6">
            <div className="flex flex-col">
              <div className="text-lg font-bold md:text-2xl lg:text-xl">
                Price
              </div>
              <div className="text-base font-semibold md:text-xl lg:text-lg">
                Rp {filteredCourses?.price}
              </div>
            </div>

            <div className="flex flex-col">
              <div className="text-lg font-bold md:text-2xl lg:text-xl">
                Tax 11%
              </div>
              <div className="text-base font-semibold md:text-xl lg:text-lg">
                Rp {0.11 * filteredCourses?.price}
              </div>
            </div>

            <div className="flex flex-col">
              <div className="text-lg font-bold md:text-2xl lg:text-xl">
                Total Amount
              </div>
              <div className="text-base font-semibold text-primary md:text-xl lg:text-lg">
                Rp {filteredCourses?.price + 0.11 * filteredCourses?.price}
              </div>
            </div>
          </div>

          <div
            className="flex w-full cursor-pointer flex-row items-center justify-center gap-2 rounded-2xl bg-red-500 px-6 py-2 text-white"
            onClick={handlePay}
          >
            <div className="text-center text-lg font-bold">
              Lifetime Access to the Course
            </div>
            <HiArrowCircleRight size={40} />
          </div>
        </div>
      </div>

      {/* Modal QRCODE */}
      {qrCode && (
        <div className="fixed top-0 z-50 flex h-screen w-screen items-center justify-center bg-[#151515] bg-opacity-50">
          <div className="flex max-h-[90vh] w-[90%] flex-col gap-3 overflow-auto rounded-md bg-white px-6 py-4 shadow-sm shadow-white sm:w-[70%] lg:w-[30%]">
            <h1 className="text-center text-xl font-bold">Gopay</h1>
            <img
              src={qrCode}
              alt="QR CODE"
              className="mx-auto w-[60%] border object-contain shadow-md lg:w-[70%] xl:w-[60%]"
            />
            <div className="flex flex-col">
              <h5 className="flex items-center gap-1 text-base font-semibold text-blue-500">
                <IoMdInformationCircle size={18} />
                How to pay
              </h5>
              <ol className="flex list-outside list-decimal flex-col gap-1 px-4">
                <li className="text-sm font-normal">
                  Open your <span className="font-bold">Gojek, Gopay</span> or{" "}
                  <span className="font-bold">Other e-wallet app.</span>
                </li>
                <li className="text-sm font-normal">
                  <span className="font-bold">Scan QRIS</span> on your monitor
                </li>
                <li className="text-sm font-normal">
                  Confirm payment in the app
                </li>
                <li className="text-sm font-normal">Payment Complete</li>
              </ol>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <Link
                to={"/history"}
                onClick={() => (document.body.style.overflow = "auto")}
                className="mx-auto w-fit rounded-xl border border-[#151515] bg-[#151515] px-4 py-2 text-center text-sm text-white hover:bg-opacity-70 md:text-base"
              >
                Check Payment History
              </Link>
              <Link
                to={"/"}
                onClick={() => (document.body.style.overflow = "auto")}
                className="mx-auto w-fit rounded-xl border border-[#151515] bg-white px-4 py-2 text-center text-sm text-[#151515] hover:bg-[#151515] hover:text-white md:text-base"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Modal Virtual Account */}
      {virtualAccount && (
        <div className="fixed top-0 z-50 flex h-screen w-screen items-center justify-center bg-[#151515] bg-opacity-50">
          <div className="flex w-[90%] flex-col gap-3 rounded-md bg-white px-6 py-4 shadow-sm shadow-white sm:w-[60%] lg:w-[30%]">
            <h1 className="text-center text-xl font-bold">Bank Transfer</h1>
            <div className="border border-[#8A8A8A] p-2 text-center">
              <h5 className="text-sm font-semibold">
                Virtual Account {paymentInput.bankName.toLocaleUpperCase()}
              </h5>
              <p className="text-lg tracking-widest">{virtualAccount}</p>
            </div>
            <div className="flex flex-col">
              <h5 className="flex items-center gap-1 text-base font-semibold text-blue-500">
                <IoMdInformationCircle size={18} />
                How to pay
              </h5>
              <ol className="flex list-outside list-decimal flex-col gap-1 px-4">
                {renderBankTransfer()}
              </ol>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <Link
                to={"/history"}
                onClick={() => (document.body.style.overflow = "auto")}
                className="mx-auto w-fit rounded-xl border border-[#151515] bg-[#151515] px-4 py-2 text-center text-sm text-white hover:bg-opacity-70 md:text-base"
              >
                Check Payment History
              </Link>
              <Link
                to={"/"}
                onClick={() => (document.body.style.overflow = "auto")}
                className="mx-auto w-fit rounded-xl border border-[#151515] bg-white px-4 py-2 text-center text-sm text-[#151515] hover:bg-[#151515] hover:text-white md:text-base"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Modal Bill Payment */}
      {(billPayment.billKey || billPayment.billerCode) && (
        <div className="fixed top-0 z-50 flex h-screen w-screen items-center justify-center bg-[#151515] bg-opacity-50">
          <div className="flex w-[90%] flex-col gap-3 rounded-md bg-white px-6 py-4 shadow-sm shadow-white sm:w-[60%] lg:w-[30%]">
            <h1 className="text-center text-xl font-bold">Mandiri Bill</h1>
            <div className="border border-[#8A8A8A] p-2 text-center">
              <h5 className="text-sm font-semibold">Biller Code</h5>
              <p className="text-lg tracking-widest">
                {billPayment.billerCode}
              </p>
            </div>
            <div className="border border-[#8A8A8A] p-2 text-center">
              <h5 className="text-sm font-semibold">Bill Key</h5>
              <p className="text-lg tracking-widest">{billPayment.billKey}</p>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <Link
                to={"/history"}
                onClick={() => (document.body.style.overflow = "auto")}
                className="mx-auto w-fit rounded-xl border border-[#151515] bg-[#151515] px-4 py-2 text-center text-sm text-white hover:bg-opacity-70 md:text-base"
              >
                Check Payment History
              </Link>
              <Link
                to={"/"}
                onClick={() => (document.body.style.overflow = "auto")}
                className="mx-auto w-fit rounded-xl border border-[#151515] bg-white px-4 py-2 text-center text-sm text-[#151515] hover:bg-[#151515] hover:text-white md:text-base"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Modal Counter */}
      {paymentCounter.paymentCode && (
        <div className="fixed top-0 z-50 flex h-screen w-screen items-center justify-center bg-[#151515] bg-opacity-50">
          <div className="gap-3overflow-auto flex max-h-[90vh] w-[70%] flex-col rounded-md bg-white px-6 py-4 shadow-sm shadow-white md:h-auto lg:w-[50%] xl:w-[40%]">
            <h1 className="text-center text-xl font-bold">Counter</h1>
            <div className="border border-[#8A8A8A] p-2 text-center">
              <h5 className="text-sm font-semibold">Payment Code</h5>
              <p className="text-lg tracking-widest">
                {paymentCounter.paymentCode}
              </p>
            </div>
            {paymentCounter.merchantId && (
              <div className="border border-[#8A8A8A] p-2 text-center">
                <h5 className="text-sm font-semibold">Merchant ID</h5>
                <p className="text-lg tracking-widest">
                  {paymentCounter.merchantId}
                </p>
              </div>
            )}
            <div className="flex flex-col">
              <h5 className="flex items-center gap-1 text-base font-semibold text-blue-500">
                <IoMdInformationCircle size={18} />
                How to pay
              </h5>
              <ol className="flex list-outside list-decimal flex-col gap-1 px-4">
                {renderCounter()}
              </ol>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <Link
                to={"/history"}
                onClick={() => (document.body.style.overflow = "auto")}
                className="mx-auto w-fit rounded-xl border border-[#151515] bg-[#151515] px-4 py-2 text-center text-sm text-white hover:bg-opacity-70 md:text-base"
              >
                Check Payment History
              </Link>
              <Link
                to={"/"}
                onClick={() => (document.body.style.overflow = "auto")}
                className="mx-auto w-fit rounded-xl border border-[#151515] bg-white px-4 py-2 text-center text-sm text-[#151515] hover:bg-[#151515] hover:text-white md:text-base"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
