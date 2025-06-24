import { useState } from "react";

type Props = {
  isLogin: boolean;
  error: string;
  onSubmit: (email: string, password: string) => void;
};

export default function AuthForm({ isLogin, onSubmit, error }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = () => {
    onSubmit(email, password );
  };

  return (
    <div className="flex justify-center items-center mt-16 ">
      {isLogin}
      <div className="bg-white p-6 rounded shadow-md space-y-4 w-80">
        <h1 className="text-2xl font-bold text-center">Zaloguj się</h1>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <div className="space-y-4">
          <div className="relative w-full">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pt-4 px-3 border  rounded text-base md:text-lg focus:outline-none bg-background-gray
                     text-black peer focus:border-background-main focus:ring-1 focus:ring-background-main border-gray-500`}
            />
            <label
              htmlFor="Email"
              className={`absolute left-3 top-1 text-xs md:text-sm text-gray-600 peer-focus:text-background-main `}
            >
              Email
            </label>
          </div>
          <div className="relative w-full">
            <input
              id="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full pt-4 px-3 border  rounded text-base md:text-lg focus:outline-none bg-background-gray
                     text-black peer focus:border-background-main focus:ring-1 focus:ring-background-main border-gray-500`}
            />
            <label
              htmlFor="Password"
              className={`absolute left-3 top-1 text-xs md:text-sm text-gray-600 peer-focus:text-background-main`}
            >
              Password
            </label>
          </div>

          <button
            onClick={submitHandler}
            className="w-full bg-background-main text-white py-2 rounded hover:bg-[#73ae3a]"
          >
            Zaloguj się
          </button>
        </div>
      </div>
    </div>
  );
}
