import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { DEFAULT_PAGE, DEFAULT_PERPAGE } from 'src/shared/config';
import type { Filters } from 'src/shared/types';
import type { StaffMember } from './types';
import { MOCK_STAFF } from './mockData';

const mock = new MockAdapter(axios, { delayResponse: 500 });

const getStaffValue = (item: StaffMember, key: string) => item[key as keyof StaffMember];

mock.onGet('/api/staff').reply((config) => {
  const { 
    page = DEFAULT_PAGE, 
    perPage = DEFAULT_PERPAGE,
    sortBy = undefined,
    sortOrder = undefined,
    search = '',
    fields = {}
  }: Filters = config.params || {};

  let filteredData = [...MOCK_STAFF];

  if (fields && Object.keys(fields).length > 0) {
    filteredData = filteredData.filter(item => 
      Object.entries(fields).every(([key, value]) => {
        if (!value || (Array.isArray(value) && value.length === 0)) return true;
        
        const itemValue = String(getStaffValue(item, key));
        
        if (Array.isArray(value)) {
          return value.map(String).includes(itemValue);
        }

        return itemValue === String(value);
      })
    );
  }

  if (search) {
    const lowSearch = search.toLowerCase();

    filteredData = filteredData.filter(item => {
      const allFields = [item.id, item.name, item.email, item.role, item.department];
      return allFields.some(field => 
        field && String(field).toLowerCase().includes(lowSearch)
      );
    });
  }

  if (sortBy && sortOrder) {
    filteredData.sort((a, b) => {
      const valueA = String(getStaffValue(a, sortBy) || '').toLowerCase();
      const valueB = String(getStaffValue(b, sortBy) || '').toLowerCase();
     
      if (sortOrder === 'asc') {
        return valueA.localeCompare(valueB);
      }
      return valueB.localeCompare(valueA);
    });
  }

  const totalCount = filteredData.length;
  const startIndex = page * perPage;
  const endIndex = startIndex + perPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return [
    200, 
    {
      items: paginatedData,
      total: totalCount
    }
  ];
});

export default axios;
