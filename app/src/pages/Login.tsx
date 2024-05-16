import { useForm } from "@tanstack/react-form";
import { useLogUserIn } from "../hooks/authHooks";
import styled from "@emotion/styled";
import { toast } from "react-hot-toast";
import { useUserStore } from "../hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { colorTheme } from "./constant";

const BackgroundTest = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(${colorTheme.gray.primary});
  border: 8px solid #fff;
  border-radius: 25px;
  font-family: "Balatro";
  color: var(${colorTheme.white.primary});
  gap: 65px;
  width: 80%;
  height: 80%;
`;

const Title = styled.h1`
  font-size: 90px;
`;

const LabelStyle = styled.label`
  font-size: 40px;
  text-transform: capitalize;
`;

const InputStyled = styled.input`
  position: relative;
  background-color: var(${colorTheme.blue.primary});
  border-radius: 20px;
  text-decoration: none;
  font-family: "Balatro";
  font-size: 20px;
  border: none;
  color: #fff;
  height: 45px;
  width: 390px;
  padding: 15px 30px;

  &::before {
    content: "";
    background-color: #171d1f;
    bottom: -25px;
    z-index: -1;
  }
`;

const FormInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 85px;
  margin-bottom: 24px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const ButtonWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: var(${colorTheme.red.secondary});
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  &::hover {
    background-color: var(${colorTheme.red.primary});
  }
`;

const ButtonDropShadowWrapper = styled.button`
  width: 20%;
  height: 50%;
  filter: drop-shadow(-2px 5px 0px var(${colorTheme.gray.secondary}));
  display: flex;
  align-items: center;
  justify-content: center;
  &:active {
    transform: translateY(4px) translateX(4px);
  }
  filter: drop-shadow(0px 0px 0px var(${colorTheme.gray.secondary}));
`;

const ButtonTitle = styled.span`
  color: var(${colorTheme.white.primary});
  font-size: 32px;
  user-select: none;
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
      <Container>
        <Title>Login</Title>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            authForm.handleSubmit();
          }}
        >
          <FormInputContainer>
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
                <InputContainer>
                  <LabelStyle htmlFor={field.name}>{field.name}</LabelStyle>
                  {field.state.meta.errors.length >= 1 && (
                    <p>{field.state.meta.errors}</p>
                  )}
                  <InputStyled
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={field.name}
                  ></InputStyled>
                </InputContainer>
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
                <InputContainer>
                  <LabelStyle htmlFor={field.name}>{field.name}</LabelStyle>
                  {field.state.meta.errors.length >= 1 && (
                    <p>{field.state.meta.errors}</p>
                  )}
                  <InputStyled
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={field.name}
                    type="password"
                  ></InputStyled>
                </InputContainer>
              )}
            ></authForm.Field>
          </FormInputContainer>
          <ButtonDropShadowWrapper type="submit">
            <ButtonWrapper>
              <ButtonTitle>Submit</ButtonTitle>
            </ButtonWrapper>
          </ButtonDropShadowWrapper>
        </form>
      </Container>
    </BackgroundTest>
  );
};
