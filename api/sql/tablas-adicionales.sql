-- ============================================
-- TABLAS ADICIONALES — Torneos y Graduaciones
-- Ejecutar en dragonknight_database
-- ============================================

-- TORNEOS
CREATE TABLE IF NOT EXISTS torneos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    fecha DATE,
    lugar VARCHAR(300),
    descripcion TEXT,
    precio DECIMAL(10,2) DEFAULT 0,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inscripciones_torneo (
    id SERIAL PRIMARY KEY,
    torneo_id INTEGER REFERENCES torneos(id) ON DELETE CASCADE,
    alumno_id INTEGER REFERENCES alumnos(id) ON DELETE CASCADE,
    modalidades TEXT,
    monto_pagado DECIMAL(10,2) DEFAULT 0,
    estado VARCHAR(30) DEFAULT 'Registrado',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(torneo_id, alumno_id)
);

CREATE INDEX idx_inscripciones_torneo_torneo ON inscripciones_torneo(torneo_id);
CREATE INDEX idx_inscripciones_torneo_alumno ON inscripciones_torneo(alumno_id);

-- GRADUACIONES
CREATE TABLE IF NOT EXISTS graduaciones (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    fecha DATE,
    lugar VARCHAR(300),
    descripcion TEXT,
    activa BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS participantes_graduacion (
    id SERIAL PRIMARY KEY,
    graduacion_id INTEGER REFERENCES graduaciones(id) ON DELETE CASCADE,
    alumno_id INTEGER REFERENCES alumnos(id) ON DELETE CASCADE,
    cinturon_actual VARCHAR(50),
    cinturon_nuevo VARCHAR(50),
    estado VARCHAR(30) DEFAULT 'Pendiente',
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(graduacion_id, alumno_id)
);

CREATE INDEX idx_participantes_grad_graduacion ON participantes_graduacion(graduacion_id);
CREATE INDEX idx_participantes_grad_alumno ON participantes_graduacion(alumno_id);
