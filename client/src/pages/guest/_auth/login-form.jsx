import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const LoginFormSchema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
});

export function LoginForm({ navigate, authenticateUser, toast }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(LoginFormSchema),
  });

  const handleLogin = async (data) => {
    const isAuth = await authenticateUser(data);
    if (isAuth === true) {
      navigate("/dashboard");
      toast({ title: `Logged in as ${data.username}` });
    } else {
      setError("backend", { message: isAuth });
    }
  };

  const clearBackendError = () => {
    setError("backend", { message: "" });
  };

  return (
    <form
      className="grid items-start gap-4"
      onSubmit={handleSubmit(handleLogin)}
    >
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          {...register("username")}
          onFocus={clearBackendError}
        />
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          {...register("password")}
          onFocus={clearBackendError}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>
      {errors.backend && (
        <span className="text-red-500">{errors.backend.message}</span>
      )}
      <Button type="submit">Login</Button>
    </form>
  );
}
