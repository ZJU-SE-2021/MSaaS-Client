/* tslint:disable */
/* eslint-disable */
/**
 * MsaasBackend
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    DepartmentCreationForm,
    DepartmentCreationFormFromJSON,
    DepartmentCreationFormToJSON,
    DepartmentDto,
    DepartmentDtoFromJSON,
    DepartmentDtoToJSON,
} from '../models';

export interface CreateDepartmentRequest {
    departmentCreationForm?: DepartmentCreationForm;
}

export interface DeleteDepartmentRequest {
    id: number;
}

export interface GetDepartmentRequest {
    id: number;
}

export interface GetDepartmentsRequest {
    hospitalId?: number;
}

export interface UpdateDepartmentRequest {
    id: number;
    departmentCreationForm?: DepartmentCreationForm;
}

/**
 * 
 */
export class DepartmentsApi extends runtime.BaseAPI {

    /**
     */
    async createDepartmentRaw(requestParameters: CreateDepartmentRequest): Promise<runtime.ApiResponse<DepartmentDto>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/Admin/Departments`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: DepartmentCreationFormToJSON(requestParameters.departmentCreationForm),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => DepartmentDtoFromJSON(jsonValue));
    }

    /**
     */
    async createDepartment(requestParameters: CreateDepartmentRequest): Promise<DepartmentDto> {
        const response = await this.createDepartmentRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async deleteDepartmentRaw(requestParameters: DeleteDepartmentRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteDepartment.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/Admin/Departments/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async deleteDepartment(requestParameters: DeleteDepartmentRequest): Promise<void> {
        await this.deleteDepartmentRaw(requestParameters);
    }

    /**
     */
    async getDepartmentRaw(requestParameters: GetDepartmentRequest): Promise<runtime.ApiResponse<DepartmentDto>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getDepartment.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/Departments/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => DepartmentDtoFromJSON(jsonValue));
    }

    /**
     */
    async getDepartment(requestParameters: GetDepartmentRequest): Promise<DepartmentDto> {
        const response = await this.getDepartmentRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async getDepartmentsRaw(requestParameters: GetDepartmentsRequest): Promise<runtime.ApiResponse<Array<DepartmentDto>>> {
        const queryParameters: any = {};

        if (requestParameters.hospitalId !== undefined) {
            queryParameters['hospitalId'] = requestParameters.hospitalId;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/Departments`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(DepartmentDtoFromJSON));
    }

    /**
     */
    async getDepartments(requestParameters: GetDepartmentsRequest): Promise<Array<DepartmentDto>> {
        const response = await this.getDepartmentsRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async updateDepartmentRaw(requestParameters: UpdateDepartmentRequest): Promise<runtime.ApiResponse<DepartmentDto>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling updateDepartment.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/Admin/Departments/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: DepartmentCreationFormToJSON(requestParameters.departmentCreationForm),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => DepartmentDtoFromJSON(jsonValue));
    }

    /**
     */
    async updateDepartment(requestParameters: UpdateDepartmentRequest): Promise<DepartmentDto> {
        const response = await this.updateDepartmentRaw(requestParameters);
        return await response.value();
    }

}
