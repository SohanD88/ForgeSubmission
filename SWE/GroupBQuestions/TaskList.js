/** 
 * REQUIREMENTS
 * Task (To Do) Properties:
 * - Title, description, date created, date due, status (New, Working on, Finished)
 * Add and Delete Tasks
 * Reorganize Tasks (Move up, down, handle edge cases)
 * Edit Information about tasks when appropriate
 * OPTIONAL
 * Sort Tasks by Due Date
 * Get Overdue Tasks
 * Remove Finished Tasks
 * Get Task Summary by Status
 */

const TASK_STATUS = new Set(["New", "Working on", "Finished"]);
let toDoList = [];

//JS helper function to check for non-empty strings
function isNonEmptyString(str) 
{
    return typeof str === 'string' && str.trim().length > 0;
}
//JS helper function to validate task status
function isValidStatus(status)
{
    return TASK_STATUS.has(status);
}

//JS helper function to validate date
function isValidDate(date)
{
    if (date === null || date === undefined || date === "") return null;

    const dateObj = new Date(date);
    if (isNaN(dateObj)) throw new Error("Invalid date");

    return dateObj.toISOString();
}
//JS helper function to find task index by ID
function findTaskIndexWithID(id)
{
    return toDoList.findIndex(task => task.id === id);
}

//JS function to add a new task
function addTask(title, description, dateDue, status="New")
{
    if (!isNonEmptyString(title)) throw new Error("Title must be a non-empty string");
    if (!isNonEmptyString(description)) throw new Error("Description must be a non-empty string");
    if (!isValidStatus(status)) throw new Error("Invalid status");

    const newTask = {
        //creates a unique ID using crypto.randomUUID when available. If not it just uses a combination of timestamp and random string.
        //good if tasks have the same title/description
        id: crypto.randomUUID?.() ?? `${Date.now()}_${Math.random().toString(36).slice(2)}`,
        title: title,
        description: description,
        dateCreated: new Date().toISOString(),
        dateDue: isValidDate(dateDue),
        status: status
    };
    toDoList.push(newTask);
    return newTask;
}

//JS function to delete a task by ID
function deleteTask(id)
{
    const index = findTaskIndexWithID(id);
    if (index === -1) throw new Error("Task not found");

    //removes the item at index "index" and returns it
    //used [0] to return the object instead of an array with one object
    return toDoList.splice(index, 1)[0];
}

//JS function to edit a task by ID
//Only allows editing of title, description, date due, and status
function editTask(id, changes)
{
    const index = findTaskIndexWithID(id);
    if (index === -1) throw new Error("Task not found");

    const task = toDoList[index];

    const allowedChanges = new Set(["title", "description", "dateDue", "status"]);
    for (const key of Object.keys(changes))
    {
        if (!allowedChanges.has(key))
        {
            throw new Error(`Cannot edit property: ${key}`);
        }
    }

    if ("title" in changes)
    {
        if (!isNonEmptyString(changes.title)) throw new Error("Title must be a non-empty string");
        task.title = changes.title;
    }
    if ("description" in changes)
    {
        if (!isNonEmptyString(changes.description)) throw new Error("Description must be a non-empty string");
        task.description = changes.description;
    }
    if ("dateDue" in changes)
    {
        task.dateDue = isValidDate(changes.dateDue);
    }
    if ("status" in changes)
    {
        if (!isValidStatus(changes.status)) throw new Error("Invalid status");
        task.status = changes.status;
    }

    return task;
}

//JS function to move a task up or down in the list
//direction: "up" or "down" if invalid direction, returns false
function moveTask (id, direction)
{
    const index = findTaskIndexWithID(id);
    if (index === -1) throw new Error("Task not found");

    if (direction !== "up" && direction !== "down")
        {
            throw new Error("Invalid direction");
        } 
    
        if (direction === "up")
        {
            //already at top
            if (index === 0) return false; 
            [toDoList[index - 1], toDoList[index]] = [toDoList[index], toDoList[index - 1]];
            return true;
        }
        if (direction === "down")
        {
            //already at bottom
            if (index === toDoList.length - 1) return false;
            [toDoList[index], toDoList[index + 1]] = [toDoList[index + 1], toDoList[index]];
            return true;
        }
}

//mark task as finished
function markTaskAsFinished(id)
{
    const index = findTaskIndexWithID(id);
    if (index === -1) throw new Error("Task not found");
    return editTask(id, {status: "Finished"});
}

//optional function - Sort by due date
//tasks due soon are first, tasks with no due date are last
function sortByDueDate()
{
    toDoList.sort((a, b) => {
        if (a.dateDue === null && b.dateDue === null) return 0;
        if (a.dateDue === null) return 1;
        if (b.dateDue === null) return -1;
        return new Date(a.dateDue) - new Date(b.dateDue);
    });
}

//optional function - Get overdue tasks
function getOverdueTasks()
{
    const currentTime = new Date();
    return toDoList.filter(task => task.dateDue !== null && new Date(task.dateDue) < currentTime && task.status !== "Finished");
}

//optional function - Remove all finished tasks
function removeFinishedTasks()
{
    toDoList = toDoList.filter(task => task.status !== "Finished");
}

//optional function - Get tasks counts by status
function getTaskSummaryByStatus() 
{
    return {
        total: toDoList.length,
        new: toDoList.filter(t => t.status === "New").length,
        working: toDoList.filter(t => t.status === "Working on").length,
        finished: toDoList.filter(t => t.status === "Finished").length
    };
}


addTask("Sample Task 1", "This is a sample task", "2024-12-31");    
addTask("Sample Task 2", "This is another sample task", "2024-11-30", "Working on");
markTaskAsFinished(toDoList[0].id);
moveTask(toDoList[1].id, "up");
editTask(toDoList[0].id, {description: "Updated description for sample task 1"});
console.log(toDoList);
sortByDueDate();
console.log(getOverdueTasks());
console.log(getTaskSummaryByStatus());
removeFinishedTasks();
console.log(toDoList);
deleteTask(toDoList[0].id);
console.log(toDoList);

