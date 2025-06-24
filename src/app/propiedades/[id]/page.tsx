'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import propiedades from '@/data/propiedades';
import Link from 'next/link';

export default function DetallePropiedad() {
    const router = useRouter();
    const { id } = useParams() as { id: string };
    const [clima, setClima] = useState<{ temperature: number; windspeed: number } | null>(null);
    const [darkMode, setDarkMode] = useState(false);

    const propiedad = propiedades.find((p) => p.id === id);

    // Protección de ruta
    useEffect(() => {
        if (localStorage.getItem('auth') !== 'true') {
            router.push('/login');
        }
    }, [router]);

    // Fetch clima real
    useEffect(() => {
        if (propiedad) {
            fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${propiedad.lat}&longitude=${propiedad.lon}&current_weather=true`
            )
                .then((res) => res.json())
                .then((data) => setClima(data.current_weather))
                .catch((err) => {
                    console.error('Error al obtener el clima:', err);
                });
        }
    }, [propiedad]);

    if (!propiedad) {
        return (
            <div className="p-4">
                <p>Propiedad no encontrada.</p>
                <Link href="/propiedades" className="text-blue-600 hover:underline">
                    ← Volver al listado
                </Link>
            </div>
        );
    }

    return (
        <div className={darkMode ? 'container dark' : 'container'}>
            <Link href="/propiedades" className="inline-block mb-6 text-blue-600 hover:underline">
                ← Volver al listado
            </Link>

            <div className="toggle-container">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    style={{
                        padding: '8px 12px',
                        cursor: 'pointer',
                    }}
                >
                    Cambiar a {darkMode ? 'modo claro' : 'modo oscuro'}
                </button>
            </div>

            <style jsx>{`
                .toggle-container {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 20px;
                }
                button {
                    background: #0070f3;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    font-weight: bold;
                }
                button:hover {
                    background: #005bb5;
                }
            `}</style>

            <div className="card">
                <img src={propiedad.imagen} alt={propiedad.nombre} className="imagen" />
                <div className="contenido">
                    <h1>{propiedad.nombre}</h1>
                    <p className="direccion">{propiedad.direccion}</p>
                    <p className="precio">${propiedad.precio}/mes</p>

                    <div className="descripcion">
                        <h2>Descripción</h2>
                        <p>{propiedad.descripcion}</p>
                    </div>

                    <div className="clima">
                        <h2>Clima Actual</h2>
                        {clima ? (
                            <div>
                                <p>
                                    🌡 <strong>Temperatura:</strong> {clima.temperature} °C
                                </p>
                                <p>
                                    💨 <strong>Viento:</strong> {clima.windspeed} km/h
                                </p>
                            </div>
                        ) : (
                            <p>Cargando clima...</p>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .container {
                    background: #f9f9f9;
                    color: #111;
                    min-height: 100vh;
                    padding: 2rem;
                    transition: background 0.3s, color 0.3s;
                }
                .container.dark {
                    background: #121212;
                    color: #eee;
                }
                button {
                    background: #0070f3;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    font-weight: bold;
                }
                button:hover {
                    background: #005bb5;
                }
                .card {
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    max-width: 900px;
                    margin: auto;
                    transition: background 0.3s, color 0.3s;
                }
                .container.dark .card {
                    background: #1e1e1e;
                    box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
                }
                .imagen {
                    width: 100%;
                    height: 350px;
                    object-fit: cover;
                }
                .contenido {
                    padding: 20px;
                }
                h1 {
                    font-size: 2rem;
                    margin-bottom: 8px;
                }
                .direccion {
                    color: #666;
                    margin-bottom: 12px;
                }
                .precio {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: #0070f3;
                    margin-bottom: 20px;
                }
                .descripcion h2,
                .clima h2 {
                    font-size: 1.25rem;
                    margin-bottom: 8px;
                }
                .descripcion p,
                .clima p {
                    color: #444;
                }
                .container.dark .direccion,
                .container.dark .descripcion p,
                .container.dark .clima p {
                    color: #ccc;
                }
            `}</style>
        </div>
    );
}
