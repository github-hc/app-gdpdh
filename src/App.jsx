import './App.css';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import InvoiceMainLayoutRoute from './layouts/invoice/invoice-main-layout';
import AddPatientDetails from './components/invoice/add-patient-details/add-patient-details';
import ViewPatientDetails from './components/invoice/view-patient-details/view-patient-details';
import Auth from './components/invoice/auth/auth';
import PublicWebLayoutRoute from './layouts/public-web/public-web-layout';
import IndexPublicWeb from './components/public-web/index-public-web';

const App = () =>{
  return(
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' >
            <Redirect to='/home' />
          </Route>
          <Route exact path='/invoice' >
            <Redirect to='/invoice/sign-in' />
          </Route>

          <Route exact path={'/invoice/sign-in'} component={Auth} />
          <PublicWebLayoutRoute exact path="/home" component={IndexPublicWeb} />
          <InvoiceMainLayoutRoute exact path="/invoice/add-patient-details:id?" component={AddPatientDetails} />
          <InvoiceMainLayoutRoute exact path="/invoice/view-patient-details" component={ViewPatientDetails} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
