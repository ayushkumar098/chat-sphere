import Sidebar from "../components/sidebar";
import Chat from "../components/chat";

const Home = ()=>{
    return (
      <div className="container">
        <div className="home-container">
            <Sidebar />
            <Chat />
        </div>
      </div>
    );
}
 
export default Home;
