import { createContext, Dispatch, SetStateAction } from "react";
import { INIT_FORM } from "../constants/init-form";

export const FormContext = createContext<{
  form: Record<string, any>;
  setForm: Dispatch<SetStateAction<Record<string, any>>>;
}>({ form: INIT_FORM, setForm: () => {} });
