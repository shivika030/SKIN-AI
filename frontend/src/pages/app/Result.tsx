import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertCircle, Check, ShieldCheck } from "lucide-react";

interface TopPrediction {
  label: string;
  score: number;
}

interface ResultProps {
  result: {
    prediction: string;
    confidence: number;
    top_3: TopPrediction[];
    disclaimer: string;
  } | null;
}

const precautions = [
  "Avoid harsh soaps and fragrances",
  "Keep the affected area moisturized",
  "Use lukewarm water when bathing",
  "Avoid scratching affected areas",
];

const formatDiseaseName = (name: string) => {
  return name
    .replace("class0_", "")
    .replace("class1_", "")
    .replace("class2_", "")
    .replace("class3_", "")
    .replace("class4_", "")
    .replace("class5_", "")
    .replace("_", " ");
};

const Result = ({ result }: ResultProps) => {

  if (!result) {
    return (
      <div className="rounded-3xl border bg-card p-10 text-center shadow-elegant">
        <h2 className="text-2xl font-bold">No Result Yet</h2>
        <p className="mt-2 text-muted-foreground">
          Upload a skin image to get prediction results.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">

      <div className="lg:col-span-2 space-y-6">

        <div className="overflow-hidden rounded-3xl border bg-card shadow-elegant">

          <div className="aspect-[16/9] bg-gradient-to-br from-primary/10 via-section to-accent/10" />

          <div className="p-6">

            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
                Detected
              </span>

              <span className="text-xs text-muted-foreground">
                AI skin scan · Live prediction
              </span>
            </div>

            <h2 className="mt-3 font-display text-3xl font-bold">
              {formatDiseaseName(result.prediction)}
            </h2>

            <p className="mt-2 text-muted-foreground">
              This prediction was generated using a ResNet18 deep learning model trained on multiple skin disease categories.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">

              <div className="rounded-2xl border bg-section p-4">
                <div className="text-xs text-muted-foreground">
                  Confidence
                </div>

                <div className="mt-1 font-display text-2xl font-bold text-primary">
                  {(result.confidence * 100).toFixed(1)}%
                </div>
              </div>

              <div className="rounded-2xl border bg-section p-4">
                <div className="text-xs text-muted-foreground">
                  Model
                </div>

                <div className="mt-1 font-display text-2xl font-bold text-secondary">
                  ResNet18
                </div>
              </div>

              <div className="rounded-2xl border bg-section p-4">
                <div className="text-xs text-muted-foreground">
                  Classes
                </div>

                <div className="mt-1 font-display text-2xl font-bold text-accent">
                  6
                </div>
              </div>

            </div>

            <div className="mt-6">

              <h3 className="font-display text-lg font-semibold">
                Top Predictions
              </h3>

              <div className="mt-3 space-y-3">

                {result.top_3.map((item, index) => (

                  <div
                    key={index}
                    className="flex items-center justify-between rounded-2xl border bg-section p-4"
                  >
                    <span className="font-medium">
                      {formatDiseaseName(item.label)}
                    </span>

                    <span className="font-bold text-primary">
                      {(item.score * 100).toFixed(1)}%
                    </span>
                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

        <div className="rounded-3xl border bg-card p-6 shadow-elegant">

          <h3 className="font-display text-lg font-semibold">
            Suggested precautions
          </h3>

          <ul className="mt-4 space-y-3">

            {precautions.map((p) => (

              <li key={p} className="flex items-start gap-3">

                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Check className="h-3.5 w-3.5" />
                </span>

                <span className="text-sm text-muted-foreground">
                  {p}
                </span>

              </li>

            ))}

          </ul>

        </div>

      </div>

      <aside className="space-y-4">

        <div className="rounded-3xl border bg-gradient-primary p-6 text-primary-foreground shadow-premium">

          <h3 className="font-display text-lg font-semibold">
            Ready for your plan?
          </h3>

          <p className="mt-1 text-sm opacity-90">
            Generate a personalized skincare treatment workflow.
          </p>

          <Button
            asChild
            variant="secondary"
            size="lg"
            className="mt-4 w-full rounded-xl"
          >
            <Link to="/app/treatment">
              Generate Treatment Plan
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>

        </div>

        <div className="rounded-3xl border bg-card p-6 shadow-elegant">

          <AlertCircle className="h-6 w-6 text-secondary" />

          <h3 className="mt-3 font-display font-semibold">
            Not a diagnosis
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            {result.disclaimer}
          </p>

        </div>

        <div className="rounded-3xl border bg-card p-6 shadow-elegant">

          <ShieldCheck className="h-6 w-6 text-accent" />

          <h3 className="mt-3 font-display font-semibold">
            AI Model Active
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Real-time CNN inference is enabled successfully.
          </p>

        </div>

      </aside>

    </div>
  );
};

export default Result;