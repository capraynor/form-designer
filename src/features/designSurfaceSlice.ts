import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AddControlInstancePayload = {
  afterControlInstanceID: string | null;
} & Omit<DesignSurfaceElement, "controlInstanceID">;

export type DesignSurfaceElement = {
  controlInstanceID: string;
  controlName: string;
  parentControlInstanceID: string | null;
  controlInstanceProps: any;  
}

export type DesignSurfaceState = {
  toolboxSelectedControlName: string | null;
  selectedControlInstanceID: string | null | undefined;
  elements: DesignSurfaceElement[];
}

const initialState: DesignSurfaceState = {
  selectedControlInstanceID: null,
  toolboxSelectedControlName: null,
  elements: []
}

function randomTextGenerator() {
  return Math.random().toString(36).substring(2, 9);
}

const designSurfaceSlice = createSlice({
  name: 'designSurface',
  initialState,
  reducers: {
    selectControlInstance(state, action: PayloadAction<string>) {
      state.selectedControlInstanceID = action.payload;
    },
    clearSelectedControlInstance(state, _: PayloadAction<undefined>) {
      state.selectedControlInstanceID = null;
    },
    addControlInstance(state, action: PayloadAction<AddControlInstancePayload>) {

      function getNextNewInstanceID() {
        const ids = state.elements.map(x => x.controlInstanceID);
        let id = randomTextGenerator();
        while (ids.includes(id)) {
          id = randomTextGenerator();
        }
        return id;
      }

      const element = {
        ...action.payload,
        controlInstanceID: getNextNewInstanceID()
      }

      if (action.payload.afterControlInstanceID) {
        const index = state.elements.findIndex(x => x.controlInstanceID === action.payload.afterControlInstanceID);
        state.elements.splice(index + 1, 0, element);
      } else if (action.payload.parentControlInstanceID) {
        const parentIndex = state.elements.findIndex(x => x.controlInstanceID === action.payload.parentControlInstanceID);
        state.elements.splice(parentIndex + 1, 0, element);
      } else {
        state.elements.push(element);
      }
    }, 
    removeControlInstanceAndChildren(state, action: PayloadAction<string>) {
      state.elements = state.elements.filter(x => x.controlInstanceID !== action.payload && x.parentControlInstanceID !== action.payload);
    },
    setToolboxSelectedControlName(state, action: PayloadAction<string>) {
      state.toolboxSelectedControlName = action.payload;
    },

    clearToolboxSelectedControlName(state, _: PayloadAction<void>) {
      state.toolboxSelectedControlName = null;
    },
    updateControlInstance(state, action: PayloadAction<DesignSurfaceElement>) {
      const index = state.elements.findIndex(x => x.controlInstanceID === action.payload.controlInstanceID);
      state.elements[index] = action.payload;
    }
  }
});

export const designSurfaceActions = designSurfaceSlice.actions;
export const designSurfaceReducer = designSurfaceSlice.reducer;