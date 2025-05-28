import { useState } from 'react';
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import KanbanColumn from './KanbanColumn';
import KanbanCard from './KanbanCard';

const KanbanBoard = () => {
  // Estado inicial del tablero
  const [columns, setColumns] = useState({
    todo: {
      id: 'todo',
      title: '📝 Por hacer',
      cards: [
        { id: '1', content: 'Diseñar interfaz' },
        { id: '2', content: 'Revisar requisitos' },
      ],
    },
    inProgress: {
      id: 'inProgress',
      title: '🚀 En progreso',
      cards: [{ id: '3', content: 'Integrar DnD' }],
    },
    done: {
      id: 'done',
      title: '✅ Terminado',
      cards: [{ id: '4', content: 'Configurar proyecto' }],
    },
  });

  const [activeCard, setActiveCard] = useState(null);

  // Manejadores de drag-and-drop
  const handleDragStart = (event) => {
    const { active } = event;
    setActiveCard(active.data.current.card);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = active.data.current.columnId;
    const overColumnId = over.data.current?.columnId || over.id;

    // Mismo contenedor: reordenar
    if (activeColumnId === overColumnId) {
      setColumns((prev) => {
        const newCards = arrayMove(
          prev[activeColumnId].cards,
          active.data.current.index,
          over.data.current?.index || 0
        );
        return {
          ...prev,
          [activeColumnId]: {
            ...prev[activeColumnId],
            cards: newCards,
          },
        };
      });
    } else {
      // Cambio de columna
      setColumns((prev) => {
        const activeCards = [...prev[activeColumnId].cards];
        const overCards = [...prev[overColumnId].cards];
        const movedCard = activeCards[active.data.current.index];

        // Remueve de la columna original
        activeCards.splice(active.data.current.index, 1);
        // Agrega a la nueva columna
        overCards.splice(over.data.current?.index || 0, 0, movedCard);

        return {
          ...prev,
          [activeColumnId]: {
            ...prev[activeColumnId],
            cards: activeCards,
          },
          [overColumnId]: {
            ...prev[overColumnId],
            cards: overCards,
          },
        };
      });
    }

    setActiveCard(null);
  };

  return (
    <div className="p-4 bg-purple-50 min-h-screen">
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto">
          <SortableContext items={Object.keys(columns)}>
            {Object.values(columns).map((column) => (
              <KanbanColumn
                key={column.id}
                id={column.id}
                title={column.title}
                cards={column.cards}
              />
            ))}
          </SortableContext>
        </div>

        <DragOverlay>
          {activeCard && (
            <KanbanCard
              card={activeCard}
              style={{
                transform: 'rotate(3deg)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
              }}
            />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default KanbanBoard;