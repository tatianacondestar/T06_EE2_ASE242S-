import { BASE_URL } from './config';

export type AuthResponse = {
  token?: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    role: string;
  };
};

export type LoginDto = {
  email: string;
  password: string;
};

export type RegisterDto = {
  fullName: string;
  email: string;
  password: string;
  role?: string;
};

export async function loginApi(data: LoginDto): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    let message = 'Correo o contraseña incorrectos';
    try {
      const err = await res.json();
      message = err.message || err.error || message;
    } catch {
      try { message = (await res.text()) || message; } catch { /* noop */ }
    }
    throw new Error(message);
  }
  return res.json();
}

export async function registerApi(data: RegisterDto): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Error al registrar usuario');
  }
  return res.json();
}
