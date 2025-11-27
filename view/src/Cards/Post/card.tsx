// import { useState } from "react";
// import { Heart, MessageCircle, Send, Star, Bookmark } from "lucide-react";
// // import { Card } from "./ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { Button } from "./ui/button";
// import { Badge } from "./ui/badge";
// import { Post } from "../types/post";

// interface PostCardProps {
//   post: Post;
// }

// export function PostCard({ post }: PostCardProps) {
//   const [hasReacted, setHasReacted] = useState(false);
//   const [hasRequested, setHasRequested] = useState(false);
//   const [reactionCount, setReactionCount] = useState(post.reactions);
//   const [requestCount, setRequestCount] = useState(post.requests);
//   const [isSaved, setIsSaved] = useState(false);

//   const handleReact = () => {
//     if (hasReacted) {
//       setReactionCount(reactionCount - 1);
//       setHasReacted(false);
//     } else {
//       setReactionCount(reactionCount + 1);
//       setHasReacted(true);
//     }
//   };

//   const handleRequest = () => {
//     if (hasRequested) {
//       setRequestCount(requestCount - 1);
//       setHasRequested(false);
//     } else {
//       setRequestCount(requestCount + 1);
//       setHasRequested(true);
//     }
//   };

//   const handleComment = () => {
//     console.log("Open comment section for post:", post.id);
//     // In a real app, this would open a comment modal or expand comment section
//   };

//   return (
//     <Card className="overflow-hidden bg-white border-gray-300 relative">
//       {/* Save Icon */}
//       <button 
//         onClick={() => setIsSaved(!isSaved)}
//         className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition-colors z-10"
//       >
//         <Bookmark className={`size-5 ${isSaved ? 'fill-amber-500 text-amber-500' : 'text-gray-400'}`} />
//       </button>

//       {/* Post Header */}
//       <div className="flex items-center gap-3 p-4 pr-16">
//         <Avatar>
//           <AvatarImage src={post.author.avatar} alt={post.author.name} />
//           <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
//         </Avatar>
//         <div className="flex-1">
//           <div className="flex items-center gap-2">
//             <p className="text-gray-900">{post.author.name}</p>
//             <span className="text-gray-500 text-sm">{post.author.username}</span>
//             <div className="flex items-center gap-1 bg-amber-600/20 px-2 py-0.5 rounded">
//               <Star className="size-3 fill-amber-500 text-amber-500" />
//               <span className="text-amber-600 text-sm">{post.author.rating.toFixed(1)}</span>
//             </div>
//           </div>
//           <p className="text-gray-500 text-sm">{post.timestamp}</p>
//         </div>
//       </div>

//       {/* Post Content */}
//       <div className="px-4 pb-4">
//         <p className="text-gray-700">
//           <span className="text-gray-900">{post.title}</span> {post.content}
//         </p>
//         <div className="flex flex-wrap gap-2 mt-3">
//           {post.tags.map((tag, index) => (
//             <Badge key={index} className={`${tag.color} text-white border-0`}>
//               {tag.name}
//             </Badge>
//           ))}
//         </div>
//       </div>

//       {/* Post Actions */}
//       <div className="flex items-center gap-2 p-4 border-t border-gray-300">
//         <Button
//           variant={hasReacted ? "default" : "ghost"}
//           size="sm"
//           onClick={handleReact}
//           className={`flex-1 gap-2 ${!hasReacted ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100" : ""}`}
//         >
//           <Heart className={`size-4 ${hasReacted ? "fill-current" : ""}`} />
//           React {reactionCount > 0 && `(${reactionCount})`}
//         </Button>
        
//         <Button
//           variant={hasRequested ? "default" : "ghost"}
//           size="sm"
//           onClick={handleRequest}
//           className={`flex-1 gap-2 ${!hasRequested ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100" : ""}`}
//         >
//           <Send className={`size-4 ${hasRequested ? "fill-current" : ""}`} />
//           Request {requestCount > 0 && `(${requestCount})`}
//         </Button>
        
//         <Button
//           variant="ghost"
//           size="sm"
//           onClick={handleComment}
//           className="flex-1 gap-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
//         >
//           <MessageCircle className="size-4" />
//           Comment {post.comments > 0 && `(${post.comments})`}
//         </Button>
//       </div>

//       {/* Comments Section */}
//       {post.commentsList && post.commentsList.length > 0 && (
//         <div className="px-4 pb-4 space-y-3">
//           {post.commentsList.map((comment) => (
//             <div key={comment.id} className="flex gap-3 p-3 bg-gray-100 rounded-lg">
//               <Avatar className="size-8">
//                 <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
//                 <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
//               </Avatar>
//               <div className="flex-1">
//                 <div className="flex items-center gap-2 mb-1">
//                   <span className="text-gray-900 text-sm">{comment.author.name}</span>
//                   <span className="text-gray-500 text-xs">{comment.author.username}</span>
//                   <span className="text-gray-500 text-xs">· {comment.timestamp}</span>
//                 </div>
//                 <p className="text-gray-700 text-sm">{comment.content}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </Card>
//   );
// }