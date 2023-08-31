import Search from "./search";
import Navbar from "./navbar";
import Chats from "./chats";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <Navbar />

      <Search />

      <Chats />
    </div>
  );
};

export default Sidebar;
