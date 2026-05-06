import { BASE_URL } from './config';

export type CustomerBackend = {
  // Spring serializa @Id como "id" en el JSON, pero el campo Java se llama "idCustomer"
  // Soportamos ambos para compatibilidad
  id?: string;
  idCustomer?: string;
  name: string;
  lastName: string;
  birthDate: string;
  docType: string;
  docNumber: string;
  email: string;
  phoneNumber: string;
  state: boolean;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
};

/** Obtiene el ID real del cliente independientemente del campo que use el backend */
export function getCustomerId(c: CustomerBackend): string {
  return (c.id ?? c.idCustomer ?? '') as string;
}

export async function fetchCustomers(): Promise<CustomerBackend[]> {
  const res = await fetch(`${BASE_URL}/api/customers`);
  if (!res.ok) throw new Error('Error al cargar clientes');
  return res.json();
}

export async function fetchCustomerById(id: string): Promise<CustomerBackend> {
  const res = await fetch(`${BASE_URL}/api/customers/${id}`);
  if (!res.ok) throw new Error(`Cliente ${id} no encontrado`);
  return res.json();
}

export async function createCustomer(data: Partial<CustomerBackend>): Promise<CustomerBackend> {
  const res = await fetch(`${BASE_URL}/api/customers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear cliente');
  return res.json();
}

export async function updateCustomer(id: string, data: Partial<CustomerBackend>): Promise<CustomerBackend> {
  const res = await fetch(`${BASE_URL}/api/customers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar cliente');
  return res.json();
}

export async function activateCustomer(id: string): Promise<CustomerBackend> {
  const res = await fetch(`${BASE_URL}/api/customers/${id}/activate`, { method: 'PATCH' });
  if (!res.ok) throw new Error('Error al activar cliente');
  return res.json();
}

export async function deactivateCustomer(id: string): Promise<CustomerBackend> {
  const res = await fetch(`${BASE_URL}/api/customers/${id}/deactivate`, { method: 'PATCH' });
  if (!res.ok) throw new Error('Error al desactivar cliente');
  return res.json();
}
