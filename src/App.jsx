import Router from "./app/Router.jsx";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Router />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            minWidth: "300px", 
            padding: "16px",
            fontSize: "16px",
            background: "#white",
            border: "1px solid #ccc",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            color: "#333",
            borderRadius: "8px",
          },
        }}
      />
    </>
  );
};

export default App;
