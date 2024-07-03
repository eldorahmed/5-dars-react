import { useEffect } from "react";
import { Form,Link,} from "react-router-dom"
import FormInput from "./FormInput"
import { useActionData } from "react-router-dom";
import useRegister from "../hooks/useRegister";
import { useLogin } from "../hooks/useLogin";


export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  return { email, password };
};

function Login() {
  const{signIn, isPending:loading}=useLogin()
  const{isPending,registerWithGoogle}=useRegister()
  const loginData = useActionData();

  useEffect(() => {
    if (loginData) {
      signIn(loginData.email,loginData.password);
    }
  }, [loginData]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen w-full">
       <div className=" hidden lg:flex items-center justify-center ">
          <div className="  w-[70%] h-[70%] hidden lg:block bg-center bg-[url('./assets/login.svg')] bg-no-repeat bg-contain"></div>
        </div>
        <div className="bg-[#70cade15] flex justify-center items-center ">
          <Form
            method="post"
            className="flex flex-col gap-5"
          >
            <h1 className="text-center text-xl">Login</h1>
            <FormInput
              name="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
            />
            <FormInput
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
            />
            <div>
              <button  disabled={loading} className="btn bg-[#000000b1] text-white mr-2">
                Login
              </button>
              <button disabled={isPending} onClick={registerWithGoogle}   type="button" className="btn-custom">
                Continue with Google
              </button>
            </div>
            <div>
              <p>
                No Account? No Worries!{" "}
                <Link to="/register" className="link link-accent">
                  Register
                </Link>
              </p>
            </div>
          </Form>
        </div>
    </div>
  )
}

export default Login