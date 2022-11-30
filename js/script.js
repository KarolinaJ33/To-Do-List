{
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({ content: newTaskContent, });

        render();
    };
    const removeTask = (index) => {
        tasks.splice(index, 1);

        render();
    };
