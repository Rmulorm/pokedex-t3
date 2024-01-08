import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/"],
  ignoredRoutes: [
    "/((?!api|trpc))(_next.*|.+.[w]+$)",
    "/api/trpc/pokemon.getAll",
  ], //TODO Remove this auth to all
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
