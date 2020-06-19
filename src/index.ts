import * as Hapi from '@hapi/hapi';
import Joi from '@hapi/joi';
import * as HapiSwagger from 'hapi-swagger';
import  Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import { singleUserStruct, outgoingSingleUserStruct, outgoingAllUsersStruct } from './joi/validate';

var users:any = [];
var id = 1;
var authUsers = [
  {username: 'nicole', scope: 'admin'},
  {username: 'jon', scope: 'self'}
];

const init = async() => {

  const server = Hapi.server({
    port: 4000,
    host: 'localhost',
    routes: { cors: true}
  });

  await server.register(swaggerPlugins);

  await server.start();
  console.log('Server running at:', server.info.uri);

  server.route({
    method: 'GET',
    path: '/',
    options: {
      description: 'gets all users',
      notes: 'returns an array of users',
      tags: ['api'],
      response: {
        schema: outgoingAllUsersStruct,
      }
    },
    handler: () => {
      return users;
    },
  });

  server.route({
    method: 'GET',
    path: '/user/{id}',
    options: {
      description: 'returns a single user having identifier "id"',
      notes: 'posts a user',
      tags: ['api'],
      validate: {
        params: Joi.object({id: Joi.number().required().description('The id for the user')})
      },
      response: {
        schema: outgoingSingleUserStruct,
      }
    },
    handler: (request: any) => {
      let { id } = request.params;
      let target = users.find((user: any) => user.id === id );
      return target;
    },
  });


  server.route({
    method: 'POST',
    path: '/',
    options: {
      description: 'adds a new user with salary',
      notes: 'posts a user',
      tags: ['api'],
      validate: {
        payload: singleUserStruct
      },
      response: {
        schema: outgoingSingleUserStruct,
      }
    },
    handler: (request: any) => {

      let newUser = {
        id: id,
        data: request.payload
      };
      
      id++;
      users = [...users, newUser];
      return newUser;
    },
  });

  server.route({
    method: 'POST',
    path: '/signin/{username}',
    options: {
      description: 'signs in user',
      tags: ['api'],
      validate: {
        params: Joi.object({id: Joi.string().required().description('The username of person signing in')})
      },
    },
    handler: (request: any) => {
      
      return 2
    }
  })
  
};



// ... options, plugins ...

const swaggerOptions: HapiSwagger.RegisterOptions = {
  info: {
    title: 'Hapi Joi playground doc'
  }
};

const swaggerPlugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
  {
    plugin: Inert
  },
  {
    plugin: Vision
  },
  {
    plugin: HapiSwagger,
    options: swaggerOptions
  },
];


init();