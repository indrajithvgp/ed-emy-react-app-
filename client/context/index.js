import { useReducer, createContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const INITIAL_STATE = {
  user: null,
};

const Context = createContext();

const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, INITIAL_STATE);
  const router = useRouter();

  axios.interceptors.response.use(
    function (response) {
      if (
        response.status === 401 &&
        response.config &&
        !response.config.__isRetryRequest
      ) {
        return new Promise(function (resolve, reject) {
          axios
            .get("/api/logout")
            .then((data) => {
              console.log("/401 error > logout");
              console.log(data);
              disptach({ type: "LOGOUT" });
              localStorage.removeItem("user");
              router.push("/login");
              resolve();
            })
            .catch((err) => {
              console.log(err);
              console.log("AXIOS INTERCEPTOR ERROR");
              reject(err);
            });
        });
      }
      return response;
    },
    function (error) {
      console.log(error)
      // let res = error.response;
      // if (
      //   error.response.status === 401 &&
      //   error.response.config &&
      //   !error.response.config.__isRetryRequest
      // ) {
      //   return new Promise(function (resolve, reject) {
      //     axios
      //       .get("/api/logout")
      //       .then((data) => {
      //         console.log("/401 error > logout");
      //         disptach({ type: "LOGOUT" });
      //         localStorage.removeItem("user");
      //         router.push("/login");
      //         resolve();
      //       })
      //       .catch((err) => {
      //         console.log("AXIOS INTERCEPTOR ERROR");
      //         reject(err);
      //       });
      //   });
      // }
      return Promise.reject(error);
    }
  );

  // useEffect(() => {
  //   const getCsrfToken = async () => {
  //     const { data } = await axios.get("/api/csrf-token");
  //     //check
  //     console.log("csrf",data);
  //     axios.defaults.headers["X-CSRF-Token"] = data.csrfToken;
  //   };
  //   getCsrfToken();
  // }, []);

  useEffect(() => {
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(localStorage.getItem("user")),
    });
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
