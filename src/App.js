import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/AppHeader";
import Home from "./components/Home/Home";
import CoursesGallery from "./components/AllCourses/CoursesGallery";
import CourseDetails from "./components/Course/CourseDetails";
import CourseForm from "./components/NewCourse/CourseForm";
import Notfound from "./components/NotFound";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import lightTheme from "./styles/lightTheme";

function App() {
  return (
    <Router>
      <MuiThemeProvider theme={createMuiTheme(lightTheme)}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/courses" component={CoursesGallery}></Route>
          <Route exact path="/courses/new" component={CourseForm}></Route>
          <Route exact path="/courses/:id" component={CourseDetails}></Route>
          <Route><Notfound /></Route>
        </Switch>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
