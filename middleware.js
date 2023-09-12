import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: process.env.DOMEN
  },
});

export const config = {
  matcher: ["/todo", "/changePassword", "/notifications"],
};
