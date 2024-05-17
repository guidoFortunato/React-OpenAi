import type { ProsConsResponse } from "../../interfaces";

export const prosConsStreamUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
        // TODO abortSignal
      }
    );

    if (!resp.ok) throw new Error("No se pudo realizar la comparación");

    const reader = resp.body?.getReader()
    if (!reader) {
      console.error('No se pudo generar el reader')
      return null
    }

    const decoder = new TextDecoder();

    // let = text = ''

    


  } catch (error) {
    console.error(error)
    return null
  }
};
