export type ClosestLocationResponse = {
  bearing: string;
  city: string;
  country: string;
  created_at: string;
  date_last_updated: string;
  description: string | null;
  distance: number;
  ic_active: boolean;
  id: number;
  is_stern_army: string | null;
  last_updated_by_user_id: string | null;
  lat: string;
  location_type_id: number;
  lon: string;
  machine_ids: number[];
  machine_names: string[];
  name: string;
  num_machines: number;
  operator_id: string | null;
  phone: string;
  region_id: string | null;
  state: string;
  street: string;
  updated_at: string;
  website: string;
  zip: string | null;
  zone_id: string | null;
};