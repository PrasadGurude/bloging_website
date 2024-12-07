import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id:number
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return (
    <Link to={`/blog/${id}`}>
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-lg cursor-pointer">
            <div className="flex ">
                <div className="flex justify-center flex-col ml-2">
                    <Avatar name={authorName} size="small" />
                </div>
                <div className="font-extr  alight pl-2 text-sm flex justify-center flex-col">
                    {authorName} .
                </div>
                <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-semibold ml-2 pt-2">
                {title}
            </div>
            <div className="ml-2">
                {content.slice(0, 100) + "..."}
            </div>
            <div className="text-slate-400 text-sm font-thin pt-4  ml-2">
                {`${Math.ceil(content.length / 100)}minutes`}
            </div>

        </div>
    </Link>
    )
}

export function Avatar({ name, size = "small" }: { name: string, size?: string }) {
    return (
        <div className={`relative inline-flex items-center justify-center 
         overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
            <span className={`${size === "small" ? "text-sm" : "text-xl"} font-xs text-gray-600 dark:text-gray-300`}>{name[0]}</span>
        </div>
    )
}