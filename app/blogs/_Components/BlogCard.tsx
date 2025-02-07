import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";


interface BlogCardProps {
    title: string;
    image: string;
    category: string;
    description: string;
    id:any
  }

export default function BlogCard({ title, image, category, description,id }:BlogCardProps) {
  return (
    <Link href={`/blogs/${id}`}>
    
    <Card className="w-full max-w-sm shadow-md hover:shadow-lg transition-all">
      <CardHeader>
        <Image 
          src={image} 
          alt={title} 
          width={400} 
          height={200} 
          className="rounded-lg object-cover w-full h-48"
        />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 uppercase">{category}</p>
        <CardTitle className="text-xl font-bold mt-2">{title}</CardTitle>
        <p className="text-gray-600 mt-2 text-sm">{description}</p>
      </CardContent>
    </Card>
    </Link>
  
  );
}
