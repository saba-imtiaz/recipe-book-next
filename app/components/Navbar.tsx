"use client"; 
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="w-full bg-white p-3 shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 ml-12">
          <span className="px-3 py-1 rounded  bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-bold text-lg shadow">
            R
          </span>
          <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            RecipeBook
          </span>
        </Link>

        <div className="flex items-center space-x-4 mr-12">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-white bg-gradient-to-r from-orange-400 to-yellow-400 px-4 py-2 rounded shadow hover:opacity-90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4"
                  />
                </svg>
                Dashboard
              </Link>

              <Link
                href="/addRecipe"
                className="flex items-center gap-2 text-white bg-gradient-to-r from-orange-400 to-yellow-400 px-4 py-2 rounded shadow hover:opacity-90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Add Recipe
              </Link>

              <button
                onClick={logout}
                className="flex items-center gap-2 text-white bg-gradient-to-r from-orange-400 to-yellow-400 px-4 py-2 rounded shadow hover:opacity-90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 15l-3-3m0 0 3-3m-3 3h12.75"
                  />
                </svg>
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-4 py-2 rounded hover:opacity-90 shadow"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                />
              </svg>
              <span className="text-white">Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
