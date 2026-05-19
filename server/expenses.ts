import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";

export const expensesRouter = router({
  processReceipt: publicProcedure
    .input(
      z.object({
        imageBase64: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // Simulazione di un ritardo di elaborazione
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Risultato OCR fittizio hardcoded
      return {
        products: [
          { name: "Pane", price: 1.50 },
          { name: "Latte", price: 1.20 },
          { name: "Pasta", price: 0.85 },
          { name: "Mele", price: 2.30 },
        ],
        total: 5.85,
        confidence: 0.95,
        rawText: "PANE 1.50\nLATTE 1.20\nPASTA 0.85\nMELE 2.30\nTOTALE 5.85",
      };
    }),
});
