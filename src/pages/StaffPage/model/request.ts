import type { Filters, ListData } from "src/shared/types";
import type { StaffMember } from "./types";
import axios from "./mockApi";


export const fetchStaffApi = async (
  filters: Filters, 
): Promise<ListData<StaffMember> | null> => {
  try {
    const response = await axios.get('/api/staff', {
      params: filters
    });

    return response.data;
  } catch (error) {
    console.error('Error loading employees:', error);
    return null;
  }
};
