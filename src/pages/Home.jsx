import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { getAllProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Home.css";

import hero1 from "../assets/shopping1.jpg";
import hero2 from "../assets/shopping2.jpg";
import hero3 from "../assets/shopping3.jpg";
import hero4 from "../assets/shopping4.jpg";

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllProducts();
        const list = Array.isArray(data) ? data : [];
        setFeatured(list.slice(0, 4));
      } catch (err) {
        console.error("Failed to load featured products", err);
      }
    })();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: false,
  };

  const slideData = [
    {
      id: 1,
      img: hero1,
      badge: "Mega Fashion Sale",
      title: "Trending fashion styles for your next look",
      subtitle: "Up to 40% Off",
      buttonText: "Shop Fashion",
      buttonLink: "/products?category=Fashion",
    },
    {
      id: 2,
      img: hero2,
      badge: "Beauty Week",
      title: "Glow up with top makeup and skincare picks",
      subtitle: "Buy 2 Get 1 Free",
      buttonText: "Shop Makeup",
      buttonLink: "/products?category=Makeup",
    },
    {
      id: 3,
      img: hero3,
      badge: "Electronics Deals",
      title: "Smart gadgets and daily tech at better prices",
      subtitle: "Save up to LKR 10,000",
      buttonText: "Shop Electronics",
      buttonLink: "/products?category=Electronics",
    },
    {
      id: 4,
      img: hero4,
      badge: "Home Essentials",
      title: "Refresh your home with stylish essentials",
      subtitle: "Limited Time Offers",
      buttonText: "Shop Home",
      buttonLink: "/products?category=Home",
    },
  ];

  const categories = [
    "Fashion",
    "Makeup",
    "Electronics",
    "Home",
    "Sports",
    "Accessories",
  ];

  return (
    <div className="space-y-12">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-3 shadow-sm">
        <Slider {...sliderSettings}>
          {slideData.map((slide) => (
            <div key={slide.id}>
              <div className="relative h-[320px] overflow-hidden rounded-[28px] sm:h-[380px] lg:h-[520px]">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="block h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent" />

                <div className="absolute left-5 top-1/2 z-10 w-[85%] -translate-y-1/2 text-white sm:left-8 sm:w-[70%] lg:left-14 lg:w-[520px]">
                  <p className="mb-3 inline-block rounded-full bg-white/20 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-indigo-100 backdrop-blur-sm sm:mb-4 sm:px-4 sm:text-xs">
                    {slide.badge}
                  </p>

                  <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-6xl lg:leading-[1.05]">
                    {slide.title}
                  </h1>

                  <p className="mt-3 text-sm font-medium text-slate-100 sm:mt-4 sm:text-base lg:text-2xl">
                    {slide.subtitle}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3 sm:mt-6">
                    <Link
                      to={slide.buttonLink}
                      className="inline-flex min-h-[44px] items-center justify-center rounded-2xl bg-indigo-600 px-5 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5 hover:bg-indigo-700 sm:min-h-[48px] sm:px-7 sm:text-base"
                    >
                      {slide.buttonText}
                    </Link>

                    <Link
                      to="/products"
                      className="inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-white/70 bg-white/95 px-5 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:bg-white sm:min-h-[48px] sm:px-7 sm:text-base"
                    >
                      Browse All
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      <section>
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              Shop by Category
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Explore products by collection.
            </p>
          </div>

          <Link
            to="/products"
            className="text-sm font-bold text-indigo-600 hover:text-indigo-700"
          >
            View all →
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <Link
              key={c}
              to={`/products?category=${encodeURIComponent(c)}`}
              className="rounded-3xl border border-slate-200 bg-white p-5 text-center text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              Featured Products
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Hand-picked items from your store.
            </p>
          </div>

          <Link
            to="/products"
            className="text-sm font-bold text-indigo-600 hover:text-indigo-700"
          >
            Explore more →
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.length > 0 ? (
            featured.map((p) => <ProductCard key={p.id} product={p} />)
          ) : (
            <p className="text-sm text-slate-500">
              Loading featured products...
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
