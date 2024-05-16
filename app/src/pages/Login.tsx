import { useForm } from "@tanstack/react-form";
import { useLogUserIn } from "../hooks/authHooks";
import styled from "@emotion/styled";
import { toast } from "react-hot-toast";
import { useUserStore } from "../hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";

const BackgroundTest = styled.div`
  background-color: aliceblue;
`;

export const Login = () => {
  const logUserIn = useLogUserIn();
  const navigate = useNavigate();
  const { setToken } = useUserStore();

  const authForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ value }) => {
      logUserIn.mutate(value, {
        onSuccess: (data) => {
          toast.success("Logged in");
          setToken(data.token as string);
          navigate({ to: "/" });
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    },
  });
  return (
    <BackgroundTest>
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
            name="email"
            validators={{
              onSubmit: (value) => {
                console.log("onBlur", value);
                if (!value.value) return "Email is required";
                if (!value.value.includes("@")) return "Email is invalid";
              },
            }}
            children={(field) => (
              <>
                <label htmlFor={field.name}>{field.name}</label>
                {field.state.meta.errors.length >= 1 && (
                  <p>{field.state.meta.errors}</p>
                )}
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
            validators={{
              onSubmit: ({ value }) => {
                if (!value) return "Password is required";
                if (value.length < 12)
                  return "Password must be at least 12 characters";
              },
            }}
            children={(field) => (
              <>
                <label htmlFor={field.name}>{field.name}</label>
                {field.state.meta.errors.length >= 1 && (
                  <p>{field.state.meta.errors}</p>
                )}
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
    </BackgroundTest>
  );
};
