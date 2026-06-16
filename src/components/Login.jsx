import Header from "./Header";

const Login = () => {
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/8027eb3f-343a-499d-9892-e683c12e3cb1/web/IE-en-20260608-TRIFECTA-perspective_8be89c0e-d22e-485b-ac7b-0e15972cbea6_large.jpg"
          alt="logo"
        />
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/8027eb3f-343a-499d-9892-e683c12e3cb1/web/IE-en-20260608-TRIFECTA-perspective_8be89c0e-d22e-485b-ac7b-0e15972cbea6_large.jpg"
          alt="logo"
        />
      </div>
      <form className="w-4/12 absolute p-12 bg-black my-90 mx-auto right-0 left-0 text-white opacity-80">
        <h1 className="font-bold text-3xl py-4">Sign In</h1>
        <input
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <button className="p-4 m-4 cursor-pointer bg-red-700 w-full rounded-lg">
          Sign In
        </button>
        <p>New to Netflix? Sign Up Now</p>
      </form>
    </div>
  );
};
export default Login;
