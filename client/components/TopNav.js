import { Menu } from "antd";
import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";
import axios from "axios";
import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
  CoffeeOutlined,
  TeamOutlined,
  CarryOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";

const { Item, SubMenu } = Menu;

const Topnav = () => {
  const [current, setCurrent] = useState("");
  const router = useRouter();

  const { state, dispatch } = useContext(Context);
  const { user } = state;
  console.log("topnav");

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({
      type: "LOGOUT",
    });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");

    toast("Logged Out ..!");
    router.push("/login");
  };
  return (
    <>
      <Menu mode="horizontal" selected={[current]} className="mb-2">
        <Item
          key="/"
          onClick={(e) => setCurrent(e.key)}
          icon={<AppstoreOutlined />}
        >
          <Link href="/">
            <a>App</a>
          </Link>
        </Item>
        {user &&
          (user.role && user.role.includes("Instructor") ? (
            <Item
              key="/instructor/course/create"
              onClick={(e) => setCurrent(e.key)}
              icon={<CarryOutlined />}
            >
              <Link href="/instructor/course/create">
                <a>Create Course</a>
              </Link>
            </Item>
          ) : (
            <Item
              key="/user/become-instructor"
              onClick={(e) => setCurrent(e.key)}
              icon={<TeamOutlined />}
            >
              <Link href="/user/become-instructor">
                <a>Become a Instructor</a>
              </Link>
            </Item>
          ))}
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
        {user && user && user.role.includes("Instructor") && (
          <Item
            key="/instructor"
            onClick={(e) => setCurrent(e.key)}
            className="ms-auto"
            icon={<CarryOutlined />}
          >
            <Link href="/instructor/course/create">
              <a>Instructor</a>
            </Link>
          </Item>
        )}
        {user && (
          <SubMenu
            icon={<CoffeeOutlined />}
            className="ms-auto"
            title={user && user.name}
          >
            <Menu.ItemGroup>
              <Item className="ms-auto" key="/user">
                <Link href="/user">
                  <a>Dashboard</a>
                </Link>
              </Item>
              <Item
                key="/logout"
                // className="ms-auto"
                onClick={logout}
              >
                Logout
              </Item>
            </Menu.ItemGroup>
          </SubMenu>
        )}
      </Menu>
    </>
  );
};

export default Topnav;
