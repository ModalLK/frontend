import { useState } from "react";
import Catalog from "./pages/Catalog";

export default function App() {
  const [cartCount] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-blue-600" />
            <div>
              <p className="text-sm font-semibold leading-4">ModalLK</p>
              <p className="text-xs text-slate-500">E-Commerce</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50">
              Login
            </button>
            <button className="relative rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700">
              Cart
              <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Catalog onBuy={(p) => console.log("buy", p)} />
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-500">
          © {new Date().getFullYear()} ModalLK • Microservices E-Commerce
        </div>
      </footer>
    </div>
  );
}