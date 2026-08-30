import { useState } from "react";

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
    .replace("class0_", "")
    .replace("class1_", "")
    .replace("class2_", "")
    .replace("class3_", "")
    .replace("class4_", "")
    .replace("class5_", "")
    .replace("_", " ");
};

export default function Upload() {

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<PredictionResponse | null>(null);

  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedImage(file);

    setPreviewUrl(URL.createObjectURL(file));

    setResult(null);

    setError(null);
  };

  const handleUpload = async () => {

    if (!selectedImage) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);

    setError(null);

    try {

      const formData = new FormData();

      formData.append("file", selectedImage);

      const response = await fetch(
        "http://127.0.0.1:8000/predict",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Backend prediction failed.");
      }

      const data: PredictionResponse = await response.json();

      console.log("Prediction Result:", data);

      setResult(data);

    } catch (err) {

      console.error(err);

      setError("Something went wrong while analyzing image.");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">

      <div className="w-full max-w-3xl bg-zinc-900 rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Skin Disease Detection AI
        </h1>

        <div className="flex flex-col gap-5">

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border border-zinc-700 rounded-lg p-3 bg-zinc-800"
          />

          {previewUrl && (

            <div className="flex justify-center">

              <img
                src={previewUrl}
                alt="Preview"
                className="w-72 h-72 object-cover rounded-2xl border border-zinc-700"
              />

            </div>

          )}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 transition rounded-lg py-3 font-semibold disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Image"}
          </button>

          {error && (

            <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg">

              {error}

            </div>

          )}

          {result && (

            <div className="bg-zinc-800 rounded-2xl p-6 border border-zinc-700 mt-4">

              <div className="flex items-center justify-between">

                <h2 className="text-3xl font-bold">

                  {formatDiseaseName(result.prediction)}

                </h2>

                <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold">
                  Detected
                </span>

              </div>

              <p className="mt-4 text-zinc-300">

                Confidence Score:
                <span className="ml-2 text-blue-400 font-bold">
                  {(result.confidence * 100).toFixed(1)}%
                </span>

              </p>

              <div className="mt-6">

                <h3 className="text-lg font-semibold mb-3">

                  Top Predictions

                </h3>

                <div className="space-y-3">

                  {result.top_3.map((item, index) => (

                    <div
                      key={index}
                      className="flex justify-between items-center bg-zinc-900 p-4 rounded-xl"
                    >

                      <span className="font-medium">

                        {formatDiseaseName(item.label)}

                      </span>

                      <span className="text-blue-400 font-bold">

                        {(item.score * 100).toFixed(1)}%

                      </span>

                    </div>

                  ))}

                </div>

              </div>

              <div className="mt-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500 text-yellow-300 text-sm">

                {result.disclaimer}

              </div>

            </div>

          )}

        </div>

      </div>

    </div>

  );
}