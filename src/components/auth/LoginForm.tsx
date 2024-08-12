"use client";
import { login } from "@/actions/auth/loginAction";
import { LoginFormType, loginSchema } from "@/schema/auth/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FieldErrors, useFieldArray, useForm } from "react-hook-form";

function LoginForm() {
  const form = useForm<LoginFormType>({
    defaultValues: {
      email: "admin@bazar.com",
      password: "Mirwais@786",
    },
    resolver: zodResolver(loginSchema),
  });

  const {
    register,
    handleSubmit,
    formState,
    reset,
  } = form;
  const {
    errors,
    isSubmitting,
    isValid,
    isSubmitSuccessful,
  } = formState;

  const fieldErrors = (errors: FieldErrors<LoginFormType>) => {
    console.log("errors", errors);
  };

  const onSubmit = (formData: LoginFormType) => {
    const { email, password } = formData;

    login({ email, password });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="flex flex-col gap-4">
      <form
        onSubmit={handleSubmit(onSubmit, fieldErrors)}
        className="flex flex-col gap-4"
        noValidate
      >
        <div className="form-control flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded px-3 py-2"
            id="email"
            {...register("email", {
              required: { value: true, message: "Email is required." },
            })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* password */}
        <div className="form-control flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="********"
            className="border border-gray-300 rounded px-3 py-2"
            id="password"
            {...register("password")}
          />

          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="flex gap-4">
          {/* submit button */}
          <button
            disabled={!isValid  || isSubmitting}
            type="submit"
            className="bg-blue-500 text-white rounded px-3 py-2 disabled:bg-blue-300"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
