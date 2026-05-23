import { type Column } from "src/config";

export const columns: Column[] = [
  { id: 'id', name: 'ID', width: 70 },
  { id: 'name', name: 'Имя/фамилия', flex: 1 },
  { id: 'email', name: 'Email', flex: 1.2 },
  { id: 'role', name: 'Роль', flex: 1, sortable: true },
  { id: 'department', name: 'Отдел', flex: 1, sortable: true }
];
