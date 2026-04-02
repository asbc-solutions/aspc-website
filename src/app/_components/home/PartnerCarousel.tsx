"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const PartnerCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const companies = [
    "Mobily",
    "Zain",
    "Almaria",
    "Extras",
    "Tamimi",
    "Tamimis",
    "Tamimiss",
    "Tamimissz",
  ];
  return (
    <div className="mt-12 flex justify-center">
      <Carousel
        className="w-full max-w-7xl"
        opts={{
          loop: true,
        }}
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
      >
        <CarouselContent className="cursor-grab">
          {companies.map((company, index) => (
            <CarouselItem key={company} className="basis-1/3 sm:basis-1/7">
              <div
                className={`px-5 py-2 text-primary bg-white rounded-lg shadow-black-50 shadow border border-white w-fit mx-auto select-none transition-opacity ${
                  index === current ? "opacity-50" : "opacity-100"
                }`}
              >
                {company}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default PartnerCarousel;
