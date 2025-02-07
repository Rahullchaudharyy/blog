import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">
      Welcome to Our Blog Platform
    </h1>
    <p className="text-lg text-gray-600 mb-6">
      Explore insightful articles and stories from our writers.
    </p>
    <Link
      href="/blogs"
      className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg shadow-md hover:bg-blue-700 transition-all"
    >
      Go to the Blog
    </Link>
  </div>
  );
}
