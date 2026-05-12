import { useState, useEffect } from "react";

const App = () => {
  const getInitialTheme = () => {
    return (
      localStorage.getItem("theme") ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  };
  const [theme, setTheme] = useState(getInitialTheme());
  useEffect(() => {
    if (theme === "dark") {
      window.document.documentElement.classList.add("dark");
    } else {
      window.document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="dark:bg-red-500 bg-gray-800 text-white p-4">
      App
      <div className="flex gap-2">
        <p>{theme}</p>
        <button onClick={() => setTheme("dark")}>dark</button>
        <button onClick={() => setTheme("light")}>light</button>
      </div>

      

    </div>
  );
};

export default App;
