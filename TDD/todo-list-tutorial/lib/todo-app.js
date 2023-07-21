if (typeof require !== 'undefined' && this.window !== this) {
  var { a, button, div, empty, footer, input, h1, header, label, li, mount,
    route, section, span, strong, text, ul } = require('./elmish.js');
  }

/**
 * initial_model is a simple JavaScript Object with two keys and no methods.
 * it is used both as the "initial" model when mounting the Todo List App
 * and as the "reset" state when all todos are deleted at once.
 */

 var initial_model = {
    todos: [], // empty array which we will fill shortly
    hash: "#/" // the hash in the url (for routing)
  }

/**
 * `update` transforms the `model` based on the `action`.
 * @param {String} action - the desired action to perform on the model.
 * @param {String} data - the data we want to "apply" to the item.
 * @param {Object} model - the App's (current) model (or "state").
 * @return {Object} new_model - the transformed model.
 */

/* =============================================================== 
Still implementing the update actions, which means the app is currently broken
Writing the respective tests in the todo-app.test.js file
Please refer to https://github.com/dwyl/javascript-todo-list-tutorial for complete tutorial
=============================================================== */

var update = (action, model, data) => {
  var new_model = JSON.parse(JSON.stringify(model))
    switch(action){
      case 'ADD':
        new_model.todos.push({
        id: model.todos.length + 1,
        title: data,
        done: false
      });
      break;

      case 'TOGGLE':
        new_model.todos.forEach(function(item){ //checks through the list items
          // console.log(item.id);
          if (item.id == data){   //checks for which item matches the inputted id
            item.done = !item.done; // inverts state of "done" e.g false >> true
            return new_model;
          }
        });
        break;

      default:
        return model;}
    return new_model;
}




  /* module.exports is needed to run the functions using Node.js for testing! */
  /* istanbul ignore next */
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      model: initial_model,
      update: update,               // export for unit tests
    }
  }