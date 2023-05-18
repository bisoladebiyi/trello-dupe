import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Elements/Button";
import { ROUTES } from "../../utils/constants/routes";
import { IAuth } from "../../utils/interfaces/interfaces";

const Auth:React.FC<IAuth> = ({ type }) => {
  return (
    <div className="h-full trello-auth display grid place-items-center">
      <section className="w-11/12 md:w-1/2 lg:w-1/3 grid place-items-center bg-white p-10 rounded-md md:shadow">
        <div className="flex items-center space-x-2">
          <figure className="w-7">
            <img
              src="https://seeklogo.com/images/T/trello-logo-CE7B690E34-seeklogo.com.png"
              alt="trello logo"
            />
          </figure>
          <h2 className="font-bold text-3xl">Trello Dupe</h2>
        </div>
        <h5 className="font-bold text-lg mt-[30px]">{ type === 'login' ? 'Log in' : 'Sign up'  } to continue</h5>
        <form action="" className="flex flex-col w-full gap-5 mt-5">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 rounded border-[1.5px] border-[#DFE1E6] text-sm focus:border-[#4C9AFF] transition-colors outline-none"
          />
          <input
            type="password"
            name=""
            id=""
            placeholder="Enter your password"
            className="p-2 rounded border-[1.5px] border-[#DFE1E6] text-sm focus:border-[#4C9AFF] transition-colors outline-none"
          />
         { type !== 'login' && <input
            type="password"
            name=""
            id=""
            placeholder="Confirm password"
            className="p-2 rounded border-[1.5px] border-[#DFE1E6] text-sm focus:border-[#4C9AFF] transition-colors outline-none"
          />} 
          <Button text={ type === 'login' ? "Log In" : "Sign up"} />
        </form>

        <p className="text-gray-400 text-xs my-6">OR</p>

        <button className="flex items-center justify-between w-full rounded shadow-custom bg-white p-2.5 font-bold text-gray-900 text-sm">
          <span>
            <img
              src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.438/static/media/google-logo.e086107b.svg"
              className="w-[18px]"
              alt="google logo"
            />
          </span>
          <span>Continue with Google</span>
          <span className="w-4" />
        </button>

        <Link to={type === 'login' ? ROUTES.SIGNUP : ROUTES.LOGIN} className="text-blue-600 text-xm mt-6">
          { type === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
        </Link>
      </section>
    </div>
  );
};

export default Auth;
