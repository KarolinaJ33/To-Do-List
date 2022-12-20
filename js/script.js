{
    let tasks = [];
    let hiddenDoneTask = false;

    const addNewTask = (newTaskContent) => {
      tasks = [
        ...tasks,
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
        {...tasks[taskIndex].done = !tasks[taskIndex].done},
        ...tasks.slice(taskIndex + 1)
      ];
      render();
    };

    const hideDoneTask = () => {
      hiddenDoneTask = !hiddenDoneTask;
      render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
    
        removeButtons.forEach((removeButton, index) => {
          removeButton.addEventListener("click", () => {
            removeTask(index);
          });
        });
      }
        
        const toggleDoneButtons = document.querySelectorAll(".js-done");
    
        toggleDoneButtons.forEach((toggleDoneButton, index) => {
          toggleDoneButton.addEventListener("click", () => {
            toggleTaskDone(index);
          });
        });
      };

      const bindButtonsEvents = () => {
        const hiddenTaskButton = document.querySelector(".js-hideDoneTask");

        if (hiddenTaskButton) {
          hiddenTaskButton.addEventListener("click", () => {
            hideDoneTask();
          });
        };
      }
    
      const renderTasks = () => {
        let htmlString = "";
    
        for (const task of tasks) {
          htmlString += `
          <li class="list__item js-tasks">
              <button class="list__button list__button--toggleDone js-done">
                  ${task.done ? "✓" : ""}
              </button>
              <span class="tasks__content${task.done ? " list__content--checked" : ""}">
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

          document.querySelector(".js-tasks").innerHTML = renderedButtons;

        const render = () => {
          renderTasks();
          renderButtons();
        
    
        bindEvents();
      };
      const onFormSubmit = (event) => {
        event.preventDefault();
    
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        const newTaskInput = document.querySelector(".js-newTask");
    
        if (newTaskContent !== "") {
          addNewTask(newTaskContent);
          newTaskInput.value = "";
        }
        newTaskInput.focus();
      };
    
      const init = () => {
        render();
    
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
      };
    
      init();
      
      }