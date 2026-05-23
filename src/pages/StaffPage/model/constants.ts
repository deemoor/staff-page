import type { Column } from "src/shared/types";

export const STAFF_ROLE = {
  Manager: 'Менеджер',
  Developer: 'Разработчик',
  Designer: 'Дизайнер',
  Engineer: 'Инженер',
  Analyst: 'Аналитик',
  Recruiter: 'Рекрутер',
  SalesManager: 'Менеджер по продажам',
  Specialist: 'Специалист',
} as const;

export const STAFF_DEPARTMENT = {
  Engineering: 'Разработка',
  Product: 'Продукт',
  Design: 'Дизайн',
  Operations: 'Операционный отдел',
  People: 'HR / Отдел кадров',
  Marketing: 'Маркетинг',
  Sales: 'Продажи',
  Support: 'Поддержка',
  Finance: 'Финансы',
  Legal: 'Юридический отдел',
} as const;

export const columns: Column[] = [
  { id: 'id', name: 'ID', width: 70 },
  { id: 'name', name: 'Имя/фамилия', flex: 1 },
  { id: 'email', name: 'Email', flex: 1.2 },
  { id: 'role', name: 'Роль', flex: 1, sortable: true },
  { id: 'department', name: 'Отдел', flex: 1, sortable: true }
];
