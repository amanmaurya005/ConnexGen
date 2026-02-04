import React from "react";


export default function NotificationPage() {
  return (
    <>
    

      <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-6">
        <div className="max-w-xl mx-auto space-y-4">

          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="bg-white/15 backdrop-blur-xl border border-white/20 
                         rounded-xl p-4 flex items-center gap-4 text-white"
            >
              <div className="w-10 h-10 rounded-full 
                              bg-gradient-to-br from-cyan-400 to-blue-600 
                              flex items-center justify-center font-bold">
                U
              </div>

              <div className="flex-1">
                <p>
                  <span className="font-semibold">User</span> liked your post
                </p>
                <p className="text-xs text-white/60">5 minutes ago</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
