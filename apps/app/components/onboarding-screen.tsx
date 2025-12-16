import Link from "next/link";
import Image from "next/image";

export const OnboardingScreen = () => {
  return (
    <div className="font-switzer flex justify-center items-center min-h-screen text-center font-semibold">
      <div className="w-full md:max-w-[390px] mx-auto">
        <div>
          <div className="p-3 h-[55vh] justify-center items-center text-center flex flex-col">
            <h2 className="font-bold text-[1.37rem] mb-[0.9rem] mt-1">
              Eversub
            </h2>
            <div className="flex justify-center space-x-2 items-center">
              <Image
                src="/svg/auth/svg-1.svg"
                width={111}
                height={111}
                alt=""
              />
              <Image src="/svg/auth/svg-2.svg" width={45} height={45} alt="" />
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/svg/auth/svg-3.svg"
                width={230}
                height={230}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center h-[35vh]">
          <div className="space-y-4 flex flex-col items-center w-full">
            <Link
              href="/signup"
              className="font-semibold rounded-3xl text-sm p-3 w-[80%] bg-primary text-white hover:bg-primary/90"
            >
              Create Account
            </Link>
            <Link
              href="/login"
              className="font-semibold rounded-3xl text-sm p-3 w-[80%] border-2 border-primary text-primary hover:bg-primary/20 transition-all"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
