"use client";

import { useSelector } from "react-redux";
import Loading from "../app/loading";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutWrapper({ children }) {
  const { loading } = useSelector((state) => state.auth);

  if (loading) return <Loading />;

  return (
    <>
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}