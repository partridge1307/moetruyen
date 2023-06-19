"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import { loginSchema } from "@schemas/yup";
import PrimaryButton from "@components/Button/PrimaryButton";

//bug
const onSubmit = async ({ email, password }, actions) => {
  const res = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  console.log(res);

  if (!res.url && res.error !== "SessionRequired") {
    actions.setErrors({ failed: "Thông tin đăng nhập không chính xác" });
    actions.setSubmitting(false);
  } else {
    actions.setStatus({ state: "true" });
    actions.setSubmitting(false);
  }
};

const SignIn = () => {
  const { replace, push } = useRouter();
  const {
    values,
    status,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  if (status?.state) {
    setTimeout(() => {
      push("/");
    }, 5 * 1000);
  }

  return (
    <div className="flex h-full items-center">
      <div className="flex h-full w-full flex-col gap-y-4 text-center md:h-3/4">
        <h1
          className="header_text cursor-pointer max-sm:absolute max-sm:right-1/4 max-sm:top-14 max-sm:text-3xl"
          onClick={() => replace("/")}
        >
          Moetruyen
        </h1>
        <div className="relative flex h-full rounded-xl md:bg-zinc-700">
          <div className="h-full w-full max-sm:absolute max-sm:-z-10 max-sm:blur-[2px] max-sm:brightness-[0.3] md:w-1/2">
            <Image
              src={"/manga/1/thumbnail.jpg"}
              height={0}
              width={0}
              sizes="0%"
              priority
              alt="Cover"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "0.75rem",
              }}
            />
          </div>
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="flex h-full w-full items-center justify-center drop-shadow md:drop-shadow-none"
          >
            <div className="h-fit w-full space-y-8 p-4 md:w-1/2 md:p-0">
              <div className="space-y-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="text-left after:ml-0.5 after:text-red-500 after:content-['*']"
                  >
                    Email
                  </label>
                  {errors.email && touched.email && (
                    <p className="text-left text-red-400">{errors.email}</p>
                  )}
                  <input
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="email"
                    type="email"
                    placeholder="Email tài khoản"
                    className={`rounded-xl border-2 p-2 text-black outline-none focus:border-[#506DE4] ${
                      errors.email && touched.email ? "border-red-600" : ""
                    }`}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="password"
                    className="text-left after:ml-0.5 after:text-red-500 after:content-['*']"
                  >
                    Mật khẩu
                  </label>
                  {errors.password && touched.password && (
                    <p className="text-left text-red-400">{errors.password}</p>
                  )}
                  <input
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Mật khẩu của bạn"
                    className={`rounded-xl border-2 p-2 text-black outline-none focus:border-[#506DE4] ${
                      errors.password && touched.password
                        ? "border-red-600"
                        : ""
                    }`}
                  />
                </div>
              </div>
              <div className="space-y-4">
                {!isSubmitting && errors?.failed && (
                  <p className="text-red-400">{errors.failed}</p>
                )}
                {!isSubmitting && status?.state && (
                  <p className="text-green-400">Chuyển hướng sau 5s</p>
                )}
                <PrimaryButton
                  disabled={isSubmitting}
                  className={"w-full rounded-xl p-3"}
                  type="submit"
                >
                  {isSubmitting ? "Đang đăng nhập" : "Đăng nhập"}
                </PrimaryButton>
                <PrimaryButton
                  disabled={isSubmitting}
                  className={"w-full rounded-xl p-3"}
                  onClick={() => replace("/signUp")}
                >
                  Đăng ký
                </PrimaryButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
