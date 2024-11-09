import { createBrowserRouter } from "react-router-dom";
import { MainLayout, AdminLayout, UserLayout, GuestLayout } from "../layouts";
import NotFound from "../pages/NotFound";

// Import menggunakan barrel exports
import { Homepage, About, Contact } from "../pages/Public";
import { Login, Register } from "../pages/Authentication";
import { Homepage as UserHomepage, Explore, Profile, Transactions, Cart } from "../pages/User";
import { Dashboard, ManageUsers, ManagePromos, ManageCategories, ManageBanners } from "../pages/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      }
    ]
  },
  {
    path: "/user",
    element: <UserLayout />,
    children: [
      {
        path: "homepage",
        element: <UserHomepage />
      },
      {
        path: "explore",
        element: <Explore />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "transactions",
        element: <Transactions />
      },
      {
        path: "cart",
        element: <Cart />
      }
    ]
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "users",
        element: <ManageUsers />
      },
      {
        path: "promos",
        element: <ManagePromos />
      },
      {
        path: "categories",
        element: <ManageCategories />
      },
      {
        path: "banners",
        element: <ManageBanners />
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export default router; 