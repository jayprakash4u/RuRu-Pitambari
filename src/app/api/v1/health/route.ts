import { apiSuccess, withApiHandler } from "@/lib/api";

export const GET = withApiHandler(() =>
  apiSuccess({ service: "ruru-pitambari-web", status: "ok" as const }),
);
