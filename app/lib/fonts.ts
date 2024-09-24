import { Noto_Sans_Display, Sarabun } from "next/font/google";

export const notoSansDisplay = Noto_Sans_Display({ subsets: ["latin"] });
export const sarabun = Sarabun({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
