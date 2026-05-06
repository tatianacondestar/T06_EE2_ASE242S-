import { BASE_URL } from './config';

export type ActivityBackend = {
  id: string;
  name: string;
  description: string;
  durationHours: number;
  maxQuota: number;
  price: number;
  location: string;
  difficulty: number;
  activityDate: string;
  state: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

export type CreateActivityDto = Omit<ActivityBackend, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

export async function fetchActivities(): Promise<ActivityBackend[]> {
  const res = await fetch(`${BASE_URL}/api/activities`);
  if (!res.ok) throw new Error('Error al cargar actividades');
  return res.json();
}

export async function fetchActivityById(id: string): Promise<ActivityBackend> {
  const res = await fetch(`${BASE_URL}/api/activities/${id}`);
  if (!res.ok) throw new Error(`Actividad ${id} no encontrada`);
  return res.json();
}

export async function fetchActivitiesByState(state: boolean): Promise<ActivityBackend[]> {
  const res = await fetch(`${BASE_URL}/api/activities/state/${state}`);
  if (!res.ok) throw new Error('Error al filtrar actividades');
  return res.json();
}

export async function createActivity(data: CreateActivityDto): Promise<ActivityBackend> {
  const res = await fetch(`${BASE_URL}/api/activities`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear actividad');
  return res.json();
}

export async function updateActivity(id: string, data: Partial<CreateActivityDto>): Promise<ActivityBackend> {
  const res = await fetch(`${BASE_URL}/api/activities/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar actividad');
  return res.json();
}

export async function deleteActivityLogical(id: string): Promise<ActivityBackend> {
  const res = await fetch(`${BASE_URL}/api/activities/delete/${id}`, { method: 'PATCH' });
  if (!res.ok) throw new Error('Error al eliminar actividad');
  return res.json();
}

export async function restoreActivity(id: string): Promise<ActivityBackend> {
  const res = await fetch(`${BASE_URL}/api/activities/restore/${id}`, { method: 'PATCH' });
  if (!res.ok) throw new Error('Error al restaurar actividad');
  return res.json();
}
