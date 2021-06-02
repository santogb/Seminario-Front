import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ProtectedRoute, GerenteRoute, AdministrativoRoute, ProfesorRoute } from './ProtectedRoutes/ProtectedRoute';
import { 
  Login, 
  Home,
  RenewableEnergy,
  ConsumoManual,
  Miscelaneo,
  Estimados,
  DiaADia,
} from './Components';


import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/auth/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />          
          <AdministrativoRoute exact path="/RenewableEnergy" component={RenewableEnergy}/>
          <AdministrativoRoute exact path="/DiaADia" component={DiaADia}/>
          <AdministrativoRoute exact path="/ConsumoManual" component={ConsumoManual}/>
          <AdministrativoRoute exact path="/Estimados" component={Estimados}/>
          <AdministrativoRoute exact path="/Miscelaneo" component={Miscelaneo}/>
          <Route path="*" component={() => "404 not Found"} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;