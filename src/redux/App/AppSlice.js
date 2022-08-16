import { createSlice } from '@reduxjs/toolkit';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const AppAdapter = createEntityAdapter({ selectId: (e) => e.id });
export const AppSelector = AppAdapter.getSelectors((state) => state.app);

export const AppSlice = createSlice({
  name: 'app',
  initialState: AppAdapter.getInitialState({
    ids: [0],
    entities: {
      0: {
        id: 0,
        score: 200,
        status: 'Playing',
        activeCards: [],
        total: {
          correct: 0,
          opened: 0,
          closed: 25,
          all: 25,
        },
      },
    },
  }),
  reducers: {
    editScore: AppAdapter.updateOne,
    editStatus: AppAdapter.updateOne,
    editTotal: AppAdapter.updateOne,
  },
});

export const { editScore, editStatus, editTotal } = AppSlice.actions;
export default AppSlice.reducer;
