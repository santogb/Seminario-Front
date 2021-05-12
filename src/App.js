import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ProtectedRoute, GerenteRoute, AdministrativoRoute, ProfesorRoute } from './ProtectedRoutes/ProtectedRoute';
import { 
  Login, 
  Home,
  Socios, 
  Servicios, 
  Empleados, 
  Ingresos,
  Abonos,
  Facturacion,
  Liquidacion,
  MisDatos,
  DatosEmpresa
} from './Components';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/auth/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProfesorRoute exact path="/socios" component={Socios} />
          <AdministrativoRoute exact path="/servicios" component={Servicios} />
          <GerenteRoute exact path="/empleados" component={Empleados} />
          <AdministrativoRoute exact path="/ingresos" component={Ingresos} />
          <AdministrativoRoute exact path="/abonos" component={Abonos} />
          <AdministrativoRoute exact path="/facturacion" component={Facturacion} />
          <AdministrativoRoute exact path="/liquidacion" component={Liquidacion} />
          <AdministrativoRoute exact path="/misDatos" component={MisDatos} />
          <GerenteRoute exact path="/datosEmpresa" component={DatosEmpresa} />

          <Route path="*" component={() => "404 not Found"} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;