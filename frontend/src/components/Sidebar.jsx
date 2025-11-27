import { NavLink } from "react-router-dom";
import { FiHome, FiGrid, FiLayers, FiPackage } from "react-icons/fi";

const Sidebar = () => {
  const navItems = [
    { path: "/dashboard", icon: FiHome, label: "Home" },
    { path: "/category", icon: FiGrid, label: "Category" },
    { path: "/subcategory", icon: FiLayers, label: "Subcategory" },
    { path: "/products", icon: FiPackage, label: "Products" },
  ];

  return (
    <aside className="w-64 bg-white shadow-md min-h-[calc(100vh-64px)]">
      <nav className="py-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-6 py-3 transition ${
                    isActive
                      ? "bg-primary text-white border-l-4 border-secondary"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <item.icon className="text-xl" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
