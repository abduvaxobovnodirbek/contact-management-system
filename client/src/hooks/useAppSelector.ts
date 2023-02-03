import { useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState } from "../Store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
