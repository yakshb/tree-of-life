import VisualTreeOfLife from "@/components/TreeOfLife";
import Image from "next/image";

export default function Home() {
  return (
    <main className="container flex min-h-screen flex-col items-center justify-between p-24">
      <VisualTreeOfLife />
    </main>
  );
}
