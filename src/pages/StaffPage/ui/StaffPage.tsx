import { useEffect, useState } from 'react'
import { List, StaffFilters } from 'src/components';
import cls from './StaffPage.module.css';
import { columns } from '../model/constants';
import { initialFilters, type ListData, type ListFilters, type ListParams, type QueryParams, type QueryResponse, type StaffData, type StaffMember } from 'src/config';
import { fetchStaffApi } from '../model/request';

export const StaffPage = () => {
  const [data, setData] = useState<ListData<StaffMember>>({ items: [], total: 0 });
  const [filters, setFilters] = useState<ListFilters>(initialFilters);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStaff = async (filters: ListFilters) => {
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
    <div className={cls.content}>
      <h2 className={cls.title}>Сотрудники компании</h2>

      <StaffFilters
        filters={filters}
        setFilters={setFilters}
      />

      <List
        items={data.items}
        total={data.total}
        columns={columns}
        filters={filters}
        setFilters={setFilters}
        isLoading={isLoading}
      />
    </div>
  );
};
