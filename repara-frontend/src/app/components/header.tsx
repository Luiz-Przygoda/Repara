import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-[#0e0064] py-2 shadow-md">
      <div className="flex items-center justify-center">
        <Image
          src="/logo2.png" 
          alt="Logo2"
          width={200}
          height={200}
          priority
        />
      </div>
    </header>
  );
}
