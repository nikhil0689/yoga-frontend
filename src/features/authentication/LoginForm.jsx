import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import { useAuth } from "../../context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

function LoginForm() {
  const queryClient = useQueryClient();
  const { clearSessionData } = useAuth();
  const [userId, setUserId] = useState("aish3095");
  const [password, setPassword] = useState("admin");
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!userId || !password) return;
    login(
      { userId, password },
      {
        onSettled: () => {
          setUserId("");
          setPassword("");
        },
      }
    );
  }

  useEffect(() => {
    queryClient.removeQueries();
    clearSessionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="User ID">
        <Input
          type="text"
          id="userId"
          // This makes this form better for password managers
          autoComplete="username"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </FormRowVertical>

      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button disabled={isLoading} size="large">
          Log in
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
