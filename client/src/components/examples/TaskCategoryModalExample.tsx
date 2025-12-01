import { TaskCategoryModal } from "../TaskCategoryModal";
import { ThemeProvider } from "../ThemeProvider";

export default function TaskCategoryModalExample() {
  return (
    <ThemeProvider>
      <div className="bg-background p-8 flex justify-center">
        <TaskCategoryModal 
          motivationLevel={5} 
          onAddTask={(task) => console.log("Add task:", task)} 
        />
      </div>
    </ThemeProvider>
  );
}
