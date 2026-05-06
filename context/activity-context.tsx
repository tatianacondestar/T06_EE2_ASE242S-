import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import {
  fetchActivities,
  createActivity,
  updateActivity,
  deleteActivityLogical,
  restoreActivity,
  type ActivityBackend,
} from '@/src/api/activity.api';

// Shape used throughout the app UI (maps backend fields to friendly names)
export type Activity = {
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
  // Legacy UI fields kept for home/detail screens
  short: string;
  image: string;
  duration: string;
  level: string;
  includes: string[];
};

type ActivityContextType = {
  activities: Activity[];
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  addActivity: (data: Omit<Activity, 'id' | 'state'>) => Promise<void>;
  updateActivityById: (id: string, data: Partial<Activity>) => Promise<void>;
  deleteActivity: (id: string) => Promise<void>;
  restoreActivityById: (id: string) => Promise<void>;
};

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

/** Map backend model → UI Activity */
function mapBackend(a: ActivityBackend): Activity {
  return {
    id: a.id,
    name: a.name ?? '',
    description: a.description ?? '',
    durationHours: a.durationHours ?? 0,
    maxQuota: a.maxQuota ?? 0,
    price: a.price ?? 0,
    location: a.location ?? '',
    difficulty: a.difficulty ?? 1,
    activityDate: a.activityDate ?? '',
    state: a.state ?? true,
    // Legacy UI fields derived from backend data
    short: a.description ?? '',
    image: '',          // backend doesn't store image URL yet
    duration: a.durationHours ? `${a.durationHours} hora(s)` : '',
    level: a.difficulty ? `Nivel ${a.difficulty}` : '',
    includes: [],
  };
}

/** Map UI Activity → backend DTO */
function mapToBackend(a: Partial<Activity>): Record<string, unknown> {
  return {
    name: a.name,
    description: a.description ?? a.short,
    durationHours: a.durationHours,
    maxQuota: a.maxQuota,
    price: a.price,
    location: a.location,
    difficulty: a.difficulty,
    activityDate: a.activityDate,
    state: a.state,
  };
}

export function ActivityProvider({ children }: { children: ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchActivities();
      setActivities(data.map(mapBackend));
    } catch (err: any) {
      setError(err?.message ?? 'Error al cargar actividades');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const addActivity = async (data: Omit<Activity, 'id' | 'state'>) => {
    setIsLoading(true);
    try {
      const created = await createActivity(mapToBackend(data) as any);
      setActivities((prev) => [...prev, mapBackend(created)]);
    } catch (err: any) {
      setError(err?.message ?? 'Error al crear actividad');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateActivityById = async (id: string, data: Partial<Activity>) => {
    setIsLoading(true);
    try {
      const updated = await updateActivity(id, mapToBackend(data) as any);
      setActivities((prev) =>
        prev.map((a) => (a.id === id ? mapBackend(updated) : a))
      );
    } catch (err: any) {
      setError(err?.message ?? 'Error al actualizar actividad');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteActivity = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteActivityLogical(id);
      // Mark as inactive in local state (logical delete)
      setActivities((prev) =>
        prev.map((a) => (a.id === id ? { ...a, state: false } : a))
      );
    } catch (err: any) {
      setError(err?.message ?? 'Error al eliminar actividad');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const restoreActivityById = async (id: string) => {
    setIsLoading(true);
    try {
      await restoreActivity(id);
      setActivities((prev) =>
        prev.map((a) => (a.id === id ? { ...a, state: true } : a))
      );
    } catch (err: any) {
      setError(err?.message ?? 'Error al restaurar actividad');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ActivityContext.Provider
      value={{
        activities,
        isLoading,
        error,
        reload: load,
        addActivity,
        updateActivityById,
        deleteActivity,
        restoreActivityById,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}

export const useActivities = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivities must be used within ActivityProvider');
  }
  return context;
};
