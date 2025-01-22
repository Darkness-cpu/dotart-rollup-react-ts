import React, { useEffect } from "react";

const App: React.FC = () => {
  useEffect(() => {
    console.log("App mounted");
  }, []);

  return <div>My App</div>;
};

export default App;
