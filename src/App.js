import { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "Components/BlogCard";
import { Switch, Route } from "react-router-dom";
import BlogDetail from "Components/BlogDetail";
import Navbar from "Components/Navbar";
import Loader from "Components/Loader";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    axios
      .get("https://6157d5c65167ba00174bb987.mockapi.io/data")
      .then((response) => {
        setBlogs(response.data);
        response.status === 200 && setLoader(false);
      });
  }, []);
  return (
    <div className="App">
      <Navbar />
      {loader ? (
        <Loader />
      ) : (
        <Switch>
          <Route exact path="/">
            <BlogCard blogs={blogs} />
          </Route>
          <Route exact path="/:slug">
            <BlogDetail blogs={blogs} />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
