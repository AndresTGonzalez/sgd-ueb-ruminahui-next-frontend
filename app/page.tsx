import LoginForm from "@/components/LoginPage/LoginForm";
import Logo from "@/components/Misc/Logo";

export default function Page() {
  return (
    <div className="w-screen h-screen flex flex-row">
      <div className="hidden lg:block w-1/2 h-full bg-[#0F172A]"></div>
      <div className="lg:w-1/2 h-full bg-white flex flex-col space-y-4 items-center lg:items-center lg:justify-center mt-32 lg:mt-0">
        <Logo size={150} />
        <LoginForm />
      </div>
    </div>
  );
}
