import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Table from "./components/Table/Table";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container-md">
        <Table />
      </div>
      <Footer />
    </div>
  );
}

export default App;
