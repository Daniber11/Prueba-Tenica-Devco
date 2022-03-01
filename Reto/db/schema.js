const { gql } = require("apollo-server");

// Schema
const typeDefs = gql`
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
    # GerenteTecnico
    obtenerGerenteTecnico: GerenteTecnico
    # Preguntas
    obtenerPreguntas: [Pregunta]
    obtenerPregunta(id: ID!): Pregunta
    # Aspirante
    obtenerAspirantes: [Aspirante]
    obtenerAspirantesGerente: [Aspirante]
    obtenerApirante(id: ID!): Aspirante
    # Pruebas
    obtenerPruebas: [Prueba]
    obtenerPruebasGerente: [Prueba]
    obtenerPrueba(id: ID!): Prueba
    obtenerPruebaEstado(estado: String!): [Prueba]
  }
  type Mutation {
    # GerenteTecnico
    nuevoGerenteTecnico(input: GerenteTecnicoInput): GerenteTecnico
    autenticarGerenteTecnico(input: AutenticarInput): Token
    # Preguntas
    nuevaPregunta(input: PreguntaInput): Pregunta
    actualizarPregunta(id: ID!, input: PreguntaInput): Pregunta
    eliminarPregunta(id: ID!): String
    # Aspirantes
    nuevoAspirante(input: AspiranteInput): Aspirante
    actualizarAspirante(id: ID!, input: AspiranteInput): Aspirante
    eliminarAspirante(id: ID!): String
    #Prueba
    nuevaPrueba(input: PruebaInput): Prueba
    actualizarPrueba(id: ID!, input: PruebaInput): Prueba
    eliminarPrueba(id: ID!): String
  }
`;

module.exports = typeDefs;
