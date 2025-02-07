"use client";
import { gql } from "@apollo/client";
import client from "@/lib/apollo-client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const pathname = usePathname();
  const documentId = pathname.split("/").pop();
  console.log(documentId);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  const getBlog = async () => {
    if (!documentId) return;

    try {
      setLoading(true);
      const { data } = await client.query({
        query: gql`
          query BlogPost($documentId: ID!) {
            blogPost(documentId: $documentId) {
              title
              content
              blog_category {
                name
              }
              description
              previewImage {
                url
              }
            }
          }
        `,
        variables: { documentId },
      });

      setData(data?.blogPost);
    } catch (error) {
      console.error("Error fetching blog post:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlog();
  }, [documentId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-indigo-600"></div>
        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-indigo-600"></div>
        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-indigo-600"></div>
      </div>
    );
  }

  if (!data) {
    return <h1>Blog not found</h1>;
  }

  return (
    <div className="p-6  flex justify-center items-center flex-col ">
      <div className="w-full md:h-96 h-44 relative overflow-hidden">
        <img
          alt={data?.title}
          width={2000}
          height={700}
          className="w-full md:h-96 h-44 object-cover absolute"
          src={"https://cms.grey-to-green.com" + data?.previewImage?.url}
          style={{ color: "transparent" }}
        />
        <div className="w-full  md:h-96 h-44 bg-main/20 backdrop-blur-sm relative" />
      </div>
      <div className="container flex flex-col justify-center items-center  md:-mt-64 -mt-28 z-20 relative">
        <img
          alt={data?.title}
          width={2000}
          height={2000}
          className="w-full lg:h-[500px] md:h-96 bg-white h-52 object-cover max-w-[900px] shadow-md rounded-xl mx-auto"
          src={"https://cms.grey-to-green.com" + data?.previewImage?.url}
          style={{ color: "transparent" }}
        />

        <div className="max-w-[1000px]">
          <h1 className="md:text-3xl font-bold text-center py-4">{data.title}</h1>

          <p className="text-xl font-semibold py-7 text-gray-500 ">{data.blog_category?.name}</p>

          <p className="text-gray-700">{data.description}</p>
          <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
        </div>
      </div>
    </div>
  );
};

export default page;
