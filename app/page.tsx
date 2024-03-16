import LoginForm from "@/components/LoginPage/LoginForm";
import Logo from "@/components/Misc/Logo";

export default function Page() {
  return (
    <div className="w-screen h-screen flex flex-row justify-start items-start">
      <div className="w-1/2 h-full flex flex-col items-center justify-center bg-blue-950">
        <Logo size={500} />
      </div>
      <div className="w-1/2 h-full bg-white flex flex-col justify-center items-center">
        <LoginForm />
      </div>
    </div>
  );
}
