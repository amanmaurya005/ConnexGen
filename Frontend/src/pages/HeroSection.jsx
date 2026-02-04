// import React, { useEffect, useState } from "react";
// import instance from "../axiosConfig";
// import { toast } from "react-toastify";

// export default function HeroSection() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // FETCH ALL POSTS
//   const fetchPosts = async () => {
//     try {
//       const res = await instance.get("/api/posts/all", {
//         withCredentials: true,
//       });
//       setPosts(res.data);
//     } catch (error) {
//       toast.error("Failed to load feed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   return (
//     <>

//       <div className="min-h-screen bg-gradient-to-br 
//                       from-[#0f2027] via-[#203a43] to-[#2c5364] p-6">

//         <div className="max-w-2xl mx-auto space-y-6">

//           {/* Loading */}
//           {loading && (
//             <div className="text-center text-white/70">
//               Loading feed...
//             </div>
//           )}

//           {/* No Posts */}
//           {!loading && posts.length === 0 && (
//             <div className="text-center text-white/70">
//               No posts yet. Be the first to post 🚀
//             </div>
//           )}

//           {/* POSTS */}
//           {posts.map((post) => (
//             <div
//               key={post._id}
//               className="bg-white/15 backdrop-blur-xl 
//                          border border-white/20 
//                          rounded-2xl shadow-xl p-5 text-white"
//             >
//               {/* User Info */}
//               <div className="flex items-center gap-3">
//                 <div
//                   className="w-10 h-10 rounded-full 
//                              bg-gradient-to-br from-cyan-400 to-blue-600 
//                              flex items-center justify-center font-bold"
//                 >
//                   {post.user?.name?.charAt(0) || "U"}
//                 </div>
//                 <div>
//                   <h4 className="font-semibold">
//                     {post.user?.name || "Unknown"}
//                   </h4>
//                   <p className="text-xs text-white/60">
//                     @{post.user?.username || "user"}
//                   </p>
//                 </div>
//               </div>

//               {/* Image */}
//               {post.image && (
//                 <img
//                   src={post.image}
//                   alt="post"
//                   className="w-full rounded-xl mt-4 object-cover max-h-[400px]"
//                 />
//               )}

//               {/* Caption */}
//               {post.caption && (
//                 <p className="mt-4 text-white/90">
//                   {post.caption}
//                 </p>
//               )}

//               {/* Actions */}
//               <div className="flex justify-between mt-4 text-sm text-white/70">
//                 <span className="hover:text-cyan-400 cursor-pointer">
//                   ❤️ {post.likes.length} Likes
//                 </span>
//                 <span className="hover:text-cyan-400 cursor-pointer">
//                   💬 Comment
//                 </span>
//                 <span className="hover:text-cyan-400 cursor-pointer">
//                   🔁 Share
//                 </span>
//               </div>
//             </div>
//           ))}

//         </div>
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react";
import instance from "../axiosConfig";
import { toast } from "react-toastify";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH POSTS FROM BACKEND
  const fetchPosts = async () => {
    try {
      const res = await instance.get("/api/posts/all", {
        withCredentials: true,
      });
      setPosts(res.data);
    } catch (error) {
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // LIKE / UNLIKE
  const handleLike = async (postId) => {
    try {
      const res = await instance.put(
        `/api/posts/like/${postId}`,
        {},
        { withCredentials: true }
      );

      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? { ...post, likes: Array(res.data.likes).fill(0) }
            : post
        )
      );
    } catch (error) {
      toast.error("Failed to like post");
    }
  };

  if (loading) {
    return null; // 🔥 fallback UI removed as requested
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] py-8">
      <div className="max-w-2xl mx-auto px-4">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Home</h1>
          <p className="text-white/70">Discover what's happening</p>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post._id}
              className="bg-white/10 backdrop-blur-lg border border-white/20 
                         rounded-2xl overflow-hidden shadow-xl"
            >
              {/* Post Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full 
                                  bg-gradient-to-br from-cyan-400 to-blue-600 
                                  flex items-center justify-center 
                                  text-white font-bold">
                    {post.user?.name?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">
                      {post.user?.name}
                    </h3>
                    <p className="text-white/60 text-sm">
                      @{post.user?.username}
                    </p>
                  </div>
                </div>
                <button className="text-white/70 hover:text-white">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              {/* Caption */}
              {post.caption && (
                <div className="px-4 pb-3">
                  <p className="text-white/90 leading-relaxed">
                    {post.caption}
                  </p>
                </div>
              )}

              {/* Image */}
              {post.image && (
                <img
                  src={post.image}
                  alt="post"
                  className="w-full h-auto object-cover"
                />
              )}

              {/* Actions */}
              <div className="p-4 flex items-center justify-between border-t border-white/10">
                <div className="flex items-center gap-6">

                  {/* Like */}
                  <button
                    onClick={() => handleLike(post._id)}
                    className="flex items-center gap-2 text-white/70 hover:text-pink-400"
                  >
                    <Heart size={20} />
                    <span className="text-sm font-medium">
                      {post.likes.length}
                    </span>
                  </button>

                  {/* Comment (future) */}
                  <button className="flex items-center gap-2 text-white/70 hover:text-cyan-400">
                    <MessageCircle size={20} />
                    <span className="text-sm font-medium">0</span>
                  </button>

                  {/* Share */}
                  <button className="text-white/70 hover:text-green-400">
                    <Share2 size={20} />
                  </button>
                </div>

                {/* Bookmark (UI only for now) */}
                <button className="text-white/70 hover:text-yellow-400">
                  <Bookmark size={20} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
