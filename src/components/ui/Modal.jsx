export default function Modal({ title, children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl font-bold"
        >
          &times;
        </button>
        <h5 className="text-center text-lg font-semibold mb-4">{title}</h5>
        {children}
      </div>
    </div>
  );
}
