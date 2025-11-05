import { TodoList } from "@/components/todo-list";

export default function Home() {
  return (
    <main className="min-h-screen py-12 px-4" style={{ background: 'linear-gradient(135deg, #fef6e4 0%, #f3d2c1 50%, #fef6e4 100%)' }}>
      <TodoList />
    </main>
  );
}

