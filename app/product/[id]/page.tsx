import ProductClient from "./ProductClient";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <main className="flex-grow pt-24 bg-background">
      <ProductClient id={id} />
    </main>
  );
}
