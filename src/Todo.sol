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
    mapping(address => mapping(uint16 => Task)) private userTasks;
    mapping(address => uint16) private userTaskCount;

    constructor() {
        owner = msg.sender;
    }

    modifier taskExist(uint16 _id) {
        require(userTasks[msg.sender][_id].id != 0, "Task not found");
        _;
    }

    function taskCount() external view returns (uint16) {
        return userTaskCount[msg.sender];
    }

    function getTask(
        uint16 _id
    ) external view taskExist(_id) returns (Task memory) {
        Task memory task = userTasks[msg.sender][_id];
        return task;
    }

    function getTasks() external view returns (Task[] memory) {
        uint16 currentUserTaskCount = userTaskCount[msg.sender];
        Task[] memory _tasks = new Task[](currentUserTaskCount);
        for (uint16 i = 1; i <= currentUserTaskCount; i++) {
            _tasks[i - 1] = userTasks[msg.sender][i];
        }
        return _tasks;
    }

    function createTask(string calldata _title) external {
        unchecked {
            userTaskCount[msg.sender]++;
        }
        uint16 newTaskId = userTaskCount[msg.sender];
        userTasks[msg.sender][newTaskId] = Task({
            id: newTaskId,
            title: _title,
            status: TaskStatus.Pending
        });
        emit TaskCreated(newTaskId, _title);
    }

    function toggleTaskDone(uint16 _id) external taskExist(_id) {
        Task storage task = userTasks[msg.sender][_id];
        require(task.status != TaskStatus.Archived, "Task is archived");

        task.status = task.status == TaskStatus.Pending
            ? TaskStatus.Done
            : TaskStatus.Pending;
        emit TaskUpdated(task.id, task.title, task.status);
    }

    function updateTaskTitle(
        uint16 _id,
        string calldata _title
    ) external taskExist(_id) {
        Task storage task = userTasks[msg.sender][_id];
        require(
            keccak256(abi.encodePacked(task.title)) !=
                keccak256(abi.encodePacked(_title)),
            "Title is same"
        );
        require(task.status != TaskStatus.Archived, "Task is archived");
        require(task.status != TaskStatus.Done, "Task is done");

        task.title = _title;
        emit TaskUpdated(task.id, task.title, task.status);
    }

    function archiveTask(uint16 _id) external taskExist(_id) {
        Task storage task = userTasks[msg.sender][_id];
        require(task.status != TaskStatus.Archived, "Task is already archived");

        task.status = TaskStatus.Archived;
        emit TaskArchived(task.id, task.title, task.status);
    }
}
