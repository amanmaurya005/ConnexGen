import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import HeroSection from "./pages/HeroSection"
import First from "./components/First"
import ProtectedRouter from "./components/ProtectedRouter"
import PostPage from "./pages/PostPage"
import ProfilePage from "./pages/ProfilePage"
import NotificationPage from "./pages/NotificationPage"

const router= createBrowserRouter([

   {
        path:"/login",
        element:<Login />
      },
      {
        path:"/register",
        element:<Register />
      },
  {
    path:"/",
    element:<First />,
    children:[
      {
      index:true,
      element:(<ProtectedRouter>
        <HeroSection />
      </ProtectedRouter>)
      },
      {
        path:"/create-post",
        element:<ProtectedRouter>
          <PostPage />
        </ProtectedRouter>
      },
      {
        path:"/profile-user",
        element:<ProtectedRouter>
          <ProfilePage />
        </ProtectedRouter>
      },
      {
        path:"/notifications",
        element:<ProtectedRouter>
          <NotificationPage />
        </ProtectedRouter>
      }
      
    ]
  }
]);

function App(){
  return (
    <RouterProvider router={router} />
  )
}
export default App;