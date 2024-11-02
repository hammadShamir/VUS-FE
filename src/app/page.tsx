import { useTranslations } from "next-intl";
export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <>
      <video
        autoPlay
        loop
        playsInline
        src="https://media.iceportal.com/127873/Videos/video053124012250939_1080p.mp4"
        className="h-screen	 lg:h-full w-full object-cover object-center s"
        poster=""
      ></video>
      <div className="mx-auto w-96 shadow-lg p-3 mt-10 ">
        <h1 className="font-[family-name:var(--font-primary)] text-[2.5rem] text-primary">
          {t("title")}
        </h1>
        <p className="font-[family-name:var(--font-secondary)] text-base w-72 text-[1rem] text-foreground">
          Business takes on a remarkable appeal at The Apurva Kempinski Bali.
          Ideal for business travellers seeking elegant conference venues in
          Bali, each of the venues offer an impressive space for your events.{" "}
        </p>
      </div>
    </>
  );
}
