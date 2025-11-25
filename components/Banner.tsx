"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const Slider = dynamic(() => import("react-slick"), { ssr: false }) as any;

export default function Banner({ banner }: { banner: any }) {
  if (!banner?.slides) return null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 900,
    autoplay: true,
    autoplaySpeed: 3500,
    fade: true,
    arrows: true,
    pauseOnHover: false,
  };

  return (
    <section className="relative w-full h-[100vh] overflow-hidden">
      <Slider {...settings}>
        {banner.slides.map((slide: any, idx: number) => (
          <div key={idx} className="relative w-full h-[100vh]">
            {slide.bgImage && (
              <Image
                src={slide.bgImage}
                alt={slide.heading}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute mx-auto container inset-0 flex flex-col items-start justify-center text-white px-4">
              <h2 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
                {slide.heading}
              </h2>
              <p className="text-lg max-w-2xl mb-6 opacity-90">
                {slide.description}
              </p>
              {slide?.shopAllBtn?.url && (
                <Link
                  href={slide.shopAllBtn.url}
                  className="bg-white text-black px-8 py-3 rounded-full text-lg font-semibold shadow-xl hover:bg-gray-200 transition"
                >
                  {slide.shopAllBtn.text || "Shop Now"}
                </Link>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
