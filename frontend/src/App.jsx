import { Navbar, Welcome, Footer, Services, Transactions,Exchange } from "./components";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

const App = () => (
  <div className="min-h-screen gradient-bg-transactions">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/services" element={<Services />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/exchange" element={<Exchange />} />
      </Routes>

    {/* <Footer /> */}
    </Router>
   
  </div>
);

export default App;
