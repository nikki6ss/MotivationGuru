import { useState } from "react";
import { TaskCategoryModal, type CustomCategory } from "../TaskCategoryModal";
import { ThemeProvider } from "../ThemeProvider";

export default function TaskCategoryModalExample() {
  const [customCategories, setCustomCategories] = useState<CustomCategory[]>([]);

  const handleAddCategory = (category: CustomCategory) => {
    setCustomCategories((prev) => [...prev, category]);
    console.log("New category added:", category);
  };

  return (
    <ThemeProvider>
      <div className="bg-background p-8 flex justify-center">
        <TaskCategoryModal 
          motivationLevel={5}
          customCategories={customCategories}
          onAddTask={(task) => console.log("Add task:", task)}
          onAddCategory={handleAddCategory}
        />
      </div>
    </ThemeProvider>
  );
}
