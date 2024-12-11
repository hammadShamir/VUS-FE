import { redirect } from "next/navigation";

export default function Page() {
  redirect("/Info/my-booking");
  return null;
}
