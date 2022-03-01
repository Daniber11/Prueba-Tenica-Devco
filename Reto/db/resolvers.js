const GerenteTecnico = require("../models/GerenteTecnico");
const Pregunta = require("../models/Pregunta");
const Aspirante = require("../models/Aspirante");
const Prueba = require("../models/Prueba");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

const crearToken = (GerenteTecnico, secret, expiresIn) => {
  const { id, email, nombre, apellido } = GerenteTecnico;
  return jwt.sign({ id, email, nombre, apellido }, secret, { expiresIn }); // De json web Token
};

// Resolvers
const resolvers = {
  Query: {
    obtenerGerenteTecnico: async (_, {}, ctx) => {
      return ctx.aspirante;
    },

    obtenerPreguntas: async () => {
      try {
        const pregunta = await Pregunta.find({});
        return pregunta;
      } catch (error) {
        console.log(error);
      }
    },
    obtenerPregunta: async (_, { id }) => {
      // revisar si la pregunta existe o no
      const pregunta = await Pregunta.findById(id);
      if (!pregunta) {
        throw new Error("La pregunta no se encuentra");
      }

      return pregunta;
    },

    obtenerAspirantes: async () => {
      try {
        const aspirantes = await Aspirante.find({});
        return aspirantes;
      } catch (error) {
        console.log(error);
      }
    },

    obtenerAspirantesGerente: async (_, {}, ctx) => {
      try {
        const aspirantes = await Aspirante.find({
          aspirante: ctx.aspirante.id.toString(),
        });
        return aspirantes;
      } catch (error) {
        console.log(error);
      }
    },

    obtenerApirante: async (_, { id }, ctx) => {
      // Revisar si el Aspirante existe o no
      const aspirante = await Aspirante.findById(id);
      if (!aspirante) {
        throw new Error("Aspirante no encontrado");
      }

      // Quien lo creo puede verlo
      if (aspirante.GerenteTecnico.toString() !== ctx.aspirante.id) {
        throw new Error("No tienes las credenciales");
      }

      return aspirante;
    },

    obtenerPruebas: async () => {
      try {
        const pruebas = await Prueba.find({});
        return pruebas;
      } catch (error) {
        console.log(error);
      }
    },

    obtenerPruebasGerente: async (_, {}, ctx) => {
      try {
        const pruebas = await Prueba.find({
          gerenteTecnico: ctx.aspirante.id,
        }).populate("aspirante");
        return pruebas;
      } catch (error) {
        console.log(error);
      }
    },

    obtenerPrueba: async (_, { id }, ctx) => {
      // Si la prueba existe
      const prueba = await Prueba.findById(id);
      if (!prueba) {
        throw Error("Prueba no encontrada");
      }
      // Solo quien evalua puede verlo
      if (prueba.gerenteTecnico.toString() !== ctx.aspirante.id) {
        throw new Error("No tienes credenciales");
      }

      // Retornamos el resultado
      return prueba;
    },

    obtenerPruebaEstado: async (_, { estado }, ctx) => {
      const pruebas = await Prueba.find({
        gerenteTecnico: ctx.aspirante.id,
        estado,
      });
      return pruebas;
    },
  },
  Mutation: {
    nuevoGerenteTecnico: async (_, { input }) => {
      const { email, password } = input;

      // Revisar si el GerenteTecnico ya esta registrado
      const existeGerenteTecnico = await GerenteTecnico.findOne({ email });
      if (existeGerenteTecnico) {
        throw new Error("El Gerente Tecnico ya esta registrado");
      }

      // Hashear su password
      const salt = await bcryptjs.genSalt(10);
      input.password = await bcryptjs.hash(password, salt);

      try {
        // Guardarlo en la base de datos
        const gerenteTecnico = new GerenteTecnico(input);
        gerenteTecnico.save(); // Guardarlo
        return gerenteTecnico;
      } catch (error) {
        console.log(error);
      }
    },

    autenticarGerenteTecnico: async (_, { input }) => {
      const { email, password } = input;

      // Si el GerenteTecnico existe
      const existeGerenteTecnico = await GerenteTecnico.findOne({ email });
      if (!existeGerenteTecnico) {
        throw new Error("El GerenteTecnico no existe");
      }

      // Revisar el password es correcto
      const passwordCorrecto = await bcryptjs.compare(
        password,
        existeGerenteTecnico.password
      );
      if (!passwordCorrecto) {
        throw new Error("La Contraseña es Incorrecta");
      }

      // Crear el token
      return {
        token: crearToken(existeGerenteTecnico, process.env.secret, "24h"),
      };
    },

    nuevaPregunta: async (_, { input }) => {
      try {
        const pregunta = new Pregunta(input);

        // Almacenar en la bd
        const resultado = await pregunta.save();
        return resultado;
      } catch (error) {
        {
          console.log(error);
        }
      }
    },
    actualizarPregunta: async (_, { id, input }) => {
      // revisar si la pregunta existe o no
      let pregunta = await Pregunta.findById(id);
      if (!pregunta) {
        throw new Error("La pregunta no se encuentra");
      }
      // Guardar en la base de datos
      pregunta = await Pregunta.findOneAndUpdate({ _id: id }, input, {
        new: true,
      });

      return pregunta;
    },

    eliminarPregunta: async (_, { id }) => {
      // revisar si la pregunta existe o no
      let pregunta = await Pregunta.findById(id);
      if (!pregunta) {
        throw new Error("La pregunta no se encuentra");
      }
      // Eliminar
      await Pregunta.findOneAndDelete({ _id: id });

      return "Pregunta Eliminada";
    },

    nuevoAspirante: async (_, { input }, ctx) => {
      const { email } = input;
      // verificar si el aspirante ya esta registrado
      const aspirante = await Aspirante.findOne({ email });
      if (aspirante) {
        throw new Error("Aspirante ya registrado");
      }
      const nuevoAspirante = new Aspirante(input);

      // Asiganar el gerente tecnico
      nuevoAspirante.GerenteTecnico = ctx.aspirante.id;

      // Guardarlo en la base de datos
      try {
        const resultado = await nuevoAspirante.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },

    actualizarAspirante: async (_, { id, input }, ctx) => {
      // Verificar si existe o no
      let aspirante = await Aspirante.findById(id);

      if (!aspirante) {
        throw new Error("Este aspirate no existe");
      }
      // Verificar si el gerente tecnico quien edita
      if (aspirante.GerenteTecnico.toString() !== ctx.aspirante.id) {
        throw new Error("No tienes las credenciales");
      }
      // guardar aspirante
      aspirante = await Aspirante.findOneAndUpdate({ _id: id }, input, {
        new: true,
      });
      return aspirante;
    },

    eliminarAspirante: async (_, { id }, ctx) => {
      // Verificar si existe o no
      let aspirante = await Aspirante.findById(id);

      if (!aspirante) {
        throw new Error("Este aspirate no existe");
      }
      // Verificar si el gerente tecnico quien edita
      if (aspirante.GerenteTecnico.toString() !== ctx.aspirante.id) {
        throw new Error("No tienes las credenciales");
      }

      // Eliminar Aspirante
      await Aspirante.findByIdAndDelete({ _id: id });
      return "Aspirante Eliminado";
    },

    nuevaPrueba: async (_, { input }, ctx) => {
      const { aspirante } = input;
      // Verificar si el Aspirante existe o no
      let aspiranteExiste = await Aspirante.findById(aspirante);

      if (!aspiranteExiste) {
        throw new Error("Este aspirate no existe");
      }
      // Verificar si el Aspirante es evaluado por el Gerente Tecnico
      if (aspiranteExiste.GerenteTecnico.toString() !== ctx.aspirante.id) {
        throw new Error("No tienes las credenciales");
      }
      // Crear nueva Prueba
      const nuevaPrueba = new Prueba(input);

      // Asignar el gerente tecnico
      nuevaPrueba.gerenteTecnico = ctx.aspirante.id;

      // Guardar en la base de datos
      const resultado = await nuevaPrueba.save();
      return resultado;
    },
    actualizarPrueba: async (_, { id, input }, ctx) => {
      const { aspirante } = input;

      // Si la prueba existe
      const existePrueba = await Prueba.findById(id);
      if (!existePrueba) {
        throw new Error("La Prueba no existe");
      }

      // Si el aspirante existe
      const existeAspirante = await Aspirante.findById(aspirante);
      if (!existeAspirante) {
        throw new Error("El Aspirante no existe");
      }

      // Aspirante y Prueba del evaluador
      if (existeAspirante.GerenteTecnico.toString() !== ctx.aspirante.id) {
        throw new Error("No tienes las credenciales");
      }

      // Guardar la Prueba
      const resultado = await Prueba.findOneAndUpdate({ _id: id }, input, {
        new: true,
      });
      return resultado;
    },
    eliminarPrueba: async (_, { id }, ctx) => {
      // Verificar si la prueba existe o no
      const prueba = await Prueba.findById(id);
      if (!prueba) {
        throw new Error("La prueba no existe");
      }

      // verificar si el evaluador es quien lo borra
      if (prueba.gerenteTecnico.toString() !== ctx.aspirante.id) {
        throw new Error("No tienes las credenciales");
      }

      // Eliminar de la base de datos
      await Prueba.findOneAndDelete({ _id: id });
      return "Prueba Eliminado";
    },
  },
};

module.exports = resolvers;
