import { z } from "zod";

const RecommendationsSchema = z.array(
	z.object({
		artist: z.string(),
		name: z.string()
	})
);

type Recommendations = z.infer<typeof RecommendationsSchema>;

export type { Recommendations };
export default RecommendationsSchema;
