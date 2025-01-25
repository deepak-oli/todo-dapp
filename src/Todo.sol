// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Todo {
    enum TaskStatus {
        Pending,
        Done,
        Archived
    }

    struct Task {
        uint16 id;
        string title;
        TaskStatus status;
    }
    event TaskCreated(uint16 indexed id, string title);
    event TaskUpdated(uint16 indexed id, string title, TaskStatus status);
    event TaskArchived(uint16 indexed id, string title, TaskStatus status);

    address public immutable owner;
    mapping(uint16 => Task) public tasks;
    uint16 public taskCount = 0;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier taskExist(uint16 _id) {
        require(tasks[_id].id != 0, "Task not found");
        _;
    }

    function getTask(
        uint16 _id
    ) external view onlyOwner taskExist(_id) returns (Task memory) {
        return tasks[_id];
    }

    function getTasks() external view onlyOwner returns (Task[] memory) {
        Task[] memory _tasks = new Task[](taskCount);
        for (uint16 i = 1; i <= taskCount; i++) {
            _tasks[i - 1] = tasks[i];
        }
        return _tasks;
    }

    function createTask(string calldata _title) external onlyOwner {
        unchecked {
            taskCount++;
        }
        uint16 newTaskId = taskCount;
        tasks[newTaskId] = Task({
            id: newTaskId,
            title: _title,
            status: TaskStatus.Pending
        });
        emit TaskCreated(newTaskId, _title);
    }

    function toggleTaskDone(uint16 _id) external onlyOwner taskExist(_id) {
        Task storage task = tasks[_id];
        task.status = task.status == TaskStatus.Pending
            ? TaskStatus.Done
            : TaskStatus.Pending;
        emit TaskUpdated(task.id, task.title, task.status);
    }

    function updateTaskTitle(
        uint16 _id,
        string calldata _title
    ) external onlyOwner taskExist(_id) {
        Task storage task = tasks[_id];
        task.title = _title;
        emit TaskUpdated(task.id, task.title, task.status);
    }

    function archiveTask(uint16 _id) external onlyOwner taskExist(_id) {
        Task storage task = tasks[_id];
        task.status = TaskStatus.Archived;
        emit TaskArchived(task.id, task.title, task.status);
    }
}
