import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AppDispatch } from '../store/SelectedStocks';
import { useDispatch } from 'react-redux';

export const useStoreDispatch = () => useDispatch<AppDispatch>();
