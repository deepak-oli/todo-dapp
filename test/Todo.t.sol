// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console, Vm} from "forge-std/Test.sol";
import {Todo} from "../src/Todo.sol";

contract TodoTest is Test {
    Todo public todo;
    address public owner;
    address public nonOwner;

    event TaskCreated(uint16 indexed id, string title);
    event TaskUpdated(uint16 indexed id, string title, Todo.TaskStatus status);
    event TaskArchived(uint16 indexed id, string title, Todo.TaskStatus status);

    function setUp() public {
        owner = address(this);
        nonOwner = address(0x123);
        todo = new Todo();
    }

    // CREATE TASK
    function test_create_task() public {
        vm.prank(owner);

        string memory title = "Task 1";

        vm.expectEmit(true, false, false, true);
        emit TaskCreated(1, title);

        todo.createTask(title);
        assertEq(todo.taskCount(), 1);

        Todo.Task memory task = todo.getTask(1);
        assertEq(task.id, 1);
        assertEq(task.title, title);
        assertEq(uint256(task.status), uint256(Todo.TaskStatus.Pending));
    }

    function test_only_owner_create_task() public {
        vm.prank(nonOwner);
        vm.expectRevert("Only owner can call this function");

        todo.createTask("Task 1");
        assertEq(todo.taskCount(), 0);
    }

    // TOGGLE TASK DONE
    function test_toggle_task_done() public {
        vm.prank(owner);
        todo.createTask("Task 1");
        todo.toggleTaskDone(1);

        Todo.Task memory task = todo.getTask(1);
        assertEq(uint256(task.status), uint256(Todo.TaskStatus.Done));
    }

    function test_toggle_task_done_revert_on_archived() public {
        vm.prank(owner);
        todo.createTask("Task 1");
        todo.archiveTask(1);
        vm.expectRevert("Task is archived");

        todo.toggleTaskDone(1);
    }

    function test_task_exist_on_toggle() public {
        vm.prank(owner);
        vm.expectRevert("Task not found");

        todo.toggleTaskDone(1);
    }

    function test_only_owner_toggle_task() public {
        vm.prank(nonOwner);
        vm.expectRevert("Only owner can call this function");

        todo.toggleTaskDone(1);
    }

    // UPDATE TASK
    function test_update_task_title() public {
        vm.prank(owner);

        string memory title = "Task 1";
        string memory updatedTitle = "Task 1 updated";

        vm.expectEmit(true, false, false, true);
        emit TaskCreated(1, title);

        todo.createTask(title);

        vm.expectEmit(true, false, false, true);
        emit TaskUpdated(1, updatedTitle, Todo.TaskStatus.Pending);

        todo.updateTaskTitle(1, updatedTitle);

        Todo.Task memory task = todo.getTask(1);
        assertEq(task.title, updatedTitle);
    }

    function test_update_task_title_revert_on_same_title() public {
        vm.prank(owner);
        todo.createTask("Task 1");
        vm.expectRevert("Title is same");

        todo.updateTaskTitle(1, "Task 1");
    }

    function test_update_task_title_revert_on_archived() public {
        vm.prank(owner);
        todo.createTask("Task 1");
        todo.archiveTask(1);
        vm.expectRevert("Task is archived");

        todo.updateTaskTitle(1, "Task 1 updated");
    }

    function test_update_task_title_revert_on_done() public {
        vm.prank(owner);
        todo.createTask("Task 1");
        todo.toggleTaskDone(1);
        vm.expectRevert("Task is done");

        todo.updateTaskTitle(1, "Task 1 updated");
    }

    function test_task_exist_revert_on_update() public {
        vm.prank(owner);
        vm.expectRevert("Task not found");

        todo.updateTaskTitle(1, "Task 1 updated");
    }

    function test_only_owner_update_task() public {
        vm.prank(nonOwner);
        vm.expectRevert("Only owner can call this function");

        todo.updateTaskTitle(1, "Task 1 updated");
    }

    // ARCHIVE TASK
    function test_archive_task() public {
        vm.prank(owner);
        todo.createTask("Task 1");
        todo.archiveTask(1);

        Todo.Task memory task = todo.getTask(1);
        assertEq(uint256(task.status), uint256(Todo.TaskStatus.Archived));
    }

    function test_already_archived_task_revert_on_archive() public {
        vm.prank(owner);
        todo.createTask("Task 1");
        todo.archiveTask(1);
        vm.expectRevert("Task is already archived");
        todo.archiveTask(1);
    }

    function test_task_exist_revert_on_archive() public {
        vm.prank(owner);
        vm.expectRevert("Task not found");

        todo.archiveTask(1);
    }

    function test_only_owner_archive_task() public {
        vm.prank(nonOwner);
        vm.expectRevert("Only owner can call this function");

        todo.archiveTask(1);
    }

    // GET TASKS
    function test_get_task() public {
        vm.prank(owner);
        todo.createTask("Task 1");
        todo.createTask("Task 2");

        Todo.Task memory task = todo.getTask(2);
        assertEq(task.id, 2);
        assertEq(task.title, "Task 2");
        assertEq(uint256(task.status), uint256(Todo.TaskStatus.Pending));
    }

    function test_get_task_revert() public {
        vm.prank(owner);
        vm.expectRevert("Task not found");

        todo.getTask(1);
    }

    function test_only_owner_get_task() public {
        vm.prank(nonOwner);
        vm.expectRevert("Only owner can call this function");

        todo.getTask(1);
    }

    function test_get_tasks() public {
        vm.prank(owner);
        todo.createTask("Task 1");
        todo.createTask("Task 2");
        todo.createTask("Task 3");

        Todo.Task[] memory tasks = todo.getTasks();
        assertEq(tasks.length, 3);

        assertEq(tasks[0].id, 1);
        assertEq(tasks[0].title, "Task 1");

        assertEq(tasks[1].id, 2);
        assertEq(tasks[1].title, "Task 2");

        assertEq(tasks[2].id, 3);
        assertEq(tasks[2].title, "Task 3");
    }

    function test_only_owner_get_tasks() public {
        vm.prank(nonOwner);
        vm.expectRevert("Only owner can call this function");

        todo.getTasks();
    }
}
