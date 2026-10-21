import { createBrowserRouter } from "react-router-dom";
import {Home} from "../src/pages/home/index"
import {NetWorks} from "../src/pages/networks"
import {Login} from "../src/pages/login"
import {Admin} from "../src/pages/admin"
import {NotFound} from "../src/pages/404"

import {Private} from "./routes/Private"

const router = createBrowserRouter([


  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/admin/social",
    element: <NetWorks/>
  },
  {
    path: "/admin",
    element: <Private> <Admin/> </Private>
  },
  {
    path: "*",
    element: <NotFound/>
  },
])


export {router};