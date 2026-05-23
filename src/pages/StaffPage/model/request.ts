import type { ListData, ListFilters, ListParams, QueryResponse, StaffMember } from "src/config";
import axios from "src/config/mockApi";

export const fetchStaffApi = async (
  filters: ListFilters, 
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