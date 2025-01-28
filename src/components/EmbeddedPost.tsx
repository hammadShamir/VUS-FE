import React from "react";
// import { Button } from "./ui/button";
import InstagramSlider from "./InstagramSlider";
import Link from "next/link";
import Container from "./common/Container";

const EmbeddedPost = () => {
  return (
    <section className=" bg-secondary">
      <Container style="flex flex-col lg:flex-row md:justify-between gap-x-12 gap-y-6 py-4">
          <div className="space-y-4 w-full lg:w-[30%] flex flex-col justify-center">
            <h2 className="font-[family-name:var(--font-primary)] text-2xl font-bold tracking-tight text-foreground md:text-4xl">
              Follow us on instagram
            </h2>
            <p className="text-foreground font-[family-name:var(--font-secondary)] text-base">
            Discover the moments that inspire us daily! From stunning visuals to behind-the-scenes highlights, our Instagram is your front-row seat to everything happening. Follow us for exclusive updates, vibrant stories, and a closer connection to our journey. Join the community today and never miss out on the excitement!
            </p>
            {/* <Button variant={"outline"}>Instagram</Button> */}
            <div>
              <Link
                href={"/facilities"}
                className="text-base rounded-md bg-transparent border border-primary text-primary px-8 py-2 hover:bg-primary hover:text-background"
              >
                INSTAGRAM
              </Link>
            </div>
          </div>
          <div className="h-full w-full lg:w-[70%]">
            <InstagramSlider />
          </div>
      </Container>
    </section>
  );
};

export default EmbeddedPost;
