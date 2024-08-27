import Image from "next/image";
import Link from "next/link";
import { removingUser } from "@/lib/removingUser";
import { useState } from "react";
import { isAuthenticated } from "@/lib/isAuthenticated";
import { useEffect } from "react";
import Router from "next/router";
export default function SideBar(){
  const router = Router;
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    
    setIsUser(isAuthenticated());
  }, []);
  
  const handleUserSignInOut = async () => {
    if(isUser){
    if(window.confirm("Are you sure you want to sign out?")){
       removingUser();
      window.location.href = "/user/login";
    }
  }
  else{
    window.location.href = "/user/login";
  }
  }
    const [showMenu, setShowMenu] = useState(false);
    return (
      <>
        <div
          className="fixed top-0 w-full flex justify-between items-center flex-wrap z-50"
          style={{ backgroundColor: "#ab171c" }}
        >
          <div className="m-3 left-0">
            <span>
              <Image
                src="/SS_Logo_hd.png"
                alt="SSF Logo"
                width={150}
                height={150}
              />
            </span>
          </div>
          <div className="hidden lg:block">
            <div className=" flex  justify-around m-3 text-2xl">
              <span className=" mx-3 text-decoration-line: none">
                <Link href="/" className="no-underline text-white">
                  Home
                </Link>
              </span>
              <span className=" mx-3 text-decoration-line: none">
                <Link href="/events" className="no-underline text-white">
                  Events
                </Link>
              </span>
              <span className=" mx-3 text-decoration-line: none">
                <Link href="/activities" className="no-underline text-white">
                  Activities
                </Link>
              </span>
              <span className=" mx-3 text-decoration-line: none">
                <Link href="/ask" className="no-underline text-white">
                  Ask
                </Link>
              </span>
              <span className=" mx-3 text-decoration-line: none">
                <Link href="/notification" className="no-underline text-white">
                  Notification
                </Link>
              </span>
              <span className=" mx-3 text-decoration-line: none">
                <Link href="/profile" className="no-underline text-white">
                  Profile
                </Link>
              </span>
            </div>
          </div>
          <div className="m-3 text-white text-2xl hidden lg:block  right-0">
            <span>
              <button onClick={handleUserSignInOut}>
                {isUser ? "Sign Out" : "Sign In"}
              </button>
            </span>
          </div>
          <div className="m-3 right-0 lg:hidden block">
            <button onClick={() => setShowMenu(!showMenu)}>
              <Image src="/hamburger.png" alt="menu" width={50} height={50} />
            </button>
          </div>
        </div>
        <div
          className={`fixed right-0 lg:hidden p-0 m-0 ${
            showMenu ? " h-full opacity-100 z-2 " : " h-0 opacity-0"
          } transition-all ease-in-out duration-500`}
          style={{ backgroundColor: "#ab171c" }}
        >
          <div
            className={`min-w-1/2 h-full justify-center items-center text-2xl ${
              showMenu ? "flex flex-col" : "hidden"
            }`}
          >
            <span className=" m-3 text-decoration-line: none">
              <Link href="/" className="no-underline text-white">
                Home
              </Link>
            </span>
            <span className=" m-3 text-decoration-line: none">
              <Link
                href="/events"
                onClick={(e) => {
                  setShowMenu(false);
                }}
                className="no-underline text-white"
              >
                Events
              </Link>
            </span>
            <span className=" m3 text-decoration-line: none">
              <Link
                href="/activities"
                onClick={(e) => {
                  setShowMenu(false);
                }}
                className="no-underline text-white"
              >
                Activities
              </Link>
            </span>
            <span className=" m-3 text-decoration-line: none">
              <Link
                href="/ask"
                onClick={(e) => {
                  setShowMenu(false);
                }}
                className="no-underline text-white"
              >
                Ask
              </Link>
            </span>
            <span className=" m-3 text-decoration-line: none">
              <Link
                href="/notification"
                onClick={(e) => {
                  setShowMenu(false);
                }}
                className="no-underline text-white"
              >
                Notification
              </Link>
            </span>
            <span className=" m-3 text-decoration-line: none">
              <Link
                href="/profile"
                onClick={(e) => {
                  setShowMenu(false);
                }}
                className="no-underline text-white"
              >
                Profile
              </Link>
            </span>

            <button
              onClick={handleUserSignInOut}
              className="text-white m-3
            "
            >
              {isUser ? "Sign Out" : "Sign In"}
            </button>
          </div>
        </div>
      </>
    );
}