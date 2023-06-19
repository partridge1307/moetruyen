import * as yup from "yup";

const pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
// min 8 characters, 1 Uppercase letter, 1 Lowercase letter, 1 numeric digit

const usrNameRegex = /^(?=[a-zA-Z0-9]{5,12}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
// in 5 to 12 characters, no _ or . in begining, middle and in the end

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Vui lòng điền email")
    .required("Không được bỏ trống"),
  password: yup
    .string()
    .min(8, "Mật khẩu phải tối thiểu 8 kí tự")
    .matches(pwdRegex, {
      message: "Mật khẩu có chứa ít nhất một chữ in hoa, in thường và số",
    })
    .required("Không được bỏ trống"),
});

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Vui lòng điền email")
    .required("Không được bỏ trống"),
  username: yup
    .string()
    .min(5, "Tên người dùng phải tối thiểu 5 kí tự")
    .max(12, "Tên người dùng tối đa 12 kí tự")
    .matches(usrNameRegex, {
      message: "Tên người dùng chỉ có in hoa, in thường hoặc số",
    })
    .required("Không được bỏ trống"),
  password: yup
    .string()
    .min(8, "Mật khẩu phải tối thiểu 8 kí tự")
    .matches(pwdRegex, {
      message: "Mật khẩu có chứa ít nhất một chữ in hoa, in thường và số",
    })
    .required("Không được bỏ trống"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu phải giống nhau")
    .required("Không được bỏ trống"),
});
