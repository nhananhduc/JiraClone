import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import Home from './pages/Home/Home';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import { UserLoginTemplate } from './templates/HomeTemplate/UserLoginTemplate';
import LoginCyberBugs from './pages/CyberBugs/LoginCyberBugs/LoginCyberBugs';
import LoadingComponent from './components/GlobalSetting/LoadingComponent/LoadingComponent';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CyberBugsTemplate } from './templates/HomeTemplate/CyberBugsTemplate';
import IndexCyberBugs from './pages/CyberBugs/ProjectDetail/IndexCyberBugs';
import CreateProject from './pages/CyberBugs/CreateProject/CreateProject';
import ProjectManagement from './pages/CyberBugs/ProjectManagement/ProjectManagement';
import DrawerCyberBugs from './HOC/Modal/CyberBugsHOC/DrawerCyberBugs';
import UserSignUp from './pages/UserManagement/UserSignUp/UserSignUp';
import UserManagement from './pages/UserManagement/UserSignUp/UserManagement';
function App() {

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'ADD_HISTORY', history: history });
  }, [])

  return (
    <>
      <LoadingComponent />
      <DrawerCyberBugs />
      <Switch>
        <CyberBugsTemplate path='/home' exact Component={ProjectManagement} />
        <CyberBugsTemplate path='/' exact Component={ProjectManagement} />
        <UserLoginTemplate exact path='/login' Component={LoginCyberBugs} />
        <UserLoginTemplate exact path='/signup' Component={UserSignUp} />
        <CyberBugsTemplate exact path='/cyberbugs' Component={IndexCyberBugs} />
        <CyberBugsTemplate exact path='/createproject' Component={CreateProject} />
        <CyberBugsTemplate exact path='/projectdetail/:projectId' Component={IndexCyberBugs} />
        <CyberBugsTemplate exact path='/projectmanagement' Component={ProjectManagement} />
        <CyberBugsTemplate exact path='/usermanagement' Component={UserManagement} />
      </Switch>
    </>
  );
}

export default App;
