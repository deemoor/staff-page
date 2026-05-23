import { useEffect, useState, type FC } from 'react'
import type { Filters, ListData } from 'src/shared/types';
import { List } from 'src/shared/ui';
import type { StaffMember } from '../../model/types';
import { fetchStaffApi, columns } from '../../model';

type Props = {
  filters: Filters;
  updateFilters: (newFilters: Partial<Filters>) => void;
}

export const StaffTable:FC<Props> = ({ filters, updateFilters }) => {
  const [data, setData] = useState<ListData<StaffMember>>({ items: [], total: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const fetchStaff = async (filters: Filters) => {
    setIsLoading(true);
    const result = await fetchStaffApi(filters);

    if (result) {
      setData({
        items: result.items,
        total: result.total
      });
    }  
    setIsLoading(false);
  };

  useEffect(() => {
    fetchStaff(filters);
  }, [filters]);

  return (
    <List
      items={data.items}
      total={data.total}
      columns={columns}
      filters={filters}
      updateFilters={updateFilters}
      isLoading={isLoading}
    />
  );
};
