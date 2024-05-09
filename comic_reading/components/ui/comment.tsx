
interface CommentProps {
    imgAvatar: string;
    name: string;
    time: string;
    content: string;
}

export function Comment({
    imgAvatar,
    name,
    time,
    content,
}: CommentProps) {
    return (
        <div className="w-full flex h-fit mt-3">

            <img className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={imgAvatar}></img>

            <div className="p-3 m-3 mt-0 bg-[#515151] text-white hover:bg rounded-xl w-full h-fit flex flex-col">
                <div className="w-full flex justify-between border-b border-[#FCA565] pb-1">
                    <h1 className="text-base font-semibold">{name}</h1>
                    <h1 className="text-base font-light">{time}</h1>
                </div>
                <div className=" flex flex-col items-start">
                    <h1 className="text-base font-normal">{content}</h1>

                </div>
            </div>
        </div>
    );
}

export default Comment;