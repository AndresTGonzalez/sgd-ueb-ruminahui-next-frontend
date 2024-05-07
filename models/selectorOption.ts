// Father
export interface SelectorOption {
  id: number;
  name: string;
}

export interface Province extends SelectorOption {}

export interface City extends SelectorOption {
  provinceId: number;
}

export interface Gender extends SelectorOption {}

export interface MaritalStatus extends SelectorOption {}

export interface FunctionType extends SelectorOption {}

export interface LaboralRegime extends SelectorOption {}

export interface LaboralRelation extends SelectorOption {}

export interface Category extends SelectorOption {}
