interface UserProfileCardProps {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  status: 'online' | 'offline';
}

function UserProfileCard ({ name, role, bio, imageUrl, status }: UserProfileCardProps) {
  // Clase condicional para el indicador de estado (online/offline)
  const statusClass = status === 'online'
    ? 'bg-green-500' // Clase para estado "online"
    : 'bg-red-500';  // Clase para estado "offline"

  return (
    <div className="mx-auto mt-20 p-6 max-w-sm rounded-xl shadow-xl transition-shadow bg-gray-900 dark:bg-deep-gray">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img className="w-16 h-16 rounded-full" src={imageUrl} alt={name} />
          <span className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white ${statusClass}`}></span>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-deep-gray dark:text-white">{name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
        </div>
      </div>

      <p className="mt-4 text-gray-600 text-sm dark:text-gray-300">{bio}</p>

      <button className="mt-6 w-full py-2 px-4 rounded-lg font-bold bg-brand-primary text-white hover:bg-brand-light hover:text-deep-gray focus:outline-none focus:ring-4 focus:ring-brand-light">
        Enviar Mensaje
      </button>
    </div>
  );
};

export default UserProfileCard;
