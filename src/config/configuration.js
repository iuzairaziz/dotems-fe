class Configuration {
  // apiBaseUrl = 'https://autodeals-be.herokuapp.com/';
  apiBaseUrl = "http://localhost:8080/"; //be2 is for second option if be free hours expired
  // apiBaseUrl = 'http://localhost:4000/';
  // hostUrl = 'http://localhost:3000';
  hostUrl = "https://autodeals-web.firebaseapp.com";
  Roles = {
    ADMIN: "Admin",
    PM: "Project Manager",
    HR: "HR",
    EMPLOYEE: "Employee",
    CEO: "CEO",
    PROBATION: "Probation",
    INTERNEE: "Internee",
    AM: "Accounts Manager",
  };
}

export default Configuration;
