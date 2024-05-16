import { useForm } from "@tanstack/react-form";
import { useRegister } from "../hooks/authHooks";

export const Register = () => {
  const register = useRegister();
  const registerForm = useForm({
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
    onSubmit: ({ value }) => {
      register.mutate(value);
    },
  });

  return (
    <>
      <h1>Register</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          registerForm.handleSubmit();
        }}
      >
        <registerForm.Field
          name="email"
          children={(field) => {
            return (
              <>
                <label htmlFor={field.name}>{field.name}</label>
                <input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={field.name}
                />
              </>
            );
          }}
        />
        <registerForm.Field
          name="username"
          children={(field) => {
            return (
              <>
                <label htmlFor={field.name}>{field.name}</label>
                <input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={field.name}
                />
              </>
            );
          }}
        />

        <registerForm.Field
          name="password"
          children={(field) => {
            return (
              <>
                <label htmlFor={field.name}>{field.name}</label>
                <input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={field.name}
                  type="password"
                />
              </>
            );
          }}
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
};
