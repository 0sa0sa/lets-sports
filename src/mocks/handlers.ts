import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:5174/hello", () => {
    return HttpResponse.json({
      message: "hello world",
    });
  }),
];
