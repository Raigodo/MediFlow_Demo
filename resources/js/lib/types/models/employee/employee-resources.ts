import { BaseResource } from '../base-resource';
import { EmployeeActions } from './actions/employee-actions';
import { EmployeesActions } from './actions/employees-actions';
import { EmployeeDetail } from './employee-detail';
import { EmployeePreview } from './employee-preview';

export type EmployeePreviewResource = BaseResource<EmployeePreview, EmployeeActions>;
export type EmployeeDetailResource = BaseResource<EmployeeDetail, EmployeeActions>;
export type EmployeeCollectionResource = BaseResource<EmployeePreviewResource[], EmployeesActions>;
