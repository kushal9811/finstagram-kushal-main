export async function scoreComment(text) {
  const res = await fetch(
    "https://toxicity-api-kushal.onrender.com/score",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    }
  );
  if (!res.ok) {
    throw new Error(`Toxicity API error: ${res.status}`);
  }
  return res.json(); // { toxic:0.99, toxic_flag:1, obscene:…, obscene_flag:1, … }
}
