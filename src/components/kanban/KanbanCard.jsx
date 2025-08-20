import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2 } from "lucide-react"; // Asegúrate de tener `lucide-react` o usa cualquier otro ícono SVG
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase/firebase";
import { useState } from "react";

const KanbanCard = ({ card, columnId, index, groupId }) => {
  const [deleting, setDeleting] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: {
      card,
      columnId,
      index,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleDelete = async () => {
    try {
      setDeleting(true); // puedes usar estado opcional
      const columnRef = doc(db, "groups", groupId, "board", columnId);
      const columnSnap = await getDoc(columnRef);

      if (!columnSnap.exists()) return;

      const cards = columnSnap.data()?.cards || [];
      const updatedCards = cards.filter((c) => c.id !== card.id);

      await updateDoc(columnRef, { cards: updatedCards });
    } catch (err) {
      console.error("Error al eliminar tarjeta:", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
  ref={setNodeRef}
  style={style}
  {...attributes}
  {...listeners}
  className={`kanban-card relative bg-white p-4 rounded-xl shadow-md 
  cursor-grab active:cursor-grabbing hover:scale-[1.02] hover:shadow-lg 
  transition-all duration-200 flex justify-between items-start`}
>
  <div className="flex-1 font-semibold text-gray-800 whitespace-pre-line">
    {card.content}
  </div>
  <button
    onClick={(e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!deleting) handleDelete();
    }}
    disabled={deleting}
    className={`text-red-500 hover:text-red-700 ml-3 mt-1 ${
      deleting ? "opacity-50 cursor-not-allowed" : ""
    }`}
    title="Eliminar tarjeta"
  >
    <Trash2 size={20} />
  </button>
</div>

  );
};

export default KanbanCard;
