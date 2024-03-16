import Image from "next/image";

export default function Logo({ size }: { size: number }) {
  return (
    <div className="flex justify-center items-center">
      <Image src="/escudo.png" alt="Logo" width={size} height={size} />
    </div>
  );
}
