import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { isConnected, esRolGerente, esRolAdministrativo, esRolProfesor } from '../Services/sessionServices';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
   
   /**
    * Lógica:
    * 
    * Este componente se va a encargar de detectar si el usuario está o no conectado
    * Consulta mediante la funcion ProtectedRoutes.isConnected() y según en valor que le retorne,
    * redirecciona al componente dashboard o te lleva al componente login para que
    * inicies sesión
    * 
    */

   return (

      <Route
         {...rest}
         render={props => {
            if (isConnected()) {
               return <Component {...props} />
            } else {
               return <Redirect
                  to={{
                     pathname: '/auth/login',
                     state: {
                        from: props.location
                     }
                  }}
               />
            }
         }
         }
      />
   )
};

export const GerenteRoute = ({ component: Component, ...rest }) => {
   
   return (

      <Route
         {...rest}
         render={props => {
            if (isConnected() && esRolGerente()) {
               return <Component {...props} />
            } else {
               return <Redirect
                  to={{
                     pathname: '/auth/login',
                     state: {
                        from: props.location
                     }
                  }}
               />
            }
         }
         }
      />
   )
};

export const AdministrativoRoute = ({ component: Component, ...rest }) => {
   
   return (

      <Route
         {...rest}
         render={props => {
            if (isConnected() && esRolAdministrativo()) {
               return <Component {...props} />
            } else {
               return <Redirect
                  to={{
                     pathname: '/auth/login',
                     state: {
                        from: props.location
                     }
                  }}
               />
            }
         }
         }
      />
   )
};

export const ProfesorRoute = ({ component: Component, ...rest }) => {
   
   return (

      <Route
         {...rest}
         render={props => {
            if (isConnected() && esRolProfesor()) {
               return <Component {...props} />
            } else {
               return <Redirect
                  to={{
                     pathname: '/auth/login',
                     state: {
                        from: props.location
                     }
                  }}
               />
            }
         }
         }
      />
   )
};