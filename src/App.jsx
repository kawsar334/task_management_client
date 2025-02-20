import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import * as ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageTitle from './components/PageTitle';
import Layout from './pages/Layouts/Layout';
import NotFound from './pages/Notfound';
import ProtectedRoute from './ProtectedRoute';
import { RedirectRoute } from './pages/RedirectRoute';
import Profile from './pages/Layouts/Profile';
import Register from './pages/Register';
import TaskForm from './pages/TaskForm';
import TaskDetails from './pages/SingleTask';
import MyTask from './pages/MyTask';

function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,

      children: [
        {
          path: "/",
          element: (
            <PageTitle title="Home">
              <ProtectedRoute>
              <Home />

              </ProtectedRoute>
            </PageTitle>
          ),
        },
        {
          path: "/addtask",
          element: (<PageTitle title="Add task">
            <ProtectedRoute>
              <TaskForm />
            </ProtectedRoute>
          </PageTitle>),
        },
        {
          path: "/mytask",
          element: (<PageTitle title="My task">
            <ProtectedRoute>
              <MyTask />
            </ProtectedRoute>
          </PageTitle>),
        },
        {
          path: "/task/:id",
          element: (<PageTitle title="Add task">
            <ProtectedRoute>
              <TaskDetails />
            </ProtectedRoute>
          </PageTitle>),
        },

        {
          path: "/profile",
          element: (
            <PageTitle title="profile">
              <ProtectedRoute>
              <Profile />
              </ProtectedRoute>
            </PageTitle>
          ),
        },
        {
          path: "/login",
          element: (<PageTitle title="Login">
            <>
            <Login />
            </>
          </PageTitle>),

        },
       
        {
          path: "/register",
          element: (<PageTitle title="Register">
            <>
              <Register />
            </>
          </PageTitle>),
        },
      ],
    },
    {
      path: "*",
      element: (
        <PageTitle title="404 Not Found">
          <NotFound />
        </PageTitle>
      ),
    },

  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
