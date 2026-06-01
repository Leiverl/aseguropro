const { initDb, queryOne, execute, execRaw } = require('./database');
const bcrypt = require('bcryptjs');

async function seed() {
  await initDb();

  const existingPlans = queryOne('SELECT COUNT(*) as count FROM plans');
  if (existingPlans.count > 0) {
    console.log('Limpiando datos existentes...');
    execRaw('DELETE FROM policies');
    execRaw('DELETE FROM quotes');
    execRaw('DELETE FROM appointments');
    execRaw('DELETE FROM plans');
    execRaw('DELETE FROM users');
    execRaw("DELETE FROM sqlite_sequence");
  }

  const plans = [
    { name: 'Salud Esencial', type: 'health', description: 'Cobertura médica básica con consultas y medicamentos', price: 29.99, coverage: 'Consulta médica general, Medicamentos genéricos, Exámenes básicos', benefits: 'Consultas ilimitadas, 30% descuento en medicamentos', icon: 'heart', color: '#ef4444', is_student: 0, popular: 1 },
    { name: 'Salud Premium', type: 'health', description: 'Cobertura médica completa con hospitalización y especialistas', price: 59.99, coverage: 'Hospitalización, Especialistas, Cirugías, Medicamentos', benefits: 'Sin copago, Cobertura internacional, Ambulancia', icon: 'heart', color: '#dc2626', is_student: 0, popular: 0 },
    { name: 'Auto Básico', type: 'auto', description: 'Protección contra daños a terceros', price: 39.99, coverage: 'Daños a terceros, Responsabilidad civil, Asistencia en carretera', benefits: 'Asistencia 24/7, Auto sustituto', icon: 'car', color: '#3b82f6', is_student: 0, popular: 0 },
    { name: 'Auto Total', type: 'auto', description: 'Cobertura completa con robo, incendio y daños', price: 79.99, coverage: 'Todo riesgo, Robo, Incendio, Daños propios, Cristales', benefits: 'Vehículo sustituto, Asistencia internacional', icon: 'car', color: '#2563eb', is_student: 0, popular: 1 },
    { name: 'Hogar Seguro', type: 'home', description: 'Protección contra incendios, robos y daños estructurales', price: 24.99, coverage: 'Incendio, Robo, Daños por agua, Responsabilidad civil', benefits: 'Reparaciones urgentes, Jardinería', icon: 'home', color: '#22c55e', is_student: 0, popular: 1 },
    { name: 'Hogar Plus', type: 'home', description: 'Cobertura amplia con contenido y responsabilidad civil', price: 49.99, coverage: 'Contenido del hogar, Joyas, Equipos electrónicos, Obras de arte', benefits: 'Asistencia informática, Cerrajería', icon: 'home', color: '#16a34a', is_student: 0, popular: 0 },
    { name: 'Vida Tranquilidad', type: 'life', description: 'Seguro de vida con cobertura por fallecimiento', price: 19.99, coverage: 'Fallecimiento por cualquier causa, Invalidez total', benefits: 'Asesoría legal, Apoyo psicológico', icon: 'users', color: '#a855f7', is_student: 0, popular: 0 },
    { name: 'Vida Familiar', type: 'life', description: 'Cobertura para toda la familia con beneficios adicionales', price: 34.99, coverage: 'Titular + cónyuge + hijos, Enfermedades graves, Educación', benefits: 'Cobertura dental, Apoyo escolar', icon: 'users', color: '#9333ea', is_student: 0, popular: 1 },
    { name: 'Viajero Seguro', type: 'travel', description: 'Asistencia en viajes nacionales e internacionales', price: 14.99, coverage: 'Emergencias médicas, Pérdida de equipaje, Cancelación', benefits: 'Traductor, Asistencia legal', icon: 'plane', color: '#f59e0b', is_student: 0, popular: 0 },
    { name: 'Viajero Global', type: 'travel', description: 'Cobertura mundial con cancelación y equipaje', price: 29.99, coverage: 'Cobertura mundial, Deportes de aventura, Repatriación', benefits: 'Acceso a salas VIP, Seguro de cancelación', icon: 'plane', color: '#d97706', is_student: 0, popular: 1 },
    { name: 'Estudiante Básico', type: 'student', description: 'Protección básica para estudiantes con cobertura de útiles y accidentes menores', price: 9.99, coverage: 'Accidentes personales, Pérdida de útiles, Asistencia académica', benefits: 'Descuento en librerías, Tutorías gratuitas', icon: 'graduation-cap', color: '#06b6d4', is_student: 1, popular: 1 },
    { name: 'Estudiante Completo', type: 'student', description: 'Cobertura completa para estudiantes con salud, equipo electrónico y asistencia académica', price: 19.99, coverage: 'Salud básica, Equipo electrónico, Accidentes, Apoyo psicológico', benefits: 'Seguro de laptop, Orientación vocacional, Descuentos en cursos', icon: 'graduation-cap', color: '#0891b2', is_student: 1, popular: 1 },
  ];

  for (const plan of plans) {
    execute(
      'INSERT INTO plans (name, type, description, price, coverage, benefits, icon, color, is_student, popular) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [plan.name, plan.type, plan.description, plan.price, plan.coverage, plan.benefits, plan.icon, plan.color, plan.is_student, plan.popular]
    );
  }

  const hashedPassword = bcrypt.hashSync('demo123', 10);
  execute('INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)', ['Usuario Demo', 'demo@email.com', hashedPassword, '555-0100', 'user']);

  console.log('Base de datos inicializada correctamente');
  console.log('12 planes de seguro insertados');
  console.log('Usuario demo: demo@email.com / demo123');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
