type Item = {
  id: string;
  name: string;
}

export const getLabel = (list: Item[], id: string, value: string | string[]) => {
  const column = list.find(item => item.id === id);
  const name = column?.name && `${column.name}: `;

  if (Array.isArray(value)) {
    return name + value.join(', ');
  }

  return name + value;
}