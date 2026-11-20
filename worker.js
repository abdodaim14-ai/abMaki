export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/") {
      return Response.json({
        success: true,
        message: "AbMaki AI Design Studio Worker is running"
      });
    }

    return new Response("Not Found", { status: 404 });
  }
};
