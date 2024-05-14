import { useForm } from "@tanstack/react-form";
import { useLogUserIn } from "../hooks/authHooks";

export const Login = () => {
  console.log(import.meta.env.VITE_API_URL);
  const logUserIn = useLogUserIn();

  const authForm = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    onSubmit: ({ value }) => {
      console.log("onSubmit", value);
      logUserIn.mutate(value, {
        onSuccess: (data) => {
          console.log(data);
        },
      });
    },
  });
  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          authForm.handleSubmit();
        }}
      >
        <div>
          <authForm.Field
            name="username"
            children={(field) => (
              <>
                <label htmlFor={field.name}>{field.name}</label>
                <input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={field.name}
                ></input>
              </>
            )}
          ></authForm.Field>
          <authForm.Field
            name="password"
            children={(field) => (
              <>
                <label htmlFor={field.name}>{field.name}</label>
                <input
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={field.name}
                  type="password"
                ></input>
              </>
            )}
          ></authForm.Field>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
