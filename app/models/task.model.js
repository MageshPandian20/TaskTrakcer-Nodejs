module.exports = mongoose => {
    const Task = mongoose.model(
      "task",
      mongoose.Schema(
        {
          title: String,
          type: String,
          description: String,
          isCompleted: Boolean,
          date:Number,
        },
        { timestamps: true }
      )
    );
    return Task;
  };