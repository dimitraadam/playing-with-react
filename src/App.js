import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/AppHeader";
import Home from "./components/Home/Home";
import CoursesGallery from "./components/AllCourses/CoursesGallery";
import CourseDetails from "./components/Course/CourseDetails";
import AddCourse from "./components/NewCourse/AddCourse";
import Notfound from "./components/NotFound";

function App() {
  return (
    <Router>
    <Header />    
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/courses" component={CoursesGallery}></Route>
        <Route exact path="/courses/new" component={AddCourse}></Route>
        <Route exact path="/courses/:id" component={CourseDetails}></Route>
        <Route><Notfound /></Route>
      </Switch>     
    </Router>
  );
}

export default App;
