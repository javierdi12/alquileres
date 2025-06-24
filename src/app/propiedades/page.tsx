import Link from 'next/link';
import propiedades from '@/data/propiedades';

export default function PropiedadesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Propiedades Disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {propiedades.map((propiedad) => (
          <div key={propiedad.id} className="border rounded-lg overflow-hidden shadow">
            <img
              src={propiedad.imagen}
              alt={propiedad.nombre}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{propiedad.nombre}</h2>
              <p className="text-gray-600">{propiedad.direccion}</p>
              <p className="text-lg font-bold mt-2">${propiedad.precio}/mes</p>
              <Link
                href={`/propiedades/${propiedad.id}`}
                className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Ver Detalles
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}