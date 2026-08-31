export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/insumos/:path*", "/recetas/:path*"],
};
