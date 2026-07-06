import { Header, Footer } from "../site-chrome";
import QuoteForm from "./quote-form";

type QuoteSearchParams = Promise<Record<string, string | string[] | undefined>>;

function getParam(params: Record<string, string | string[] | undefined>, key: string) {
  const value = params[key];
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function QuotePage({
  searchParams,
}: {
  searchParams?: QuoteSearchParams;
}) {
  const params = searchParams ? await searchParams : {};

  return (
    <div className="itz-layout">
      <Header />
      <QuoteForm
        initialService={getParam(params, "service")}
        initialPlan={getParam(params, "plan")}
        initialPrice={getParam(params, "price")}
      />
      <Footer />
    </div>
  );
}
