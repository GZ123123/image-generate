import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: (data) => {
      return false;
    },
  },
});

export const config = {
  matcher: [],
};
