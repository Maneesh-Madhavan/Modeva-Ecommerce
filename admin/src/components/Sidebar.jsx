import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r border-gray-200 px-3 md:px-4">
      <div className="flex flex-col gap-4 pt-6 items-center text-[15px]">

        <NavLink 
          className="flex items-center border border-gray-300 px-4 py-2 w-full max-w-[140px] rounded hover:bg-gray-100 transition"
          to="/add"
        >
          <div className="w-6 flex justify-center">
            <img className="w-5 h-5 sm:w-6 sm:h-6" src={assets.add_icon} alt="" />
          </div>
          <p className="hidden md:block ml-2 truncate">Add Items</p>
        </NavLink>

        <NavLink 
          className="flex items-center border border-gray-300 px-4 py-2 w-full max-w-[140px] rounded hover:bg-gray-100 transition"
          to="/list"
        >
          <div className="w-6 flex justify-center">
            <img className="w-5 h-5 sm:w-6 sm:h-6" src={assets.order_icon} alt="" />
          </div>
          <p className="hidden md:block ml-2 truncate">List Items</p>
        </NavLink>

        <NavLink 
          className="flex items-center border border-gray-300 px-4 py-2 w-full max-w-[140px] rounded hover:bg-gray-100 transition"
          to="/orders"
        >
          <div className="w-6 flex justify-center">
            <img className="w-5 h-5 sm:w-6 sm:h-6" src={assets.order_icon} alt="" />
          </div>
          <p className="hidden md:block ml-2 truncate">Orders</p>
        </NavLink>

      </div>
    </div>
  );
}

export default Sidebar;
