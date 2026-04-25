/**
 * Layout — wraps any page with Navbar + Footer
 * Auth pages (login, register, reset-password, otp) are excluded automatically.
 *
 * Usage:
 *   <Layout currentPage={page} onNavigate={setPage}>
 *     <YourPageComponent />
 *   </Layout>
 */
import React from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

// Pages that should NOT show the navbar/footer
const AUTH_PAGES = ["login", "register", "reset-password", "otp"];

export default function Layout({ currentPage, onNavigate, children }) {
  const isAuth = AUTH_PAGES.includes(currentPage);

  return (
    <>
      {!isAuth && <Navbar currentPage={currentPage} onNavigate={onNavigate} />}
      <main>{children}</main>
      {!isAuth && <Footer onNavigate={onNavigate} />}
    </>
  );
}