"use client";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Footer from "../components/Footer";
import { loginAction, registerAction } from "../action";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
  error: "",
};

function Page() {
  const isRegister = useSearchParams().get("register");

  const [registerState, registerFormAction] = useFormState(
    registerAction,
    initialState
  );
  const [loginState, loginFormAction] = useFormState(loginAction, initialState);

  return (
    <section className="flex flex-col md:flex-row h-[calc(100vh-56px)]">
      <div className="w-full h-0 md:h-full md:relative">
        <Image
          className="-z-10"
          src="/no-time-to-relax-bg.jpg"
          fill
          alt=""
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          priority
        />
      </div>
      <main className="flex flex-col pt-[25%] items-center h-full w-full md:max-w-[600px] px-8 bg-white bg-opacity-60 relative backdrop-blur-sm md:bg-opacity-100 md:backdrop-blur-none">
        <Tabs
          defaultValue={isRegister ? "register" : "login"}
          className="w-[400px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <form action={loginFormAction}>
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>Login to your account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      name="email"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      name="password"
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 items-start">
                  {loginState?.error ? (
                    <p className=" text-red-600">{loginState.error}</p>
                  ) : null}
                  <Button type="submit">Login</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="register">
            <Card>
              <form action={registerFormAction}>
                <CardHeader>
                  <CardTitle>Register</CardTitle>
                  <CardDescription>
                    Register to create a new account.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" type="text" name="username" required />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" name="email" required />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start">
                  {registerState?.message ? (
                    <p className="text-green-600">{registerState.message}</p>
                  ) : (
                    <Button type="submit">Register</Button>
                  )}
                  {loginState?.error ? (
                    <p className=" text-red-600">{loginState.error}</p>
                  ) : null}
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
        <Footer />
      </main>
    </section>
  );
}

export default Page;
