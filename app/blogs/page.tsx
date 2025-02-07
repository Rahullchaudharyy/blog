"use client";

import { gql } from "@apollo/client";
import client from "@/lib/apollo-client";
import { useEffect, useState } from "react";
import BlogCard from "./_Components/BlogCard";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PageComponent = () => {
  interface BlogPost {
    documentId: string;
    title: string;
    content: string;
    blog_category?: {
      name: string;
      __typename:string;
    };
    previewImage?: {
      url: string;
    };
  }
  const [data, setData] = useState<BlogPost[]>([]);
  const [originalData, setOriginalData] = useState<BlogPost[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  
  

  const getBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await client.query({
        query: gql`
        query BlogPosts($pagination: PaginationArg) {
          blogPosts(pagination: $pagination) {
            title
            content
            documentId
            blog_category {
              name
            }
            previewImage {
              url
            }
          }
        }
      `,
        variables: {
          pagination: {
            pageSize: 2,
            page: page,
          },
        },
      });

      setData(data?.blogPosts);
      setOriginalData(data?.blogPosts); 
      // console.log(data?.blogPosts);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchValue:string) => {
    setSearchQuery(searchValue);
    if (searchValue.trim() === "") {
      setData(originalData); 
      return;
    }

    const searchResults = originalData.filter((blog) =>
      blog?.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    setData(searchResults);
  };

  useEffect(() => {
    getBlogs();
  }, [page]); 

  return (
    <div className="flex flex-col flex-wrap p-9 gap-5 justify-center items-center">
        <div className="flex flex-col justify-center items-center ">
    <h1 className="text-3xl font-bold text-gray-800 mb-4">
      Welcome to Gray-to-Green's Blog Platform
    </h1>
    <p className="text-lg text-gray-600 mb-6">
      Explore insightful articles and stories from our writers.
    </p>
    
  </div>
      <div className="flex flex-col gap-5">
        <input
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          type="text"
          placeholder="Search Blogs"
          className="bg-gray-200 rounded-xl focus:outline-none p-2 min-w-sm"
        />
        <div className="flex w-full flex-col md:flex-row gap-5">
        
          {error && <div className="w-96">
            <p>Error fetching blogs</p>
            </div>}
          {data?.length === 0 && !loading && !error && 
          
          <div className="w-96 flex justify-center items-center">
            
            <p >No blogs found</p>
            </div>
          }
       
          {loading ? (
            <>
            
            
            <div className="flex max-w-sm flex-col space-y-3">
              <Skeleton className="h-48 w-60 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex max-w-sm flex-col space-y-3">
              <Skeleton className="h-48 w-60 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            
            </>
          ):data?.map((blog) => (
            <BlogCard
              id={blog?.documentId}
              key={blog?.documentId}
              category={blog?.blog_category?.name}
              image={"https://cms.grey-to-green.com"+blog?.previewImage?.url}
              title={blog?.title}
            />
          ))}
        </div>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer select-none"
              onClick={() => page > 1 && setPage((prev) => prev - 1)}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>{page}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer select-none"
              onClick={() => page < 3 && setPage((prev) => prev + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PageComponent;
