import { IronSessionOptions } from "iron-session";

const config: IronSessionOptions = {
  cookieName: process.env.NEXT_SESSION_COOKIE || "tmi_cookie",
  password:
    process.env.NEXT_SESSION_PASSWORD ||
    "complex_password_at_least_32_characters_long",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
  ttl: parseInt(process.env.NEXT_SESSION_TTL || "180"),
};

export default config;
