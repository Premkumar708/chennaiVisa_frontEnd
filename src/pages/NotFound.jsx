// src/pages/NotFound.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white border rounded-2xl shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Illustration */}
          <div className="md:w-1/2 bg-linear-to-br from-blue-50 to-white p-8 flex items-center justify-center">
            {/* simple friendly SVG */}
            <svg
              width="220"
              height="220"
              viewBox="0 0 220 220"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <rect width="220" height="220" rx="20" fill="#F8FAFF" />
              <g transform="translate(30,30)">
                <path d="M40 20 L80 20 L80 60 L40 60 Z" fill="#E6F0FF" />
                <circle cx="60" cy="100" r="28" fill="#CFE3FF" />
                <path
                  d="M0 150 L120 150"
                  stroke="#DCEEFF"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <text
                  x="60"
                  y="108"
                  textAnchor="middle"
                  fill="#0857A8"
                  fontWeight="700"
                  fontSize="32"
                >
                  404
                </text>
              </g>
            </svg>
          </div>

          {/* Content */}
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Page not found
            </h1>
            <p className="text-sm text-gray-600 mb-6">
              We couldn't find the page you were looking for. The link may be
              broken, or the page may have been removed.
            </p>

            <div className="flex gap-3 mb-4">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700"
              >
                Go to Home
              </Link>

              <Link
                to="/visa"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-gray-200 text-slate-700 hover:bg-gray-50"
              >
                Browse Visas
              </Link>
            </div>

            <div className="mb-4">
              <button
                onClick={() => navigate(-1)}
                className="text-sm text-gray-600 hover:underline"
              >
                ← Go back
              </button>
            </div>

            <div className="text-xs text-gray-500 border-t pt-4">
              <p>
                If you think this is a mistake or you were expecting a different
                page,{" "}
                <a href="/contact" className="text-blue-600 hover:underline">
                  contact our support
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
