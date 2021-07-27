import React, { useEffect, useRef, useState } from "react";
import { MenuButton } from "./MenuButton";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";

const THRESHOLD = 481;

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
  const { authState } = useAuth()!;

  // create a ref for the navigation bars and some of their components
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

    window.addEventListener("resize", handleResize);

    if (navBarRef.current) {
      window.addEventListener("scroll", handleScroll);
    }
  });

  useEffect(() => {
    setCurrPath(location.pathname.slice(1));
  }, []);

  // a function that decides whether or not a screen width is small
  const isSmallScreen = () => {
    return windowWidth < THRESHOLD;
  };

  // a function that toggle the sidebar
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
      name: auth === "auth" ? "Account" : "Sign In",
      url: auth === "auth" ? "/account" : "/login",
    },
    {
      name: "Pricing",
      url: "/pricing",
    },
  ];

  // define the nav bar for larger screens
  const navbar = (
    <div className="nav-bar-background">
      <div
        className={transparent ? "nav-bar nav-bar-transparent" : "nav-bar"}
        ref={navBarRef}
      >
        <a className="nav-item nav-item-home" href="/">
          Your Doge&nbsp;&nbsp;&nbsp;&nbsp;
          <img src={"/images/logo.png"} alt="logo" className="nav-logo" />
        </a>

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
        ></div>
        {NAV_LINKS.map((each) => (
          <SidebarItem key={each.name} url={each.url}>
            {each.name}
          </SidebarItem>
        ))}
      </div>
    </>
  );

  return isSmallScreen() ? sidebar : navbar;
};
