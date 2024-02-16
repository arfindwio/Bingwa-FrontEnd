import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// Components
import { NavbarCourse } from "../../../assets/components/navbar/NavbarCourse";
import { CardPembayaran } from "../../../assets/components/cards/CardPayment";

// Icons
import { GoArrowLeft } from "react-icons/go";
import { GoChevronDown } from "react-icons/go";
import { GoChevronUp } from "react-icons/go";
import { HiArrowCircleRight } from "react-icons/hi";

// Images
import mastercard from "../../../assets/img/mastercard.webp";
import visa from "../../../assets/img/visa.webp";
import amex from "../../../assets/img/amex.webp";
import paypal from "../../../assets/img/paypal.webp";
import bca from "../../../assets/img/BCA.webp";
import bni from "../../../assets/img/BNI.webp";
import bri from "../../../assets/img/BRI.webp";
import mandiri from "../../../assets/img/MANDIRI.webp";
import gopay from "../../../assets/img/Gopay.webp";
import permata from "../../../assets/img/Permata.webp";
import alfamart from "../../../assets/img/ALFAMART.webp";
import indomaret from "../../../assets/img/INDOMARET.webp";

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

  const [newMethodPayment, setNewMethodPayment] = useState("");
  const [newCardNumber, setNewCardNumber] = useState("");
  const [newCardHolderName, setNewCardHolderName] = useState("");
  const [newCvv, setNewCvv] = useState("");
  const [newExpiryDate, setNewExpiryDate] = useState("");
  const [newBankName, setNewBankName] = useState("");
  const [newStore, setNewStore] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const [timeRemaining, setTimeRemaining] = useState(null);

  const storeCourses = useSelector((state) => state.courses.courses.courses);
  const storePaymentMidtrans = useSelector(
    (state) => state.payments.paymentMidtrans.transaction,
  );
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

  // Handle Payment
  const handlePayment = async () => {
    const loadingToastId = showLoadingToast("Loading...");

    const payment = await dispatch(
      postPaymentMidtransAction(
        {
          methodPayment: newMethodPayment,
          ...(newMethodPayment === "Credit Card"
            ? {
                cardNumber: newCardNumber.replace(/\s/g, ""),
                cvv: newCvv,
                expiryDate: newExpiryDate,
              }
            : newMethodPayment === "Bank Transfer"
              ? {
                  bankName: newBankName,
                }
              : newMethodPayment === "Counter"
                ? {
                    store: newStore,
                    message: newMessage,
                  }
                : {}),
        },
        courseId,
      ),
    );

    toast.dismiss(loadingToastId);

    if (!payment) showErrorToast("Payment Failed!!!");

    if (payment) {
      showSuccessToast("Payment Success...!!!");
      CookieStorage.set(CookiesKeys.PaymentSuccess, "payment success");
      setTimeout(() => {
        if (storePaymentMidtrans) {
          window.location.href = storePaymentMidtrans.redirect_url;
        }
      }, 1000);
    }
  };

  const handlePaymentMethodClick = (method) => {
    setNewMethodPayment((prevMethod) => (prevMethod === method ? "" : method));
  };

  const handleCardNumberChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    const formattedValue = formatCardNumber(inputValue);
    setNewCardNumber(formattedValue);
  };

  const formatCardNumber = (value) => {
    const maxLength = 16;
    const formattedValue = value
      .substring(0, maxLength)
      .match(/.{1,4}/g)
      ?.join(" ");
    return formattedValue || "";
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setNewCvv(value.substring(0, 3));
  };

  const handleExpiryDateChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    const formattedValue = formatExpiryDate(inputValue);
    setNewExpiryDate(formattedValue);
  };

  const formatExpiryDate = (value) => {
    const maxLength = 4;
    const formattedValue = value
      .substring(0, maxLength)
      .match(/.{1,2}/g)
      ?.join("/");
    return formattedValue || "";
  };

  const formatTime = (seconds) =>
    `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
      seconds % 60,
    ).padStart(2, "0")}`;

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
        <div className="flex flex-col gap-2 lg:w-[60%] lg:pr-6">
          <div className="flex flex-col">
            <div
              className={`flex cursor-pointer items-center rounded-xl py-4 text-xl text-white ${
                newMethodPayment === "Bank Transfer"
                  ? "bg-primary"
                  : "bg-slate-950"
              }`}
              onClick={() => {
                handlePaymentMethodClick("Bank Transfer");
              }}
            >
              <div className="flex w-full items-center justify-between px-4">
                <div className="font-semibold">Bank Transfer</div>
                <div>
                  {newMethodPayment === "Bank Transfer" ? (
                    <GoChevronUp />
                  ) : (
                    <GoChevronDown />
                  )}
                </div>
              </div>
            </div>

            <div
              className={`flex w-full flex-col gap-4 rounded-xl px-4 py-8 shadow-lg ${
                newMethodPayment === "Bank Transfer" ? "block" : "hidden"
              }`}
            >
              <div className="flex items-center justify-center gap-4 px-32">
                <div className="flex items-center">
                  <img src={bca} className="" alt="BCA" />
                </div>
                <div className="flex items-center">
                  <img src={bni} className="" alt="BNI" />
                </div>
                <div className="flex items-center">
                  <img src={bri} className="" alt="BRI" />
                </div>
                <div className="flex items-center">
                  <img src={mandiri} className="" alt="Mandiri" />
                </div>
              </div>
              <div className="mx-auto w-full px-20 pt-4">
                <div className="flex flex-col text-start">
                  <span className="text-xl font-semibold">Bank Name</span>
                  <input
                    type="text"
                    className="mt-1 appearance-none border-b-[3px] px-2 py-2 text-xl tracking-widest focus:outline-none"
                    placeholder="BCA"
                    value={newBankName}
                    onChange={(e) => {
                      setNewBankName(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div
              className={` flex cursor-pointer items-center justify-between rounded-xl px-4 py-4 text-xl text-white ${
                newMethodPayment === "Credit Card"
                  ? "bg-primary"
                  : "bg-slate-950"
              }`}
              onClick={() => {
                handlePaymentMethodClick("Credit Card");
              }}
            >
              <div className="font-semibold">Credit Card</div>
              <div>
                {newMethodPayment === "Credit Card" ? (
                  <GoChevronUp />
                ) : (
                  <GoChevronDown />
                )}
              </div>
            </div>

            <div
              className={`flex w-full flex-col gap-4 rounded-xl px-4 py-8 shadow-lg ${
                newMethodPayment === "Credit Card" ? "block" : "hidden"
              }`}
            >
              <div className="flex  items-center justify-center gap-4 px-48">
                <div className="flex-1 items-center">
                  <img src={mastercard} className="" alt="Master Card" />
                </div>
                <div className="flex-1 items-center">
                  <img src={visa} className="" alt="Visa" />
                </div>
                <div className="flex-1 items-center">
                  <img src={amex} className="" alt="American Express" />
                </div>
                <div className="flex-1 items-center">
                  <img src={paypal} className="" alt="PayPal" />
                </div>
              </div>
              <div className="mx-auto w-full px-20 pt-4">
                <div className="flex flex-col text-start">
                  <span className="text-xl font-semibold">Card Number</span>
                  <input
                    type="text"
                    className="mt-1 appearance-none border-b-[3px] px-2 py-2 text-xl tracking-widest focus:outline-none"
                    placeholder="4811 1111 1111 1114"
                    value={newCardNumber}
                    onChange={handleCardNumberChange}
                  />
                </div>
                <div className="mt-8 flex flex-col text-start">
                  <span className="text-xl font-semibold">
                    Card Holder Name
                  </span>
                  <input
                    type="text"
                    className="mt-1 border-b-[3px] px-2 py-2 text-xl focus:outline-none"
                    placeholder="Budi Cahyono"
                    value={newCardHolderName}
                    onChange={(e) => {
                      setNewCardHolderName(e.target.value);
                    }}
                  />
                </div>
                <div className="flex w-full gap-2 ">
                  <div className="mt-8 flex w-full flex-col text-start">
                    <span className="text-xl font-semibold">CVV</span>
                    <input
                      type="number"
                      className="mt-1 border-b-[3px] px-2 py-2 text-xl tracking-widest focus:outline-none"
                      placeholder="123"
                      value={newCvv}
                      onChange={handleCvvChange}
                    />
                  </div>
                  <div className="mt-8 flex w-full flex-col text-start">
                    <span className="text-xl font-semibold">Expiry date</span>
                    <input
                      type="text"
                      className="mt-1 border-b-[3px] px-2 py-2 text-xl tracking-widest focus:outline-none"
                      placeholder="02/25"
                      value={newExpiryDate}
                      onChange={handleExpiryDateChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div
              className={` flex cursor-pointer items-center justify-between rounded-xl px-4 py-4 text-xl text-white ${
                newMethodPayment === "Mandiri Bill"
                  ? "bg-primary"
                  : "bg-slate-950"
              }`}
              onClick={() => {
                handlePaymentMethodClick("Mandiri Bill");
              }}
            >
              <div className="font-semibold">Mandiri Bill</div>
              <div>
                {newMethodPayment === "Mandiri Bill" ? (
                  <GoChevronUp />
                ) : (
                  <GoChevronDown />
                )}
              </div>
            </div>

            <div
              className={`flex w-full flex-col gap-4 rounded-xl px-4 py-8 shadow-lg ${
                newMethodPayment === "Mandiri Bill" ? "block" : "hidden"
              }`}
            >
              <div className="flex  items-center justify-center gap-4 px-60">
                <div className="flex-1 items-center">
                  <img src={mandiri} className="" alt="Mandiri Bill" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div
              className={` flex cursor-pointer items-center justify-between rounded-xl px-4 py-4 text-xl text-white ${
                newMethodPayment === "Permata" ? "bg-primary" : "bg-slate-950"
              }`}
              onClick={() => {
                handlePaymentMethodClick("Permata");
              }}
            >
              <div className="font-semibold">Permata</div>
              <div>
                {newMethodPayment === "Permata" ? (
                  <GoChevronUp />
                ) : (
                  <GoChevronDown />
                )}
              </div>
            </div>

            <div
              className={`flex w-full flex-col gap-4 rounded-xl px-4 py-8 shadow-lg ${
                newMethodPayment === "Permata" ? "block" : "hidden"
              }`}
            >
              <div className="flex  items-center justify-center gap-4 px-60">
                <div className="flex-1 items-center">
                  <img src={permata} className="" alt="Permata" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div
              className={` flex cursor-pointer items-center justify-between rounded-xl px-4 py-4 text-xl text-white ${
                newMethodPayment === "Gopay" ? "bg-primary" : "bg-slate-950"
              }`}
              onClick={() => {
                handlePaymentMethodClick("Gopay");
              }}
            >
              <div className="font-semibold">Gopay</div>
              <div>
                {newMethodPayment === "Gopay" ? (
                  <GoChevronUp />
                ) : (
                  <GoChevronDown />
                )}
              </div>
            </div>

            <div
              className={`flex w-full flex-col gap-4 rounded-xl px-4 py-8 shadow-lg ${
                newMethodPayment === "Gopay" ? "block" : "hidden"
              }`}
            >
              <div className="flex  items-center justify-center gap-4 px-60">
                <div className="flex-1 items-center">
                  <img src={gopay} className="" alt="PayPal" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div
              className={`flex cursor-pointer items-center rounded-xl py-4 text-xl text-white ${
                newMethodPayment === "Counter" ? "bg-primary" : "bg-slate-950"
              }`}
              onClick={() => {
                handlePaymentMethodClick("Counter");
              }}
            >
              <div className="flex w-full items-center justify-between px-4">
                <div className="font-semibold">Counter</div>
                <div>
                  {newMethodPayment === "Counter" ? (
                    <GoChevronUp />
                  ) : (
                    <GoChevronDown />
                  )}
                </div>
              </div>
            </div>

            <div
              className={`flex w-full flex-col gap-4 rounded-xl px-4 py-8 shadow-lg ${
                newMethodPayment === "Counter" ? "block" : "hidden"
              }`}
            >
              <div className="flex items-center justify-center gap-4 px-40">
                <div className="flex items-center">
                  <img src={alfamart} className="" alt="Alfamart" />
                </div>
                <div className="flex items-center">
                  <img src={indomaret} className="" alt="Indomaret" />
                </div>
              </div>
              <div className="mx-auto flex w-full flex-col gap-2 px-20 pt-4">
                <div className="flex flex-col text-start">
                  <span className="text-xl font-semibold">Store</span>
                  <input
                    type="text"
                    className="mt-1 appearance-none border-b-[3px] px-2 py-2 text-xl tracking-widest focus:outline-none"
                    placeholder="Alfamart"
                    value={newStore}
                    onChange={(e) => {
                      setNewStore(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col text-start">
                  <span className="text-xl font-semibold">Message</span>
                  <input
                    type="text"
                    className="mt-1 appearance-none border-b-[3px] px-2 py-2 text-xl tracking-widest focus:outline-none"
                    placeholder="I want to make a payment for order"
                    value={newMessage}
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-fit w-fit flex-col gap-2 rounded-xl border-[1px] border-primary px-6 pb-6 pt-2 shadow-xl focus:outline-none md:w-auto lg:w-[40%]">
          <div className="flex flex-col items-center text-2xl font-bold">
            Course Payment
          </div>

          {/* Main Content */}
          <div className="w-full gap-6 px-0 md:px-44 lg:px-0">
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
                Rp{" "}
                {!filteredCourses?.promotion
                  ? filteredCourses?.price
                  : filteredCourses?.price -
                    filteredCourses?.promotion?.discount *
                      filteredCourses?.price}
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
                Rp{" "}
                {filteredCourses?.price -
                  filteredCourses?.promotion?.discount *
                    filteredCourses?.price +
                  0.11 * filteredCourses?.price}
              </div>
            </div>
          </div>

          <div
            className="flex w-full cursor-pointer flex-row items-center justify-center gap-2 rounded-2xl bg-red-500 px-6 py-2 text-white"
            onClick={handlePayment}
          >
            <div className="text-center text-lg font-bold">
              Lifetime Access to the Course
            </div>
            <HiArrowCircleRight size={40} />
          </div>
        </div>
      </div>
    </>
  );
};
