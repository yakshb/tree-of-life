import VisualTreeOfLife from "@/components/TreeOfLife/index";

export default function Home() {
  return (
    <main className="container flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24">
      <h1 className="text-4xl font-semibold tracking-tighter mb-8 text-center">AI-Interactive Tree of Life Explorer</h1>
      <VisualTreeOfLife />
    </main>
  );
}