import { is } from 'ramda';

export const grabFromDb = async (db, table, condition = {}, select = '*') => {
  if (is(Object, table)) {
    table = table.getTableName();
  }

  return db(table).where(condition).orderBy('id').select(select);
};
