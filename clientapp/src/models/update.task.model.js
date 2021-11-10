class TaskUpdateRequest {
  constructor(_id, name, status, holder) {
    this._id = _id;
    this.name = name;
    this.status = status;
    this.holder = holder;
  }
}

export default TaskUpdateRequest;
