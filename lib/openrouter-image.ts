export interface GenerateImageParams {
  prompt: string;
  type: "exercise" | "meal";
}

export interface ImageGenerationResponse {
  success: boolean;
  imageUrl: string;
  prompt: string;
  model: string;
}

export async function generateImageWithOpenRouter(
  params: GenerateImageParams
): Promise<ImageGenerationResponse> {
  try {
    const imageUrl = await fetchImageFromPexels(
      params.prompt,
      params.type
    );

    return {
      success: true,
      imageUrl,
      prompt: params.prompt,
      model: "pexels",
    };
  } catch (err) {
    console.error("Image fetch failed:", err);

    return {
      success: true,
      imageUrl: "https://picsum.photos/800/600",
      prompt: params.prompt,
      model: "fallback",
    };
  }
}

// ------------------ PEXELS FETCH ------------------

async function fetchImageFromPexels(
  query: string,
  type: "exercise" | "meal"
): Promise<string> {
  const searchQuery =
    type === "exercise"
      ? `${query} workout gym fitness`
      : `${query} food meal dish`;

  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(
      searchQuery
    )}&per_page=1`,
    {
      headers: {
        Authorization: process.env.PEXELS_API_KEY!,
      },
    }
  );

  if (!res.ok) throw new Error("Pexels API failed");

  const data = await res.json();

  return (
    data.photos?.[0]?.src?.large ||
    "https://picsum.photos/800/600"
  );
}
