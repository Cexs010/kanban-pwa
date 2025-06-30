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
      className="bg-purple-50 p-3 rounded-lg shadow-lg border border-purple-200 cursor-grab active:cursor-grabbing hover:scale-[1.02] hover:shadow-xl transition-transform duration-200 flex justify-between items-center"
    >
      <div className="flex-1">{card.content}</div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          if (!deleting) handleDelete();
        }}
        disabled={deleting}
        className={`text-red-500 hover:text-red-700 ml-2 ${
          deleting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        title="Eliminar tarjeta"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default KanbanCard;
