import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import Header from "./components/AppHeader";
import Home from "./components/Home/Home";
import CoursesGallery from "./components/AllCourses/CoursesGallery";
import CourseDetails from "./components/Course/CourseDetails";
import CourseForm from "./components/NewCourse/CourseForm";
import Notfound from "./components/NotFound";
import lightTheme from "./styles/lightTheme";
import { HOME, COURSES, COURSES_NEW} from "./constants/routes";

function App() {
  return (
    <Router>
      <MuiThemeProvider theme={createMuiTheme(lightTheme)}>
        <Header />
        <Switch>
          <Route exact path={HOME} component={Home}></Route>
          <Route exact path={COURSES} component={CoursesGallery}></Route>
          <Route exact path={COURSES_NEW}component={CourseForm}></Route>
          <Route exact path={COURSES + "/:id"} component={CourseDetails}></Route>
          <Route><Notfound /></Route>
        </Switch>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
