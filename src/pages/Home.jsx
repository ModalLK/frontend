import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { getAllProducts } from "../services/productService";
import ProductCard from "../components/products/ProductCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Home.css";

import hero1 from "../../public/images/home/home1.jpg";
import hero2 from "../../public/images/home/home5.jpg";
import hero3 from "../../public/images/home/home7.jpg";
import hero4 from "../../public/images/home/home8.jpg";

const CATEGORY_LIMIT = 6;
const PRODUCT_LIMIT = 10;

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllProducts();
        const list = Array.isArray(data) ? data : [];
        setAllProducts(list);
        setFeatured(list.slice(0, 4));

        const unique = [
          ...new Set(list.map((p) => p.category).filter(Boolean)),
        ];
        setCategories(unique);
        if (unique.length > 0) setActiveCategory(unique[0]);
      } catch (err) {
        console.error("Failed to load products", err);
      }
    })();
  }, []);

  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, CATEGORY_LIMIT);

  const categoryProducts = allProducts.filter(
    (p) => p.category === activeCategory,
  );

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

  return (
    <div className="space-y-12">
      {/* ── Hero Slider ── */}
      <section>
        <Slider {...sliderSettings}>
          {slideData.map((slide) => (
            <div key={slide.id}>
              <div className="relative h-[320px] overflow-hidden rounded-2xl sm:h-[380px] lg:h-[520px]">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="block h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent" />
                <div className="absolute left-5 top-1/2 z-10 w-[85%] -translate-y-1/2 text-white sm:left-8 sm:w-[70%] lg:left-14 lg:w-[520px]">
                  <p className="mb-3 inline-block rounded-full bg-[#7a1fe0] px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-indigo-100 backdrop-blur-sm sm:mb-4 sm:px-4 sm:text-xs">
                    {slide.badge}
                  </p>
                  <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-6xl">
                    {slide.title}
                  </h1>
                  <p className="mt-3 text-sm text-slate-100 sm:mt-4 sm:text-base lg:text-2xl">
                    {slide.subtitle}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3 sm:mt-6">
                    <Link
                      to={slide.buttonLink}
                      className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-[#902bf5] px-5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#7a1fe0] sm:min-h-[48px] sm:px-7 sm:text-base"
                    >
                      {slide.buttonText}
                    </Link>
                    <Link
                      to="/products"
                      className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-white/70 bg-white/95 px-5 text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:bg-white sm:min-h-[48px] sm:px-7 sm:text-base"
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

      {/* Category Tabs */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-semibold text-black">
            Shop by Category
          </h2>
          {categories.length > CATEGORY_LIMIT && (
            <button
              onClick={() => setShowAllCategories((prev) => !prev)}
              className="text-sm font-bold text-[#902bf5] hover:underline transition"
            >
              {showAllCategories ? "Show less" : "View all"}
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-3">
          {visibleCategories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                activeCategory === c
                  ? "bg-[#902bf5] text-white shadow-md"
                  : "border border-[#902bf5] text-[#902bf5] hover:bg-[#f3e8ff]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Category Products */}
        {activeCategory && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              {activeCategory}
            </h3>

            {categoryProducts.length === 0 ? (
              <p className="text-sm text-slate-400">
                No products in this category yet.
              </p>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {categoryProducts.slice(0, PRODUCT_LIMIT).map((p) => (
                    <Link
                      key={p.id}
                      to={`/products/${p.id}`}
                      className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
                    >
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={p.imageUrl || p.image}
                          alt={p.name}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-semibold text-slate-800 truncate">
                          {p.name}
                        </p>
                        <p className="mt-1 text-sm font-black text-[#902bf5]">
                          LKR {Number(p.price).toLocaleString()}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* View more — only if > 10 products */}
                {categoryProducts.length > PRODUCT_LIMIT && (
                  <div className="mt-6 flex justify-center">
                    <Link
                      to={`/products?category=${encodeURIComponent(activeCategory)}`}
                      className="rounded-xl border border-[#902bf5] px-8 py-3 text-sm font-bold text-[#902bf5] transition hover:bg-[#902bf5] hover:text-white"
                    >
                      View more in {activeCategory} →
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </section>

      {/* ── Featured Products ── */}
      {/* <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
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
            className="text-sm font-bold text-[#902bf5] hover:underline"
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
      </section> */}
    </div>
  );
}
