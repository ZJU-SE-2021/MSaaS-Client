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
    AppointmentDto,
    AppointmentDtoFromJSON,
    AppointmentDtoToJSON,
    AppointmentForm,
    AppointmentFormFromJSON,
    AppointmentFormToJSON,
    DepartmentDto,
    DepartmentDtoFromJSON,
    DepartmentDtoToJSON,
} from '../models';

export interface AddAppointmentRequest {
    appointmentForm?: AppointmentForm;
}

export interface GetAppointmentByIdRequest {
    id: number;
}

/**
 * 
 */
export class AppointmentsApi extends runtime.BaseAPI {

    /**
     */
    async addAppointmentRaw(requestParameters: AddAppointmentRequest): Promise<runtime.ApiResponse<AppointmentDto>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/Appointments`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AppointmentFormToJSON(requestParameters.appointmentForm),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => AppointmentDtoFromJSON(jsonValue));
    }

    /**
     */
    async addAppointment(requestParameters: AddAppointmentRequest): Promise<AppointmentDto> {
        const response = await this.addAppointmentRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async getAppointmentByIdRaw(requestParameters: GetAppointmentByIdRequest): Promise<runtime.ApiResponse<DepartmentDto>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getAppointmentById.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["Authorization"] = this.configuration.apiKey("Authorization"); // Bearer authentication
        }

        const response = await this.request({
            path: `/Appointments/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => DepartmentDtoFromJSON(jsonValue));
    }

    /**
     */
    async getAppointmentById(requestParameters: GetAppointmentByIdRequest): Promise<DepartmentDto> {
        const response = await this.getAppointmentByIdRaw(requestParameters);
        return await response.value();
    }

}
