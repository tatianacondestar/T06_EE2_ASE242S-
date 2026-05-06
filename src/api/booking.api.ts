import { BASE_URL } from './config';

export type BookingDetail = {
  activityName: string;
  personnelQuantity: number;
  subTotal: number;
  discount: number;
  stateDetail: string;
  equipment: { name: string; quantity: number; returned: boolean }[];
};

export type Payment = {
  amount: number;
  paymentMethod: string;
  currency: string;
  payDate: string;
};

export type BookingBackend = {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  bookingDate: string;
  totalPay: number;
  state: boolean;
  details: BookingDetail[];
  payments: Payment[];
  createdAt: string;
};

export async function fetchBookings(): Promise<BookingBackend[]> {
  const res = await fetch(`${BASE_URL}/api/bookings`);
  if (!res.ok) throw new Error('Error al cargar reservas');
  return res.json();
}

export async function fetchBookingById(id: string): Promise<BookingBackend> {
  const res = await fetch(`${BASE_URL}/api/bookings/${id}`);
  if (!res.ok) throw new Error(`Reserva ${id} no encontrada`);
  return res.json();
}

export async function createBooking(data: Partial<BookingBackend>): Promise<BookingBackend> {
  const res = await fetch(`${BASE_URL}/api/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear reserva');
  return res.json();
}
