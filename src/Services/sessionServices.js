// Non api internal functionalities
export function isConnected() {
    return getIdUser() && getIdTipoEmpleado() && getActiveSession() && getToken();
}

export function esGerente() { return getIdTipoEmpleado() === "4"; }
export function esAdministrativo() { return getIdTipoEmpleado() === "3"; }
export function esEncargado() { return getIdTipoEmpleado() === "2"; }
export function esProfesor() { return getIdTipoEmpleado() === "1"; }

export function esRolGerente() { return esGerente(); }
export function esRolAdministrativo() { return esGerente() || esAdministrativo(); }    
export function esRolProfesor() { return  esGerente() || esAdministrativo() || esProfesor(); }

export function logOut(cb) {
    removeToken();
    removeActiveSession();
    removeIdUser();
    removeIdTipoEmpleado();
    setTimeout(cb, 100);
}

//Token methods
export function getToken() { return sessionStorage.getItem('token'); }
export function setToken(value) { return sessionStorage.setItem('token', value); }
export function removeToken() { return sessionStorage.removeItem('token'); }

//ActiveSession methods
export function getIdUser() { return localStorage.getItem('idUser'); }
export function setIdUser(value) { return localStorage.setItem('idUser', value); }
export function removeIdUser() { return localStorage.removeItem('idUser'); }

//ActiveSession methods
export function getIdTipoEmpleado() { return localStorage.getItem('idTipoEmpleado'); }
export function setIdTipoEmpleado(value) { return localStorage.setItem('idTipoEmpleado', value); }
export function removeIdTipoEmpleado() { return localStorage.removeItem('idTipoEmpleado'); }

//ActiveSession methods
export function getActiveSession() { return localStorage.getItem('activeSession'); }
export function setActiveSession(value) { return localStorage.setItem('activeSession', value); }
export function removeActiveSession() { return localStorage.removeItem('activeSession'); }
