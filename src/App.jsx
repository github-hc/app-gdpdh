import './App.css';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import InvoiceMainLayoutRoute from './layouts/invoice/invoice-main-layout';
import AddPatientDetails from './components/invoice/add-patient-details/add-patient-details';
import ViewPatientDetails from './components/invoice/view-patient-details/view-patient-details';
import Auth from './components/invoice/auth/auth';
import PublicWebLayoutRoute from './layouts/public-web/public-web-layout';
import Home from './components/public-web/home/home';
import IndexPublicWeb from './components/public-web/index-public-web';
import DentalServices from './components/public-web/dental-services/dental-services';
import About from './components/public-web/about/about';
import Contact from './components/public-web/contact/contact';

const App = () =>{

  return(
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' >
            <Redirect to='/home' />
          </Route>
          <Route exact path={'/invoice/sign-in'} component={Auth} />

          <PublicWebLayoutRoute exact path="/home" component={IndexPublicWeb} />
          {/* <PublicWebLayoutRoute exact path="/services" component={DentalServices} />
          <PublicWebLayoutRoute exact path="/about" component={About} />
          <PublicWebLayoutRoute exact path="/contact" component={Contact} /> */}

          <InvoiceMainLayoutRoute exact path="/invoice/add-patient-details:id?" component={AddPatientDetails} />
          <InvoiceMainLayoutRoute exact path="/invoice/view-patient-details" component={ViewPatientDetails} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
