import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ProtectedRoute, GerenteRoute, AdministrativoRoute, ProfesorRoute } from './ProtectedRoutes/ProtectedRoute';
import { 
  Login, 
  Home,
  RenewableEnergy,
  ConsumoManual,
  Facturacion
} from './Components';


import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/auth/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <AdministrativoRoute exact path="/Facturacion" component={Facturacion} />
          <AdministrativoRoute exact path="/RenewableEnergy" component={RenewableEnergy} />
          <AdministrativoRoute exact path="/ConsumoManual" component={ConsumoManual} />
          <Route path="*" component={() => "404 not Found"} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;