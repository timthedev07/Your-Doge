import React, { useEffect, useRef, useState } from "react";
import { MenuButton } from "./MenuButton";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import Link from "next/link";
import AvatarData from "../../../avatarData.json";
import { AvatarKeyType } from "../../types/types";

const THRESHOLD = 580;

interface SBItemProps {
  url: string;
  home?: boolean;
}

const SidebarItem: React.FC<SBItemProps> = ({ children, url, home }) => {
  return (
    <div
      className={home ? "side-bar-item side-bar-item-home" : "side-bar-item"}
      onClick={() => window.location.replace(url)}
    >
      {children}
    </div>
  );
};

interface Props {
  transparent: boolean;
}

// Responsive Navigation Bar
export const Nav: React.FC<Props> = ({ transparent }) => {
  const { pathname, push } = useRouter();
  const { authState, currentUser } = useAuth()!;

  const navBarRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // defining a state that holds the current window size
  const [windowWidth, setWindowWidth] = useState(() => window.innerWidth);

  // holding whether or not the sidebar(on smaller screens) is opened
  const [sideBarOpen, setSideBarOpen] = useState(() => false);

  // holding the scrolling progress
  const [scrollY, setScrollY] = useState(() => window.scrollY);

  // holding the location
  const [currPath, setCurrPath] = useState<string>(() => pathname.slice(1));

  // adds a sticky class to nav bar according to the window scroll
  function classManipulator() {
    if (navBarRef && navBarRef.current) {
      var sticky = navBarRef.current.offsetTop;
      setScrollY(window.pageYOffset);
      if (window.pageYOffset >= sticky) {
        navBarRef.current.classList.add("sticky");
      } else {
        navBarRef.current.classList.remove("sticky");
      }
    }
  }

  // create an event listener for changes in screen size(width)
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      classManipulator();
    };

    const handleScroll = () => {
      classManipulator();
    };

    const node = navBarRef.current;

    window.addEventListener("resize", handleResize);

    if (node) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (node) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  });

  useEffect(() => {
    setCurrPath(location.pathname.slice(1));
  }, []);

  // a function that decides whether or not a screen width is small
  const isSmallScreen = () => {
    return windowWidth < THRESHOLD;
  };

  // a function that toggles the sidebar
  const toggleSideBar = () => {
    setSideBarOpen((prev) => !prev);
  };

  const auth = authState();

  const NAV_LINKS = [
    {
      name: "Dashboard",
      url: "/dashboard",
    },
    {
      name: "Contact",
      url: "/contact",
    },
    {
      name: "FAQ",
      url: "/faq",
    },
  ];

  if (auth === "none") {
    NAV_LINKS.push({
      name: "Sign in",
      url: "/auth/login",
    });
  }
  // define the nav bar for larger screens
  const navbar = (
    <div className="nav-bar-background">
      <div
        className={transparent ? "nav-bar nav-bar-transparent" : "nav-bar"}
        ref={navBarRef}
      >
        <Link href="/">
          <a className="nav-item nav-item-home">
            Your Doge&nbsp;&nbsp;&nbsp;&nbsp;
            <img src={"/images/logo.png"} alt="logo" className="nav-logo" />
          </a>
        </Link>

        {NAV_LINKS.map((each) => {
          return (
            <a
              key={each.name}
              className={
                currPath === "/" + each.name
                  ? "nav-item nav-item-active"
                  : "nav-item"
              }
              href={each.url}
            >
              {each.name}
            </a>
          );
        })}

        {auth === "auth" ? (
          <Link href="/account" passHref>
            <div
              style={{ marginLeft: "auto", cursor: "pointer" }}
              className="nav-item"
            >
              <img
                style={{ width: "80%", height: "80%" }}
                src={`/images/avatars/${
                  AvatarData[`${currentUser!.avatarId}` as AvatarKeyType]
                }.svg`}
                alt=""
              />
            </div>
          </Link>
        ) : null}
      </div>
    </div>
  );

  // define the sidebar for smaller devices
  const sidebar = (
    <>
      <div className={`menu-btn-container ${scrollY <= 0 ? "sticky" : ""}`}>
        <MenuButton open={sideBarOpen} onClick={toggleSideBar} />
      </div>
      <div
        ref={sidebarRef}
        className={`side-bar side-bar-${sideBarOpen ? "opened" : "closed"}`}
      >
        <div
          className="side-bar-item side-bar-item-home"
          onClick={() => push("/")}
        >
          <img src="/images/logo.png" alt="" className="sidebar-logo" />
        </div>
        {NAV_LINKS.map((each) => (
          <SidebarItem key={each.name} url={each.url}>
            {each.name}
          </SidebarItem>
        ))}
        {auth === "auth" && (
          <SidebarItem url="/account">
            <img
              style={{ width: "95%", height: "95%" }}
              src={`/images/avatars/${
                AvatarData[`${currentUser!.avatarId}` as AvatarKeyType]
              }.svg`}
              alt=""
            />
          </SidebarItem>
        )}
      </div>
    </>
  );

  return isSmallScreen() ? sidebar : navbar;
};
