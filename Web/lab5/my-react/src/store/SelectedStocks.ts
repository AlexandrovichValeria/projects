import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Stocks} from "../interfaces/Stocks";

//import {RootState} from '.';

interface SelectedStocks {
    selectedStocks: Stocks[]
}

const SelectedStocksSlice = createSlice({
    name: 'selected_stocks_slice',
    initialState: {
        selectedStocks: []
    },
    reducers:{
        setSelectedStock(state: SelectedStocks, action: PayloadAction<Stocks[]>) {
            console.log(state.selectedStocks)
            //console.log(action.payload);
            state.selectedStocks = [...action.payload]
            //console.log("set to none")
            //console.log(state.selectedStocks)
        },
        addSelectedStock(state: SelectedStocks, action: PayloadAction<Stocks>) {
            console.log("AAA")
            console.log(state.selectedStocks)
            console.log(action.payload)
            state.selectedStocks = [...state.selectedStocks, action.payload];
        },
        removeSelectedStock(state: SelectedStocks, action: PayloadAction<Stocks>) {
            const result = state.selectedStocks.filter(selectedStock => selectedStock.title !== action.payload.title)
            state.selectedStocks = [...result];
        }
    }
})

type RootState = ReturnType<typeof store.getState>;

export const getSelectedStocks = (state: RootState) => {
    console.log("asdasdasd")
    console.log(state.selectedStocks)
    return state.selectedStocks;
};

export const store = configureStore({
    reducer: SelectedStocksSlice.reducer
})

export const {
    setSelectedStock,
    addSelectedStock,
    removeSelectedStock
} = SelectedStocksSlice.actions;

export type AppDispatch = typeof store.dispatch;

export default SelectedStocksSlice.reducer;