// client/src/app/page.tsx

async function getMessage() {
  const res = await fetch("http://localhost:4000", { cache: "no-store" });
  const text = await res.text();
  return text;
}

export default async function Home() {
  const message = await getMessage();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-4">Backend'den Gelen Mesaj:</h1>
      <p className="text-lg">{message}</p>
    </main>
  );
}
