import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import KanbanCard from './KanbanCard';

const KanbanColumn = ({ id, title, cards, groupId ,onOpenModal }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col min-w-100  bg-white/70 rounded-lg shadow-md p-4 border-none"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-1xl text-gray-800">{title}</h2>
        {id === "todo" && (
          <button
            onClick={onOpenModal}
            className="text-sm text-cyan-900 font-semibold hover:underline"
          >
            + Nueva tarea
          </button>
        )}
      </div>

      <SortableContext
        items={cards.map((card) => card.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {cards.map((card, index) => (
            <KanbanCard
              key={card.id}
              card={card}
              columnId={id}
              index={index}
              groupId={groupId}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};


export default KanbanColumn;