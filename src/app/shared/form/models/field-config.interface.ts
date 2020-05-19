import { ValidatorFn } from '@angular/forms';

export interface FieldConfig {
  disabled?: boolean;
  label?: string;
  name: string;
  options?: Array<{ id: number; value: string; }>;
  placeholder?: string;
  type?: string;
  field: string;
  validation?: ValidatorFn[];
  value?: any;
  multiselect?: boolean;
  submitted?: boolean;
}
