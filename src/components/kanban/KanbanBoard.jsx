// components/kanban/KanbanBoard.jsx
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../services/firebase/firebase"; // ajusta según tu estructura
import { DndContext, DragOverlay, closestCorners } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import KanbanColumn from "./KanbanColumn";
import KanbanCard from "./KanbanCard";
import ModalNuevaTarea from "./CreateTaskModal";

const KanbanBoard = ({ groupId, groupName }) => {
  const [columns, setColumns] = useState({});
  const [activeCard, setActiveCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🧩 1. Leer tablero en tiempo real
  useEffect(() => {
    if (!groupId) return;

    const boardRef = collection(db, "groups", groupId, "board");

    const unsubscribe = onSnapshot(boardRef, (snapshot) => {
      const data = {};
      snapshot.forEach((doc) => {
        data[doc.id] = {
          id: doc.id,
          title: doc.data().title,
          cards: doc.data().cards || [],
        };
      });

      setColumns(data);
    });

    return () => unsubscribe();
  }, [groupId]);

  // 🧩 2. Lógica de drag & drop
  const handleDragStart = (event) => {
    const { card, columnId, index } = event.active.data.current;
    setActiveCard({ ...card, columnId, index });
  };

  const handleAddTask = async ({ content, description }) => {
    const newCard = {
      id: crypto.randomUUID(),
      content,
      description,
    };

    const columnRef = doc(db, "groups", groupId, "board", "todo");
    const columnSnap = await getDoc(columnRef);
    const currentCards = columnSnap.data()?.cards || [];

    const updatedCards = [...currentCards, newCard];
    await updateDoc(columnRef, { cards: updatedCards });
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = active.data.current.columnId;
    const overColumnId = over.data.current?.columnId || over.id;
    if (!activeColumnId || !overColumnId) return;

    const activeIndex = active.data.current.index;
    const overIndex = over.data.current?.index ?? 0;

    // ✅ Evita cambios innecesarios
    if (activeColumnId === overColumnId && activeIndex === overIndex) {
      setActiveCard(null);
      return;
    }

    const sourceCards = [...columns[activeColumnId].cards];
    const destinationCards = [...columns[overColumnId].cards];

    const [movedCard] = sourceCards.splice(activeIndex, 1);
    destinationCards.splice(overIndex, 0, movedCard);

    try {
      const sourceRef = doc(db, "groups", groupId, "board", activeColumnId);
      const destRef = doc(db, "groups", groupId, "board", overColumnId);

      await Promise.all([
        updateDoc(sourceRef, { cards: sourceCards }),
        updateDoc(destRef, { cards: destinationCards }),
      ]);
    } catch (error) {
      console.error("Error actualizando columnas:", error);
    }

    setActiveCard(null);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-cyan-900 to-blue-900 min-h-screen w-full flex flex-col">
      <div className="flex-shrink-0">
        <h1 className="text-2xl font-bold text-white mt-8 mb-8 text-center">
          Tablero {groupName}
        </h1>
      </div>

      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {/* Wrapper scrollable horizontal */}
        <div className="overflow-x-auto w-full flex-grow">
          <div className="flex justify-around gap-5">
            <SortableContext items={Object.keys(columns)}>
              {["todo", "inProgress", "done"]
                .map((columnId) => columns[columnId])
                .filter(Boolean)
                .map((column) => (
                  <KanbanColumn
                    key={column.id}
                    id={column.id}
                    title={column.title}
                    cards={column.cards}
                    groupId={groupId}
                    onOpenModal={
                      column.id === "todo"
                        ? () => setIsModalOpen(true)
                        : undefined
                    }
                  />
                ))}
            </SortableContext>
          </div>
        </div>

        <DragOverlay>
          {activeCard && (
            <KanbanCard
              card={activeCard}
              groupId={groupId}
              columnId={activeCard.columnId || ""}
              index={activeCard.index || 0}
            />
          )}
        </DragOverlay>
      </DndContext>

      <ModalNuevaTarea
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTask}
      />
    </div>


  );
};

export default KanbanBoard;
