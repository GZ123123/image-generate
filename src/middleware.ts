import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized: (data) => {
        console.log(data);

        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/cms/"],
};
