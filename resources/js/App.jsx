import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserForm from "./client_page/UserForm";
import CongratsPage from "./client_page/CongratsPage";
import UserData from "./admin_page/UserData";
import OfficeUse from "./client_page/OfficeUse";

function App() {
  return (
    <div className="font-poppins">
        <Router>
            <Routes>
                <Route path="/" element={<UserForm />} />
                <Route path="/congrats" element={<CongratsPage />} />
                <Route path="/user-data" element={<UserData />} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
