# Validar Encuestas

Para el Observatorio PYME, se participará en el proceso de auditoria de pequeñas y medianas empresas, poniendo foco en la validacion de las encuestas que se envian a tales empresas.


## ¿Para quién está pensada esta solución?
---
Para toda persona que pertenezca al Observatorio que desempeñe el rol de validador o bien analista (Filler) de encuesta, quienes podrán contar con las encuestas recibidas de las PYME's para luego revisarlas, validarlas, escribir comentarios y demás.

## Instalación
---
Pasos para la instalación

1) Abrir una terminal (CMD, PowerShell, o Bash)
2) Dirigirse a la ubicación en donde se alojará el proyecto
3) Correr el siguiente comando: 'git clone https://github.com/39208750/API.git '. Esto descargará el proyecto de GitHub a la ubicación seleccionada.
4) Abrir Visual Studio Code
5) Abrir el proyecto
6) Abrir una nueva terminal de VS Code. Para eso, en la parte superior del editor: 'Terminal -> new terminal'
7) Corra el siguiente comando: 'npm install'. Esto instalará todos los módulos y dependencias requeridas para correr el proyecto de forma local.
8) Corra el siguiente comando: 'npm start'. Esto iniciará el proyecto, abriendo una ventana de su último buscador utilizado.


# Casos de usos.

## Autenticación

- ### Inicio de sesión de un usuario registrado.
  Desde la pantalla de logIn se nos solicitará el Correo Electronico y Contraseña. Luego de completar tales campos debemos presionar en "Ingresar" para iniciar sesión.

  ![Login](images/login.png)

---
## Roles

- ### Vista de Aministrador.    
  Este rol posee permisos para realizar Alta, Baja y Modificacion de los Usuarios que cumplan la funcion de Validador o Filler, asi como tambien Visualizar las encuestas de cada una de las empresas.
  Desde el Home del Administrador se podrá:
  1) Visualizar las empresas y sus encuestas 
  2) Buscar una empresa por su correo electronico.
  3) Buscar una encuesta por su nombre
  4) Acceder al menu de Gestion de Usuarios para dar de alta un nuevo usuario, una baja de usuario existente, o una modificacion en el Rol y/o correo electronico de un usuario.
  5) Comentar y/o aprobar encuestas
  6) Responder encuestas comentadas

  #### Home Administrador
  ![Home Administrador](images/Home%20Admin.png)

  #### Home Gestion Usuarios 
  ![Home Gestion Usuarios](images/Home%20Gestion%20Usuarios.png)

  #### Alta Nuevo Usuario
  ![Alta Usuario](images/Agregar%20User%20desde%20Adm.png)

  #### Modificacion Usuario
  ![Modificacion Usuario](images/Modificacion%20Usuario.png)



- ### Vista de Filler
    Tal rol se encarga de recibir una encuesta que fue comentada por un validador en alguna o varias de sus preguntas, y verificar que las mismas cuenten con sus respuestas acorde a las preguntas designadas. Sobre cada pregunta habrá un boton que le permitirá a este rol indicar si la respuesta esta conforme o no a la pregunta.
    Si el Filler encuentra las respuestas de manera acorde, podrá enviar la encuesta para validar. En caso contrario completará la/s preguntas que deben revisarse y solicitará una revisión.

  #### Home Filler
  ![Home Filler](images/Home%20Filler.png)

  #### Filler Recibiendo revision del Validador
  ![Comentario para el Filler](images/Comentario%20recibido%20visto%20desde%20Filler.png)

  #### Filler Agregando Respuesta
  ![Respuesta Filler](images/Resp%20del%20Filler.png)



- ### Vista de Validador
    Este rol puede visualizar cada una de las encuestas que poseen las empresas listadas. Ya que su actividad consiste en aprobar las encuestas recibidas, podrá aprobar la encuesta en caso que todos los campos estén acorde a lo esperado o bien realizar comentarios sobre uno/varios campos que necesitan una revision, asi como tambien dejar un comentario general.

  #### Home Validador
    ![Home Validador](images/Home%20Validador.png)
    
  #### Vista Encuesta a Validar
    ![Vista Encuesta a Validar](images/Vista%20encuesta%20a%20validar.png)

  #### Aprobar Encuesta
    ![Aprobar Encuesta](images/Aprobar%20Encuesta.png)

  #### Enviar Comentarios al Filler
    ![Envio Comentarios](images/Comentario%20desde%20Validador.png)

  #### Respuesta del Filler al Validador
  ![Respuesta del Filler al Validador](images/Respuesta%20llegada%20al%20aprobador.png)

