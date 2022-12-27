{
    let tasks = [];
    let hiddenDoneTask = false;

    const addNewTask = (newTaskContent) => {
      tasks = [...tasks,
        { content: newTaskContent }
      ];
      render();
    };

    const removeTask = (taskIndex) => {
      tasks = [
        ...tasks.slice(0, taskIndex),
        ...tasks.slice(taskIndex + 1)
      ];
      render();
    };

    const toggleTaskDone = (taskIndex) => {
      tasks = [ 
        ...tasks.slice(0, taskIndex),
        {...tasks[taskIndex], done: !tasks[taskIndex].done},
        ...tasks.slice(taskIndex + 1)
      ];
      render();
    };

    const hideDoneTask = () => {
      hiddenDoneTask = !hiddenDoneTask;
      render();
    };

    const toogleAllDoneTask = () => {
      tasks = tasks.map((task) => ({
        ...task,
        done: true,
      }));
      render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
    
        removeButtons.forEach((removeButton, index) => {
          removeButton.addEventListener("click", () => {
            removeTask(index);
          });
        });
      
        const toggleDoneButtons = document.querySelectorAll(".js-done");
    
        toggleDoneButtons.forEach((toggleDoneButton, index) => {
          toggleDoneButton.addEventListener("click", () => {
            toggleTaskDone(index);
          });
        });
      }

      const bindButtonsEvents = () => {
        const hiddenTaskButton = document.querySelector(".js-hideDoneTask");

        if (hiddenTaskButton) {
          hiddenTaskButton.addEventListener("click", () => {
            hideDoneTask();
          });
        };

        const toogleAllDone = document.querySelector(".js-allDone");

        if (toogleAllDone) {
         toogleAllDone.addEventListener("click", () => {
         toogleAllDoneTask();
        });
      };

    };
      const renderTasks = () => {
        let htmlString = "";
    
        for (const task of tasks) {
          htmlString += `
          <li class="list ${task.done && hiddenDoneTask ? "list__item--hidden" : ""}">
              <button class="list__button list__button--done js-done">
                  ${task.done ? "✓" : ""}
              </button>
              <span class=" ${task.done ? "list__item--done" : "list__item"}">
                  ${task.content}
              </span>
              <button class="list__button list__button--remove js-remove">
                  🗑
              </button>
          </li>
                      `;
        }
    
        document.querySelector(".js-tasks").innerHTML = htmlString;

      };

        const renderButtons = () => {
          let renderedButtons = "";

          if (tasks.length > 0) {
            renderedButtons += `
            <button class="button js-hideDoneTask">${hiddenDoneTask ? "Pokaż" : "Ukryj"} ukończone</button>
            <button class="button js-allDone" ${tasks.every(({done}) => done ) ? "disabled" : ""}>Ukończ wszystkie</button>
            `;
          }

          document.querySelector(".js-buttons").innerHTML = renderedButtons;
        };

        const render = () => {
          renderTasks();
          renderButtons();
        
          bindEvents();
          bindButtonsEvents();
      };

      const onFormSubmit = (event) => {
        event.preventDefault();
    
        const newTaskContent = document.querySelector(".js-newTask");
        const newTaskObject = newTaskContent.value.trim();
    
        if (newTaskObject !== "") {
          addNewTask(newTaskObject);
          newTaskContent.value = "";
        }
        newTaskContent.focus();
      };
    
      const init = () => {
        render();
    
        const form = document.querySelector(".js-form");
        
        form.addEventListener("submit", onFormSubmit);

      };
    
      init();
      
      };  
    