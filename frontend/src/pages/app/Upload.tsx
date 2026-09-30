import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  UploadCloud,
  Image as ImageIcon,
  X,
  Sparkles,
  ShieldCheck,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

interface PredictionItem {
  label: string;
  score: number;
}

interface PredictionResponse {
  prediction: string;
  confidence: number;
  top_3: PredictionItem[];
  disclaimer: string;
}

const formatDiseaseName = (name: string) => {
  return name
    .replace(/^class\d_/, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

const conditionInfo: Record<string, string> = {
  class0_normal: "No significant skin concerns were detected in this image.",
  class1_acne: "A common condition where hair follicles become clogged with oil and dead skin, causing pimples and blackheads.",
  class2_wrinkles: "Visible lines or creases that commonly develop as skin changes with age and environmental exposure.",
  class3_Eczema: "A chronic condition that causes inflamed, itchy, and dry patches of skin.",
  class4_Rosacea: "A condition causing redness and visible blood vessels, typically on the face.",
  class5_dark_spots: "Patches of skin that appear darker than the surrounding area, often from sun exposure or aging.",
};

const skincareTipsByCondition: Record<string, string[]> = {
  class0_normal: [
    "Use sunscreen daily, even on cloudy days.",
    "Keep skin moisturized to maintain its barrier.",
    "Stick to a gentle, consistent skincare routine.",
    "Stay hydrated and get enough sleep.",
  ],
  class1_acne: [
    "Use a gentle, non-comedogenic cleanser twice a day.",
    "Avoid touching or picking at the affected area.",
    "Look for products with salicylic acid or benzoyl peroxide.",
    "Change pillowcases regularly to reduce bacteria buildup.",
  ],
  class2_wrinkles: [
    "Use sunscreen daily — UV exposure accelerates wrinkle formation.",
    "Consider a retinoid-based product (consult a dermatologist first).",
    "Keep skin well-moisturized to improve elasticity.",
    "Avoid smoking, which breaks down collagen.",
  ],
  class3_Eczema: [
    "Use fragrance-free, hypoallergenic moisturizers.",
    "Moisturize immediately after bathing to lock in hydration.",
    "Use lukewarm, not hot, water when washing.",
    "Identify and avoid personal triggers (certain fabrics, soaps, stress).",
  ],
  class4_Rosacea: [
    "Avoid known triggers like spicy food, alcohol, and extreme temperatures.",
    "Use gentle, fragrance-free skincare products.",
    "Apply broad-spectrum sunscreen daily.",
    "Avoid hot showers and harsh scrubbing.",
  ],
  class5_dark_spots: [
    "Use sunscreen daily to prevent further darkening.",
    "Avoid picking at skin, which can worsen pigmentation.",
    "Consider products with vitamin C or niacinamide.",
    "Be patient — pigmentation changes take weeks to months to fade.",
  ],
};

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Analyzing image...");
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (f: File) => {
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
    setResult(null);
    setError(null);
  };

  const clearImage = () => {
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
  };

  const startScan = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setLoadingMessage("Analyzing image...");

    const slowWarningTimer = setTimeout(() => {
      setLoadingMessage("Waking up the server — this can take up to a minute on first use...");
    }, 5000);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Backend prediction failed.");
      }

      const data: PredictionResponse = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while analyzing the image. Please try again.");
    } finally {
      clearTimeout(slowWarningTimer);
      setLoading(false);
    }
  };

  const activeTips = result
    ? skincareTipsByCondition[result.prediction] ?? skincareTipsByCondition.class0_normal
    : [];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <div className="rounded-3xl border bg-card p-8 shadow-elegant">
          <h2 className="font-display text-2xl font-bold">Upload a scan</h2>
          <p className="mt-1 text-muted-foreground">High-resolution images give the best results.</p>

          {!previewUrl ? (
            <label
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const f = e.dataTransfer.files?.[0];
                if (f) handleFile(f);
              }}
              className="mt-6 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-border bg-section p-12 text-center transition hover:border-primary hover:bg-primary/5"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow animate-float">
                <UploadCloud className="h-7 w-7" />
              </div>
              <div className="font-display text-lg font-semibold">Drop image here, or click to upload</div>
              <div className="text-sm text-muted-foreground">PNG, JPG or HEIC · up to 20MB</div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files && handleFile(e.target.files[0])}
              />
            </label>
          ) : (
            <div className="mt-6 space-y-4">
              <div className="relative overflow-hidden rounded-3xl border">
                <img src={previewUrl} alt="Uploaded scan" className="w-full max-h-[420px] object-contain bg-section" />
                <button
                  onClick={clearImage}
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-background/90 backdrop-blur"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <Button
                onClick={startScan}
                disabled={loading}
                variant="gradient"
                size="lg"
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {loadingMessage}
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-1 h-4 w-4" /> Analyze with AI
                  </>
                )}
              </Button>
            </div>
          )}

          {error && (
            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {result && (
          <>
            <div className="rounded-3xl border bg-card p-6 shadow-elegant">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold">Prediction Result</h3>
                  <p className="text-sm text-muted-foreground">AI analysis completed</p>
                </div>
                <div className="rounded-2xl bg-primary/10 px-4 py-2 text-right">
                  <div className="text-xs text-muted-foreground">Confidence</div>
                  <div className="font-display text-lg font-bold text-primary">
                    {(result.confidence * 100).toFixed(1)}%
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-section p-4">
                <div className="text-xs text-muted-foreground">Predicted condition</div>
                <div className="mt-1 font-display text-xl font-bold text-primary">
                  {formatDiseaseName(result.prediction)}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {result.top_3.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-xl bg-section px-4 py-2.5 text-sm"
                  >
                    <span className="font-medium">{formatDiseaseName(item.label)}</span>
                    <span className="font-semibold text-primary">{(item.score * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border bg-card p-6 shadow-elegant">
              <h3 className="font-display text-lg font-semibold">About this condition</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {conditionInfo[result.prediction] ?? "No additional information available for this condition."}
              </p>
            </div>

            <div className="rounded-3xl border bg-card p-6 shadow-elegant">
              <h3 className="font-display text-lg font-semibold">
                Skincare tips for {formatDiseaseName(result.prediction)}
              </h3>
              <ul className="mt-4 space-y-3">
                {activeTips.map((tip) => (
                  <li key={tip} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-accent/30 bg-accent/5 p-4 text-sm text-muted-foreground">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{result.disclaimer} The prediction may be incorrect. Consult a qualified dermatologist for professional evaluation.</span>
            </div>

            <Button variant="outline" size="lg" className="w-full" onClick={clearImage}>
              Analyze Another Image
            </Button>
          </>
        )}
      </div>

      <aside className="space-y-4">
        <div className="rounded-3xl border bg-card p-6 shadow-elegant">
          <ShieldCheck className="h-6 w-6 text-accent" />
          <h3 className="mt-3 font-display font-semibold">Privacy-first</h3>
          <p className="mt-1 text-sm text-muted-foreground">Your images are processed for this scan only and are not stored on our servers.</p>
        </div>
        <div className="rounded-3xl border bg-card p-6 shadow-elegant">
          <ImageIcon className="h-6 w-6 text-primary" />
          <h3 className="mt-3 font-display font-semibold">Tips for best results</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>• Good natural lighting</li>
            <li>• Steady camera, no blur</li>
            <li>• Affected area centered</li>
            <li>• Multiple angles help accuracy</li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Upload;