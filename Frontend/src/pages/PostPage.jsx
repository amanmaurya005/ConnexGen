import React, { useState, useEffect } from "react";
import instance from "../axiosConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddPostPage() {
  const navigate = useNavigate();

  const [postContent, setPostContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔥 NEW: logged-in user
  const [currentUser, setCurrentUser] = useState(null);

  // 🔥 FETCH LOGGED-IN USER
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await instance.get("/api/auth/check", {
          withCredentials: true,
        });
        setCurrentUser(res.data);
      } catch (error) {
        console.log("User not logged in");
      }
    };
    fetchUser();
  }, []);

  // IMAGE UPLOAD
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // SUBMIT POST
  const handleSubmit = async () => {
    if (!postContent.trim() && !imageFile) {
      toast.error("Write something or upload an image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("caption", postContent);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await instance.post("/api/posts/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success("Post created successfully 🎉");

      setPostContent("");
      setImageFile(null);
      setImagePreview(null);
      setShowPreview(false);

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Post upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Create Your Post
          </h1>
          <p className="text-white/60">Share your thoughts with the world</p>
        </div>

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 
                        rounded-3xl shadow-2xl p-8 text-white">

          {/* User */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/20">
            <div className="w-14 h-14 rounded-full 
                            bg-gradient-to-br from-cyan-400 to-blue-600 
                            flex items-center justify-center font-bold text-xl">
              {currentUser?.name?.charAt(0) || "U"}
            </div>
            <div>
              <h4 className="font-semibold text-lg">
                {currentUser?.name || "User"}
              </h4>
              <p className="text-xs text-white/70">Posting publicly</p>
            </div>
          </div>

          {/* ⬇️ REST OF YOUR CODE IS UNCHANGED ⬇️ */}

          {/* Text Area */}
          <div className="mb-6">
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full bg-white/5 border border-white/20 rounded-2xl 
                         p-4 text-white placeholder-white/40 
                         focus:outline-none focus:ring-2 focus:ring-cyan-400
                         min-h-[150px] resize-none"
            />
            <div className="flex justify-between mt-2 text-xs text-white/50">
              <span>{postContent.length}/500</span>
              {postContent && (
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="text-cyan-400 hover:underline"
                >
                  {showPreview ? "Hide" : "Show"} Preview
                </button>
              )}
            </div>
          </div>

          {/* Preview */}
          {showPreview && postContent && (
            <div className="mb-6 p-4 bg-white/5 rounded-2xl">
              {postContent}
            </div>
          )}

          {/* Image Upload */}
          <div className="mb-6">
            {!imagePreview ? (
              <label className="block cursor-pointer">
                <div className="border-2 border-dashed border-white/30 
                                rounded-2xl p-8 text-center hover:bg-white/5">
                  Add Image
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={imagePreview}
                  alt="preview"
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                  className="absolute top-3 right-3 bg-red-500 px-3 py-1 rounded-lg"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Action */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 
                       text-white py-3 rounded-xl font-semibold
                       disabled:opacity-50"
          >
            {loading ? "Posting..." : "Publish Post"}
          </button>
        </div>
      </div>
    </div>
  );
}













// import React, { useState } from "react";
// import instance from "../axiosConfig";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// export default function AddPostPage() {
//   const navigate = useNavigate();

//   const [postContent, setPostContent] = useState("");
//   const [imageFile, setImageFile] = useState(null);   // File
//   const [imagePreview, setImagePreview] = useState(null);
//   const [showPreview, setShowPreview] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // IMAGE UPLOAD
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setImageFile(file);
//     setImagePreview(URL.createObjectURL(file));
//   };

//   // SUBMIT POST
//   const handleSubmit = async () => {
//     if (!postContent.trim() && !imageFile) {
//       toast.error("Write something or upload an image");
//       return;
//     }

//     try {
//       setLoading(true);

//       const formData = new FormData();
//       formData.append("caption", postContent);
//       if (imageFile) {
//         formData.append("image", imageFile);
//       }

//       await instance.post("/api/posts/create", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         withCredentials: true,
//       });

//       toast.success("Post created successfully 🎉");

//       // RESET
//       setPostContent("");
//       setImageFile(null);
//       setImagePreview(null);
//       setShowPreview(false);

//       navigate("/"); // go back to feed (HeroSection)
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Post upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-6">
//       <div className="max-w-3xl mx-auto">

//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-white mb-2">
//             Create Your Post
//           </h1>
//           <p className="text-white/60">Share your thoughts with the world</p>
//         </div>

//         {/* Main Card */}
//         <div className="bg-white/10 backdrop-blur-2xl border border-white/20 
//                         rounded-3xl shadow-2xl p-8 text-white">

//           {/* User */}
//           <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/20">
//             <div className="w-14 h-14 rounded-full 
//                             bg-gradient-to-br from-cyan-400 to-blue-600 
//                             flex items-center justify-center font-bold text-xl">
//               A
//             </div>
//             <div>
//               <h4 className="font-semibold text-lg">Aman Maurya</h4>
//               <p className="text-xs text-white/70">Posting publicly</p>
//             </div>
//           </div>

//           {/* Text Area */}
//           <div className="mb-6">
//             <textarea
//               value={postContent}
//               onChange={(e) => setPostContent(e.target.value)}
//               placeholder="What's on your mind?"
//               className="w-full bg-white/5 border border-white/20 rounded-2xl 
//                          p-4 text-white placeholder-white/40 
//                          focus:outline-none focus:ring-2 focus:ring-cyan-400
//                          min-h-[150px] resize-none"
//             />
//             <div className="flex justify-between mt-2 text-xs text-white/50">
//               <span>{postContent.length}/500</span>
//               {postContent && (
//                 <button
//                   onClick={() => setShowPreview(!showPreview)}
//                   className="text-cyan-400 hover:underline"
//                 >
//                   {showPreview ? "Hide" : "Show"} Preview
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Preview */}
//           {showPreview && postContent && (
//             <div className="mb-6 p-4 bg-white/5 rounded-2xl">
//               {postContent}
//             </div>
//           )}

//           {/* Image Upload */}
//           <div className="mb-6">
//             {!imagePreview ? (
//               <label className="block cursor-pointer">
//                 <div className="border-2 border-dashed border-white/30 
//                                 rounded-2xl p-8 text-center hover:bg-white/5">
//                   Add Image
//                 </div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="hidden"
//                 />
//               </label>
//             ) : (
//               <div className="relative rounded-2xl overflow-hidden">
//                 <img
//                   src={imagePreview}
//                   alt="preview"
//                   className="w-full h-64 object-cover"
//                 />
//                 <button
//                   onClick={() => {
//                     setImageFile(null);
//                     setImagePreview(null);
//                   }}
//                   className="absolute top-3 right-3 bg-red-500 px-3 py-1 rounded-lg"
//                 >
//                   Remove
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Action */}
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 
//                        text-white py-3 rounded-xl font-semibold
//                        disabled:opacity-50"
//           >
//             {loading ? "Posting..." : "Publish Post"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
