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
    HospitalCreationForm,
    HospitalCreationFormFromJSON,
    HospitalCreationFormToJSON,
} from '../models';

export interface HospitalsIdDeleteRequest {
    id: number;
}

export interface HospitalsIdGetRequest {
    id: number;
}

export interface HospitalsIdPutRequest {
    id: number;
    hospitalCreationForm?: HospitalCreationForm;
}

export interface HospitalsPostRequest {
    hospitalCreationForm?: HospitalCreationForm;
}

/**
 * 
 */
export class HospitalsApi extends runtime.BaseAPI {

    /**
     */
    async hospitalsGetRaw(): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Hospitals`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async hospitalsGet(): Promise<void> {
        await this.hospitalsGetRaw();
    }

    /**
     */
    async hospitalsIdDeleteRaw(requestParameters: HospitalsIdDeleteRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling hospitalsIdDelete.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Hospitals/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async hospitalsIdDelete(requestParameters: HospitalsIdDeleteRequest): Promise<void> {
        await this.hospitalsIdDeleteRaw(requestParameters);
    }

    /**
     */
    async hospitalsIdGetRaw(requestParameters: HospitalsIdGetRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling hospitalsIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/Hospitals/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async hospitalsIdGet(requestParameters: HospitalsIdGetRequest): Promise<void> {
        await this.hospitalsIdGetRaw(requestParameters);
    }

    /**
     */
    async hospitalsIdPutRaw(requestParameters: HospitalsIdPutRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling hospitalsIdPut.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/Hospitals/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: HospitalCreationFormToJSON(requestParameters.hospitalCreationForm),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async hospitalsIdPut(requestParameters: HospitalsIdPutRequest): Promise<void> {
        await this.hospitalsIdPutRaw(requestParameters);
    }

    /**
     */
    async hospitalsPostRaw(requestParameters: HospitalsPostRequest): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/Hospitals`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: HospitalCreationFormToJSON(requestParameters.hospitalCreationForm),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async hospitalsPost(requestParameters: HospitalsPostRequest): Promise<void> {
        await this.hospitalsPostRaw(requestParameters);
    }

}