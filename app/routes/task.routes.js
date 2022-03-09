const swaggerJsdoc = require("swagger-jsdoc");

module.exports = app => {
  const taskController = require("../controllers/task.controller.js");
  var router = require("express").Router();


    /**
* @swagger
* /addTask:
*  post:
*    description: get specific task by Id
*    responses:
*      '200':
*        description: A successful response
*/
  router.post("/addTask", taskController.create);


  /**
  * @swagger
  * /getAllTasks:
  *  get:
  *    description: get All tasks
  *    responses:
  *      '200':
  *        description: A successful response
  */
  router.get("/getAllTasks", taskController.findAll);

  router.get("/getTest", taskController.getTest);

  /**
* @swagger
* /:id:
*  get:
*    description: get specific task by Id
*    responses:
*      '200':
*        description: A successful response
*/
  router.get("/:id", taskController.findOne);
  // // Update a Task with id
  router.put("/:id", taskController.update);
  // // Delete a Task with id
  router.delete("/:id", taskController.delete);
  // // Create a new Task
  router.delete("/", taskController.deleteAll);
  router.post("/findByDates", taskController.findByDates);
  

  app.use('/api/task', router);
};