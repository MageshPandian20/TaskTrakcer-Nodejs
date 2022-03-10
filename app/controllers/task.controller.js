const db = require("../models");
const Task = db.task;
// Create and Save a new Task
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Title can not be empty!" });
    return;
  }
  if (!req.body.description) {
    res.status(400).send({ message: "Description can not be empty!" });
    return;
  }
  if (!req.body.isCompleted) {
    res.status(400).send({ message: "isCompleted can not be empty!" });
    return;
  }

  if (!req.body.date) {
    res.status(400).send({ message: "Date can not be empty!" });
    return;
  }

  if (!req.body.type) {
    res.status(400).send({ message: "Type can not be empty!" });
    return;
  }


  // Create a Task
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    isCompleted: req.body.isCompleted,
    date: req.body.date,
    type: req.body.type,
    published: req.body.published ? req.body.published : false
  });
  // Save Task in the database
  task
    .save(task)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the task."
      });
    });
};
// Retrieve all Task from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  Task.find(condition)
    .then(data => {

      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Task with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Task.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};

// Update a Task by the id in the request
exports.update = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "Title can not be empty!" });
    return;
  }
  if (!req.body.description) {
    res.status(400).send({ message: "Description can not be empty!" });
    return;
  }
  if (!req.body.isCompleted) {
    res.status(400).send({ message: "isCompleted can not be empty!" });
    return;
  }

  if (!req.body.date) {
    res.status(400).send({ message: "Date can not be empty!" });
    return;
  }

  if (!req.body.type) {
    res.status(400).send({ message: "Type can not be empty!" });
    return;
  }
  const id = req.params.id;

  Task.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};
// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Task.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};
// Delete all Task from the database.
exports.deleteAll = (req, res) => {
  Task.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

exports.findByDates = async (req, res) => {
  // const tasks = Task.aggregate([
  //     {
  //       $match: {
  //         'date': { '$gte': req.body.fromDate, '$lte': req.body.toDate }
  //       }
  //     },{
  //         $group: {
  //             data:{$push: {title: '$title', description:'$description'}}
  //           }
  //     }
  //   ]);

  //   res.send(tasks);



  Task
    .aggregate([
      { $match: { date: { '$gte': req.body.fromDate, '$lte': req.body.toDate } } },
      // {
      //   $group:
      //   {
      //     _id:'$date',
      //      'data': { '$push': '$$ROOT' }
      //   }
      // },

    ])
    .exec()
    .then((data) => {
      console.log(data);
      //   var dataNew = data.reduce(function(obj, doc) { 
      //     obj[doc._id] = doc.docs
      //     return obj;
      // }, {});
      // console.log("dataNew=====>"+JSON.stringify(dataNew));
      res.send(data);
    })
    .catch((err) => {
      throw err;
    });

}

exports.getTest = async (req, res) => {
  console.log("dataNew=====>getTest");
  res.status(200).send({
    message: "Success"
  });
}


