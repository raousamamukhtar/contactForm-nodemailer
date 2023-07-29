"use client";
import { useState } from "react";
import { sendContactForm } from "@/app/lib/api";

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initValues: FormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

interface State {
  isLoading: boolean;
  error: string;
  values: FormValues;
}

const initState: State = {
  isLoading: false,
  error: "",
  values: initValues,
};

export default function Home() {
  const [state, setState] = useState<State>(initState);
  const [touched, setTouched] = useState<FormValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const { values, isLoading, error } = state;

  const onBlur = ({
    target,
  }: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

  const onSubmit = async () => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    try {
      console.log("values", values);
      await sendContactForm(values);
      setTouched({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setState(initState);
      // toast({
      //   title: "Message sent.",
      //   status: "success",
      //   duration: 2000,
      //   position: "top",
      // });
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
    }
  };

  return (
    <div className="max-w-450px mt-12 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Contact</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Name */}
      <div className="mb-5">
        <label htmlFor="name" className="block mb-2 text-blue-600">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={`border ${
            touched.name && !values.name ? "border-red-300" : "border-blue-400"
          } px-4 py-2 rounded w-full transition duration-300`}
          value={values.name}
          onChange={handleChange}
          onBlur={onBlur}
        />
        {touched.name && !values.name && (
          <p className="text-red-500 mt-1">Required</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-blue-600">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className={`border ${
            touched.email && !values.email
              ? "border-red-300"
              : "border-blue-400"
          } px-4 py-2 rounded w-full transition duration-300`}
          value={values.email}
          onChange={handleChange}
          onBlur={onBlur}
        />
        {touched.email && !values.email && (
          <p className="text-red-500 mt-1">Required</p>
        )}
      </div>

      {/* Subject */}
      <div className="mb-5">
        <label htmlFor="subject" className="block mb-2 text-blue-600">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          className={`border ${
            touched.subject && !values.subject
              ? "border-red-300"
              : "border-blue-400"
          } px-4 py-2 rounded w-full transition duration-300`}
          value={values.subject}
          onChange={handleChange}
          onBlur={onBlur}
        />
        {touched.subject && !values.subject && (
          <p className="text-red-500 mt-1">Required</p>
        )}
      </div>

      {/* Message */}
      <div className="mb-5">
        <label htmlFor="message" className="block mb-2 text-blue-600">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`border ${
            touched.message && !values.message
              ? "border-red-300"
              : "border-blue-400"
          } px-4 py-2 rounded w-full transition duration-300`}
          value={values.message}
          onChange={handleChange}
          onBlur={onBlur}
        />
        {touched.message && !values.message && (
          <p className="text-red-500 mt-1">Required</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        className={`border ${
          isLoading
            ? "bg-blue-600 text-white cursor-wait"
            : "bg-blue-400 hover:bg-blue-500 text-white cursor-pointer"
        } px-4 py-2 rounded transition duration-300`}
        disabled={
          isLoading ||
          !values.name ||
          !values.email ||
          !values.subject ||
          !values.message
        }
        onClick={onSubmit}
      >
        {isLoading ? "Sending..." : "Submit"}
      </button>
    </div>
  );
}
