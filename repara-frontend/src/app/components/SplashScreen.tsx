import Image from "next/image";

export default function SplashScreen() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-[#0e0064]">
      <Image
        src="/logo1.png"
        alt="Logo1"
        width={700} 
        height={700}
        priority
      />
    </div>
  );
}
