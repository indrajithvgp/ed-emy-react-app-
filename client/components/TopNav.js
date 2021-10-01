import { Menu } from "antd";
import { useEffect, useState, useContext } from "react";
import Link from "next/link"; 
import { Context } from "../context";
import { useRouter } from "next/router";
import axios from 'axios'
import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";

const { Item , SubMenu} = Menu;

const Topnav = () => {
  const [current, setCurrent] = useState('')
    const router = useRouter();
   

  const {state, dispatch} = useContext(Context)
   const { user } = state;

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async()=>{
    dispatch({
      type:"LOGOUT",
    })
    window.localStorage.removeItem("user");
    const {data} = await axios.get('/api/logout')
    
    toast("Logged Out ..!")
    router.push('/login')
  }
  return (
    <>
      <Menu mode="horizontal" selected={[current]}>
        <Item
          key="/"
          onClick={(e) => setCurrent(e.key)}
          icon={<AppstoreOutlined />}
        >
          <Link href="/">
            <a>App</a>
          </Link>
        </Item>

        {user == null && (
          <>
            <Item
              key="/login"
              onClick={(e) => setCurrent(e.key)}
              icon={<LoginOutlined />}
            >
              <Link href="/login">
                <a>Login</a>
              </Link>
            </Item>
            <Item
              key="/register"
              onClick={(e) => setCurrent(e.key)}
              icon={<UserAddOutlined />}
            >
              <Link href="/register">
                <a>Register</a>
              </Link>
            </Item>
          </>
        )}
        {/* {user && (
          <Item className="ms-auto" onClick={logout} icon={<LogoutOutlined />}>
            Logout
          </Item>
        )} */}
        {user && (
          <SubMenu icon={<CoffeeOutlined/>} className="ms-auto" title={user.name}>
            <Item
              className="ms-auto"
              onClick={logout}
            >
              Logout
            </Item>
          </SubMenu>
        )}
      </Menu>
    </>
  );
};

export default Topnav;
