interface Propiedad {
  id: string;
  nombre: string;
  direccion: string;
  descripcion: string;
  precio: number;
  imagen: string;
  lat: number;
  lon: number;
}

const propiedades: Propiedad[] = [
  {
    id: '1',
    nombre: 'Casa de vacaiones',
    direccion: 'Avenida Central, San José',
    descripcion: 'Casa amplia en el centro de San José.',
    precio: 1200,
    imagen: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
    lat: 9.9281,
    lon: -84.0907
  },
  {
    id: '2',
    nombre: 'Casa de Oficina',
    direccion: 'Calle Principal, Guápiles',
    descripcion: 'Propiedad cómoda y moderna en Guápiles.',
    precio: 800,
    imagen: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
    lat: 10.2146,
    lon: -83.7847
  }
];


export default propiedades;