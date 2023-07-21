const test = require('tape');
const fs = require('fs');
const path = require('path');
const app = require('../lib/todo-app');      
const html = fs.readFileSync(path.resolve(__dirname,'../index.html'));

const id = 'test-app';

require('jsdom-global')(html);


const areaOfTriangle = (base,height) => { 
    var area = 0.5 * (base*height); 
    return area   
}

//Test 1
test('Should return -1 if array index not present',  (t) => {  
    t.equal(-1, [1,2,3].indexOf(4));
    t.end();
    });

//Test 2
test('Area of triangle should be equal to 25 if base is 5 and height is 10',  (t) => { 
    t.equal(25, areaOfTriangle(5,10));
    t.end();
    });

//Test 3
test('Check app object model', t =>{
    const keys = Object.keys(app.model);
  t.deepEqual(keys, ['todos', 'hash'], "`todos` and `hash` keys are present.");
  t.true(Array.isArray(app.model.todos), "model.todos is an Array");
  t.end();
});

//test 4
test('todo `update` default test case should return model unmodified', function (t) {
    const model = JSON.parse(JSON.stringify(app.model));
    const modified_model = app.update('add', model);
    t.deepEqual(model, modified_model, "model returned unmodified");
    t.end();
  });

//test 5
// test('`ADD` a new todo item to model.todos Array via `update`', function (t) {
//     const model = JSON.parse(JSON.stringify(app.model)); // initial state
//     t.equal(model.todos.length, 0, "initial model.todos.length is 0");
//     const updated_model = app.update('ADD', model, "Add Todo List Item");
//     var item = updated_model.todos[0];
//     const expected = { id: 1, title: "Add Todo List Item", done: true };
    
//     const model_todo_done = app.update('TOGGLE', updated_model, item.id);
//     t.equal(updated_model.todos.length, 1, "updated_model.todos.length is 1");
//     t.deepEqual(updated_model.todos[0], intial_model, "Todo list item added.");
//     // const ticked = app.toggle(true,1,updated_model);
//     t.deepEqual(model_todo_done.todos[0], expected, "To do item ticked");
//     t.end();
//   });


  //test 6
  test('`TOGGLE` (undo) a todo item from done=true to done=false', function (t) {
    const model = JSON.parse(JSON.stringify(app.model)); // initial state
    const model_with_todo = app.update('ADD', model, "Toggle a todo list item");
    const item = model_with_todo.todos[0];
    const model_todo_done = app.update('TOGGLE', model_with_todo, item.id);
    const expected = { id: 1, title: "Toggle a todo list item", done: true };
    t.deepEqual(model_todo_done.todos[0], expected, "Toggled done=false >> true");
    // add another item before "undoing" the original one:
    const model_second_item = app.update('ADD', model_todo_done, "Another todo");
    t.equal(model_second_item.todos.length, 2, "there are TWO todo items");
    // Toggle the original item such that: done=true >> done=false
    const model_todo_undone = app.update('TOGGLE', model_second_item, item.id);
    const undone = { id: 1, title: "Toggle a todo list item", done: false };
    t.deepEqual(model_todo_undone.todos[0],undone, "Todo item Toggled > undone!");
    t.end();
  });