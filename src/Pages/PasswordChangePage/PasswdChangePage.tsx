import React, { useRef } from "react";
import ReactDOM from "react-dom";
import useForm from "react-hook-form";

import "./styles.css";

function App() {
  const { register, errors, handleSubmit, watch } = useSate({});
  const password = useRef({});
  password.current = watch("password", "");
  const onSubmit = async (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label>Password</label>
      <input
        name="password"
        type="password"
        ref={register({
          required: "You must specify a password",
          minLength: {
            value: 8,
            message: "Password must have at least 8 characters",
          },
        })}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <label>Repeat password</label>
      <input
        name="password_repeat"
        type="password"
        ref={register({
          validate: (value) =>
            value === password.current || "The passwords do not match",
        })}
      />
      {errors.password_repeat && <p>{errors.password_repeat.message}</p>}

      <input type="submit" onClick={handleSubmit(onSubmit)} />
    </form>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
function useSate(arg0: {}): {
  register: any;
  errors: any;
  handleSubmit: any;
  watch: any;
} {
  throw new Error("Function not implemented.");
}
