import Link from "next/link";

function Layout({ children }) {
  return (
    <>
      <header className="w-full bg-green-500">
        <nav className="w-3/4 mx-auto py-4">
          <Link href="/">
            <h2 className="text-3xl text-center">HackerNews</h2>
          </Link>
        </nav>
      </header>
      {/* main content */}
      <div className="min-h-[90vh] w-3/4 mx-auto py-4">{children}</div>
      {/* footer */}
      <footer className="bg-green-500 my-6">
        <div className="w-3/4 mx-auto py-6">
          <div>
            <p className="text-center">Powered by HackerNews API</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Layout;
