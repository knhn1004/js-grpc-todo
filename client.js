const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync('todo.proto', {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const client = new todoPackage.Todo(
  'localhost:40000',
  grpc.credentials.createInsecure()
);

client.createTodo(
  {
    id: -1,
    text: 'Do Laundry',
  },
  (err, response) => {
    console.log('created: ', response);
  }
);

client.readTodos({}, (err, response) => {
  //  console.log(response);
  console.log('Todo List: ');
  response.items?.forEach(i => {
    console.log(`${i.id}. ${i.text}`);
  });
});
