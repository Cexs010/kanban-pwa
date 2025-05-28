import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import KanbanCard from './KanbanCard';

const KanbanColumn = ({ id, title, cards }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col w-72 bg-white rounded-lg shadow-sm p-4 border border-purple-100"
    >
      <h2 className="font-bold text-purple-700 mb-4">{title}</h2>
      
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
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default KanbanColumn;