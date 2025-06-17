import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl  text-red-500 sm:text-6xl font-bold">
        BookBazaar
      </h1>
      <Button>Get started</Button>
    </div>
  );
}

