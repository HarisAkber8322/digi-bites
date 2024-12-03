
import Text from "../../UI/Text";
import MainStoreContext from "../../../store/Mainstore";
import { observer } from "mobx-react";
import Link from "next/link";
import { useContext, useState } from "react";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const MainStore = useContext(MainStoreContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    MainStore.handleForgotPassword(email);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[400px] h-fit mx-auto p-6 rounded-lg shadow-lg bg-white"
    >
      <Text
        themeDivClasses="font-bold text-xl flex justify-center mb-8"
        content={<>FORGOT PASSWORD</>}
      />
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-lightGray rounded-md shadow-sm focus:outline-none focus:themeOrange focus:border-themeOrange sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-themeYellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Reset Password
      </button>
      <div className="mt-4 flex justify-between text-sm">
        <Link href="/login" className="text-themeOrange hover:underline">
          Back to Login
        </Link>
      </div>
    </form>
  );
};

export default observer(ForgotPasswordForm);
