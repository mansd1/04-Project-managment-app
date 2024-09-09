import { useState } from "react";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectSidebar";
import NewProject from "./components/NewProject";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    setProjectsState((prev) => {
      const TaskId = Math.random();
      const newTask = {
        text: text,
        projectId: prev.selectedProjectId,
        id: TaskId,
      };
      return {
        ...prev,
        tasks: [newTask, ...prev.tasks],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState((prev) => {
      return {
        ...prev,
        tasks: prev.tasks.filter((task) => task.id !== id),
      };
    });
  }

  // function select the project
  function handleSelectProject(id) {
    setProjectsState((prev) => {
      return {
        ...prev,
        selectedProjectId: id,
      };
    });
  }

  function handleClick() {
    setProjectsState((prev) => {
      return {
        ...prev,
        selectedProjectId: null,
      };
    });
  }

  //function if click button cancel hidden section
  function handleCancelAddProject() {
    setProjectsState((prev) => {
      return {
        ...prev,
        selectedProjectId: undefined,
      };
    });
  }

  // function add project to side bar
  function handleAddProject(projectData) {
    setProjectsState((prev) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };
      return {
        ...prev,
        selectedProjectId: undefined,
        projects: [...prev.projects, newProject],
      };
    });
  }

  // function delete project in side bar
  function handleDeleteProject() {
    setProjectsState((prev) => {
      return {
        ...prev,
        selectedProjectId: undefined,
        projects: prev.projects.filter(
          (project) => project.id !== prev.selectedProjectId
        ),
      };
    });
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleClick} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onStartAddProject={handleClick}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectedId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
