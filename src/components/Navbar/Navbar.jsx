import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/Frsh Cart Icon.svg";
import { useContext, useState } from "react";
import { userContext } from "../../Context/User.context";
import { CartContext } from "../../Context/Cart.context";
import { wishListContext } from "../../Context/WishList.context";

export default function Navbar() {
  const { token, Logout } = useContext(userContext);
  const { wishInfo } = useContext(wishListContext);
  const { cartInfo } = useContext(CartContext);

  const [navStat, setNavStat] = useState("hidden");

  const navToggle = () => {
    setNavStat((prevState) => (prevState === "hidden" ? "absolute" : "hidden"));
  };

  return (
    <nav className="bg-slate-100 py-5 fixed left-0 right-0 z-50 px-6 md:px-2">
      <div className="container flex items-start justify-between gap-4">
        <div className="logo-page">
          <Link to="/" className="flex items-center justify-center gap-2 mr-2">
            <img src={logo} alt="logo freshcart" className="w-8" />
            <h1 className="font-bold text-black text-lg sm:text-xl md:text-2xl">
              Fresh Cart
            </h1>
          </Link>
        </div>

        <div className="nav-list flex grow md:gap-0 xl:gap-8 items-center">
          {token && (
            <div className={`${navStat} md:block rounded-b-xl -bottom-[283px] bg-slate-100 w-full left-0`}>
              <div className="flex justify-between bg-slate-100 items-center">
                <ul className="flex ml-10 md:ml-0 md:items-start md:mr-4 gap-5 flex-col md:flex-row">
                  <li className="text-lg text-gray-600 font-medium">
                    <NavLink
                      className={({ isActive }) =>
                        `relative before:absolute before:h-[2px] before:w-0 before:bg-primay-600 before:left-0 before:bottom-[-3px] ${isActive ? "before:!w-full font-bold" : ""}`
                      }
                      to="/"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="text-lg text-gray-600 font-medium">
                    <NavLink
                      className={({ isActive }) =>
                        `relative before:absolute before:h-[2px] before:w-0 before:bg-primay-600 before:left-0 before:bottom-[-3px] ${isActive ? "before:!w-full font-bold" : ""}`
                      }
                      to="/Cart"
                    >
                      Cart
                    </NavLink>
                  </li>
                  <li className="text-lg text-gray-600 font-medium">
                    <NavLink
                      className={({ isActive }) =>
                        `relative before:absolute before:h-[2px] before:w-0 before:bg-primay-600 before:left-0 before:bottom-[-3px] ${isActive ? "before:!w-full font-bold" : ""}`
                      }
                      to="/Products"
                    >
                      Products
                    </NavLink>
                  </li>
                  <li className="text-lg text-gray-600 font-medium">
                    <NavLink
                      className={({ isActive }) =>
                        `relative before:absolute before:h-[2px] before:w-0 before:bg-primay-600 before:left-0 before:bottom-[-3px] ${isActive ? "before:!w-full font-bold" : ""}`
                      }
                      to="/WishList"
                    >
                      wishlist
                    </NavLink>
                  </li>
                  <li className="pb-16 md:pb-0 text-lg text-gray-600 font-medium">
                    <NavLink
                      className={({ isActive }) =>
                        `relative before:absolute before:h-[2px] before:w-0 before:bg-primay-600 before:left-0 before:bottom-[-3px] ${isActive ? "before:!w-full font-bold" : ""}`
                      }
                      to="/allorders"
                    >
                      Orders
                    </NavLink>
                  </li>
                </ul>

                <div className="absolute left-[36px] bottom-[18px] md:static">
                  <div className="flex justify-center items-center gap-6 md:gap-4">
                    <Link to="/WishList" className="icon-cart relative">
                      <i className="fa-solid fa-heart cursor-pointer text-red-600 text-2xl"></i>
                      {wishInfo?.count > 0 && (
                        <div className="card-length">
                          <div className="flex justify-center items-center w-5 h-5 absolute rounded-full text-white font-semibold bg-primay-600 -top-0 left-1 -translate-y-1/2 translate-x-1/2">
                            <span className="text-sm">{wishInfo.count}</span>
                          </div>
                        </div>
                      )}
                    </Link>
                    <Link to="/Cart" className="icon-cart relative">
                      <i className="fa-solid fa-cart-shopping cursor-pointer text-black text-2xl"></i>
                      {cartInfo?.numOfCartItems > 0 && (
                        <div className="card-length">
                          <div className="flex justify-center items-center w-5 h-5 absolute rounded-full text-white font-semibold bg-primay-600 -top-0 left-1 -translate-y-1/2 translate-x-1/2">
                            <span className="text-sm">{cartInfo.numOfCartItems}</span>
                          </div>
                        </div>
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="button flex items-center gap-6">
            {!token ? (
              <>
                <NavLink
                  className={({ isActive }) =>
                    `relative text-black before:absolute before:h-[2px] before:w-0 before:bg-primay-600 before:left-0 before:bottom-[-3px] ${isActive ? "before:!w-full font-bold" : ""}`
                  }
                  to="/Signup"
                >
                  Signup
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    `relative text-black before:absolute before:h-[2px] before:w-0 before:bg-primay-600 before:left-0 before:bottom-[-3px] ${isActive ? "before:!w-full font-bold" : ""}`
                  }
                  to="/Login"
                >
                  Login
                </NavLink>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={navToggle}
                  className="md:hidden block bg-gray-200 text-gray-600 rounded-lg border-2 border-transparent focus:text-gray-800 focus:border-gray-300 py-1 px-2"
                >
                  <i className="fa-solid fa-bars text-xl"></i>
                </button>
                <button
  onClick={Logout}
  className="logout flex items-center gap-2 text-lg hover:scale-105 hover:text-red-700 text-gray-700 hover:text-gray-800 transition-all"
>
  <span className="font-bold">LogOut</span>
  <i className="fa-solid fa-right-from-bracket text-2xl"></i>
</button>

              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
