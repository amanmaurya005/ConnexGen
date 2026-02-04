import React from "react";


export default function ProfilePage() {
  return (
    <>
     

      <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-6">
        <div className="max-w-3xl mx-auto">

          {/* Profile Card */}
          <div className="bg-white/15 backdrop-blur-xl border border-white/20 
                          rounded-3xl shadow-2xl p-8 text-white text-center">
            
            <div className="w-24 h-24 mx-auto rounded-full 
                            bg-gradient-to-br from-cyan-400 to-blue-600 
                            flex items-center justify-center text-3xl font-bold">
              A
            </div>

            <h2 className="mt-4 text-2xl font-bold">Aman Maurya</h2>
            <p className="text-white/70">@amanmaurya</p>

            <div className="flex justify-center gap-8 mt-6">
              <div>
                <p className="font-bold">120</p>
                <p className="text-sm text-white/70">Posts</p>
              </div>
              <div>
                <p className="font-bold">2.3K</p>
                <p className="text-sm text-white/70">Followers</p>
              </div>
              <div>
                <p className="font-bold">180</p>
                <p className="text-sm text-white/70">Following</p>
              </div>
            </div>

            <button
              className="mt-6 px-6 py-2 rounded-full font-semibold
                         bg-gradient-to-r from-cyan-400 to-blue-500
                         hover:from-cyan-500 hover:to-blue-600 transition"
            >
              Edit Profile
            </button>
          </div>

          {/* User Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {[1, 2, 3, 4].map((p) => (
              <div
                key={p}
                className="bg-white/15 backdrop-blur-xl border border-white/20 
                           rounded-xl p-4 text-white"
              >
                User post preview here
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
