<p align='center'>
    <h3 align='center'> Reto-Devco </h3>
    <h3 align='center'>Prueba Tecnica Ingeniero de Desarrollo</h3>
  <p>

  ___

  > Aplicacion web diseñada para el manejo de las pruebas tecnicas realizadas a los aspirantes tanto desde su construccion como registrso almacenamiento y modificacion de las pruebas y los aspirantes

  ### Construido con 🔨

  * React
  * Apollo
  * Tailwind
  * Next.js
  * MongoDB
  

  ## Empezando 🚀

  Mediante los siguientes pasos podremos desplegar el proyecto de manera local

  ### Prerrequisitos 📋 e  Instalación 🔧
  
  node.js
  Tener instalado MongoDB Compasss
  Conectar MongoDB Compass con el servidor de apollo client por del siguiente string (mongodb+srv://root:micofenolato1117@cluster0.zqqwg.mongodb.net/test)
  Dado a que la base de datos se encuentra en un servidor virtual se requiere de autenticacion a la hora de hacer uso de este solo requiero que en el momneto que se realice la     conceccion de todo se me envie un correo electronico para dar acceso, esto se realiza una unica vez
  <br>
 
 ## Inicializacion el Proyecto
 Posicionarse e la carpeta del proyecto
 Abrir Consola
 Ingresar el comando npm run dev tanto para desplezar el proyecto como la base de datos

  ## Como se usa ⚙️
  Una vez desplegado el proyecto se debe proceder a crear una NUeva Cuenta para poder realizar una autenticacion con el login ya que el proyecto fue pensado para se pudiera      utilizar desde diferentes enfotes tecnicos es decir que diferentes gerentees tecnicos pudieran uzar la herramienta.
 
 Una vez se crea la cuenta la palicacion te redirecciona a login donde te loguearas con el correo electronico y una contraseña.
 Por consiguiente entraras a la pagina principal del proyecto dondese cargaran los aspirantes y se podra empezar a interactuar con la pagina.
 Una vez estando en la pagina principal se puede editar crear y eliminar aspirantes, donde cada uno de los campos de los formularios a lso que se envian son obligatorios.
 Ingreso de preguntas: una vez terminado el ingreso del aspirantes se podra realizar el ingreso de las respues y preguntas respondidas por el aspirantes. Cada aspirante cuando     se ingresa tiene una calificacion por defecto sin evaluar. Tener en cuenta que las preguntas tambien poseen la 
 A continuacion tendremos la parte de las pruebas donde se puede selecionar un aspirante, y un minimo de 8 respuestas determinar su evaluacion y saber si queda en uno de los tres estados Presentando, Recahzado o Aceptado. La prueba antes e ser creado permite la visualizacion de las preguntas para su correccion y una vez la ´prueba se crea este solo puede modificar su estado o ser eleiminado completamente. El framework de css que se utilizo fue tailwind.


##Graphql

 type GerenteTecnico {
  id: ID
  nombre: String
  apellido: String
  email: String
  created: String
}

type Token {
  token: String
}

type Pregunta {
  id: ID
  nombre: String
  respuesta: String
  created: String
}

type Aspirante {
  id: ID
  nombre: String
  apellido: String
  email: String
  resultado: String
  telefono: String
  gerenteTecnico: ID
}

type Prueba {
  id: ID
  prueba: [PruebaGrupo]
  aspirante: Aspirante
  gerenteTecnico: ID
  fecha: String
  estado: EstadoPrueba
}

type PruebaGrupo {
  id: ID
  nombre: String
  respuesta: String
}

input GerenteTecnicoInput {
  nombre: String!
  apellido: String!
  email: String!
  password: String!
}

input AutenticarInput {
  email: String!
  password: String!
}

input PreguntaInput {
  nombre: String!
  respuesta: String!
}

input AspiranteInput {
  nombre: String!
  apellido: String!
  email: String!
  resultado: String
  telefono: String!
}

input PruebaPreguntaInput {
  id: ID
  nombre: String
  respuesta: String
}

input PruebaInput {
  prueba: [PruebaPreguntaInput]
  aspirante: ID
  estado: EstadoPrueba
}

enum EstadoPrueba {
  Presentando
  Aceptado
  Rechazado
}

type Query {
  obtenerGerenteTecnico: GerenteTecnico
  obtenerPreguntas: [Pregunta]
  obtenerPregunta(id: ID!): Pregunta
  obtenerAspirantes: [Aspirante]
  obtenerAspirantesGerente: [Aspirante]
  obtenerApirante(id: ID!): Aspirante
  obtenerPruebas: [Prueba]
  obtenerPruebasGerente: [Prueba]
  obtenerPrueba(id: ID!): Prueba
  obtenerPruebaEstado(estado: String!): [Prueba]
}

type Mutation {
  nuevoGerenteTecnico(input: GerenteTecnicoInput): GerenteTecnico
  autenticarGerenteTecnico(input: AutenticarInput): Token
  nuevaPregunta(input: PreguntaInput): Pregunta
  actualizarPregunta(id: ID!, input: PreguntaInput): Pregunta
  eliminarPregunta(id: ID!): String
  nuevoAspirante(input: AspiranteInput): Aspirante
  actualizarAspirante(id: ID!, input: AspiranteInput): Aspirante
  eliminarAspirante(id: ID!): String
  nuevaPrueba(input: PruebaInput): Prueba
  actualizarPrueba(id: ID!, input: PruebaInput): Prueba
  eliminarPrueba(id: ID!): String
}
    
  
