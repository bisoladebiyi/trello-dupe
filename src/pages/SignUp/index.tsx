import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Elements/Button";
import { ROUTES } from "../../utils/constants/routes";

const SignUp = () => {
  return (
    <div className="h-full trello-signup display grid place-items-center">
      <section className="w-11/12 md:w-1/2 lg:w-1/3 grid place-items-center bg-white p-10 rounded-md md:shadow">
        <div className="flex items-center space-x-2">
          <figure className="w-7">
            <img
              src="https://assets.stickpng.com/images/58482beecef1014c0b5e4a36.png"
              alt="trello logo"
            />
          </figure>
          <h2 className="font-bold text-3xl">Trello Dupe</h2>
        </div>
        <h5 className="font-bold text-lg mt-[30px]">Sign up to continue</h5>
        <form action="" className="flex flex-col w-full gap-5 mt-5">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 rounded border border-[#DFE1E6] text-sm"
          />
          <input
            type="password"
            name=""
            id=""
            placeholder="Enter your password"
            className="p-2 rounded border border-[#DFE1E6] text-sm"
          />
          <Button text="Sign up" />
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

        <Link to={ROUTES.LOGIN} className="text-blue-600 text-xm mt-6">
          Already have an account? Log in
        </Link>
      </section>
    </div>
  );
};

export default SignUp;
