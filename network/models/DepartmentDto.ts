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

import { exists, mapValues } from '../runtime';
import {
    HospitalDto,
    HospitalDtoFromJSON,
    HospitalDtoFromJSONTyped,
    HospitalDtoToJSON,
} from './';

/**
 * 
 * @export
 * @interface DepartmentDto
 */
export interface DepartmentDto {
    /**
     * 
     * @type {number}
     * @memberof DepartmentDto
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof DepartmentDto
     */
    name?: string | null;
    /**
     * 
     * @type {string}
     * @memberof DepartmentDto
     */
    section?: string | null;
    /**
     * 
     * @type {HospitalDto}
     * @memberof DepartmentDto
     */
    hospital?: HospitalDto;
}

export function DepartmentDtoFromJSON(json: any): DepartmentDto {
    return DepartmentDtoFromJSONTyped(json, false);
}

export function DepartmentDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): DepartmentDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'section': !exists(json, 'section') ? undefined : json['section'],
        'hospital': !exists(json, 'hospital') ? undefined : HospitalDtoFromJSON(json['hospital']),
    };
}

export function DepartmentDtoToJSON(value?: DepartmentDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'section': value.section,
        'hospital': HospitalDtoToJSON(value.hospital),
    };
}


