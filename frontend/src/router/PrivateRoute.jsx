import { Navigate } from 'react-router-dom'

function PrivateRoute ({ children }) {
  const authAdmin = localStorage.getItem('accessToken');
  return authAdmin ? children : <Navigate to={"/login"} />
}

export default PrivateRoute;
