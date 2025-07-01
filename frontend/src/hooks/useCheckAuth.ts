import { checkAuth } from "../store/userSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";


const useCheckAuth = () => {
  const store = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  return store;
};

export default useCheckAuth;